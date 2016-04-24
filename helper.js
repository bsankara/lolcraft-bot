var trivia = require('./trivia.js')
var sqlite = require("sqlite3").verbose();
var fs = require("fs");
var file = "./stats.db";
var msgCount = {};

function messageSend(bot, messages, location) {
    var completeMessage = "";
    for (var i = 0; i < messages.length; i++) {
        completeMessage += messages[i];
        completeMessage += "\n";
    }
    bot.sendMessage(location, completeMessage);
}

function updateUser(user, server, db) {
    var getStmt = db.prepare("SELECT * FROM individualStats WHERE username == ? AND server == ?");
    getStmt.get(user, server, function (err, row) {
        if (row) {
            var curUser = row.username;
            var curServer = row.server;
            newCount = row.count + msgCount[curUser][curServer];
            db.run("UPDATE individualStats SET count=" + newCount + " WHERE username=\"" + curUser + "\" AND server=\"" + curServer + "\"", function (err) {
                msgCount[curUser][curServer] = 0;
            });
        } else {
            var stmt = db.prepare("INSERT INTO individualStats (username, server, count) VALUES(?,?,?)");
            stmt.run(user, server, msgCount[user][server], function () {
                msgCount[user][server] = 0;
            });
            stmt.finalize();
        }
    });
    getStmt.finalize();
}

module.exports = {
    checkPrivilege: function (message, command) {
        if (command.role === "") {
            return true;
        }
        server = message.channel.server;
        var roles = server.rolesOfUser(message.author);
        for (var i = 0; i < roles.length; i++) {
            if (roles[i].name == command.role) {
                return true;
            }
        }
        return false;
    },

    sendMessageList: messageSend,

    listTriviaPackages: function (bot, location) {
        messages = [""];
        messages.push("Available Trivia Packages: ");
        messages.push("```");
        for (var triviaPackage in trivia) {
            messages.push(triviaPackage);
        }
        messages.push("```");
        messageSend(bot, messages, location);

    },

    startTriviaGame: function (bot, location, triviaType) {
        if (typeof triviaType == "undefined") {
            bot.sendMessage(location, "Please try the command again with a trivia package in the form `!Trivia start <package>`");
            return;
        }
        var type = triviaType.toLowerCase();
        if (trivia[type]) {
            // start the trivia game
        } else {
            bot.sendMessage(location, "That is not a valid trivia type")
        }
    },

    trackMessage: function (message) {
        if (!message.channel.server) {
            return;
        }
        var username = message.author.username;
        var serverName = message.channel.server.name;
        if (msgCount[username] && msgCount[username][serverName]) {
            msgCount[username][serverName] += 1;
        } else {
            if (!msgCount[username]) {
                msgCount[username] = {};
            }
            msgCount[username][serverName] = 1;
        }
        console.log(msgCount);
    },

    startStatTracking: function () {
        setInterval(function () {
            db = new sqlite.Database(file);
            db.serialize(function () {
                for (var user in msgCount) {
                    for (var server in msgCount[user]) {
                        updateUser(user, server, db);
                    }
                }
            });
        }, 1000 * 10);
    },


    fileExists: function (path) {
        try {
            return fs.statSync(path).isFile();
        }
        catch (err) {
            return false;
        }
    },

    createDB: function (file) {
        db = new sqlite.Database(file);
        db.serialize(function () {
            db.run("CREATE TABLE individualStats (username TEXT, server TEXT, count INT)");
        });
        db.close();
    }
}