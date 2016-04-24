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

function getUserMessages(username, server) {
    db = new sqlite.Database(file);
    db.serialize(function() {
        db.each("SELECT count FROM individualStats WHERE username == \"" + username + "\" AND server == \"" + server + "\"", function(err, row){
            if (row)
            return row.count;
        });
    });
    return -1;
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
    
    listTriviaPackages: function(bot, location) {
        messages = [""];
        messages.push("Available Trivia Packages: ");
        messages.push("```");
        for (var triviaPackage in trivia) {
            messages.push(triviaPackage);
        }
        messages.push("```");
        messageSend(bot, messages, location);
        
    },
    
    startTriviaGame: function(bot, location, triviaType) {
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
    
    trackMessage: function(message) {
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
    
    startStatTracking: function() {
        setInterval(function() {
            db = new sqlite.Database(file);            
            for (var user in msgCount) {
                   if (getUserMessages(user, msgCount[user]) != -1) {
                       // update
                   } else {
                       for (var server in msgCount[user]) {
                            db.serialize(function() {
                                var stmt = db.prepare("INSERT INTO individualStats (username, server, count) VALUES(?,?,?)");
                                stmt.run(user, server, msgCount[user][server]);
                                stmt.finalize();
                            });
                       }
                   }
            }
            db.close();
            console.log("Messages Sent:\n" + msgCount);
            msgCount = {};
        }, 1000*60);
    },
    
    
    fileExists: function(path) {
        try
        {
            return fs.statSync(path).isFile();
        }
        catch (err)
        {
            return false;
        }
    },
    
    createDB: function(file) {
        db = new sqlite.Database(file);
        db.serialize(function() {
           db.run("CREATE TABLE individualStats (username TEXT, server TEXT, count INT)"); 
        });
        db.close();
    }
}