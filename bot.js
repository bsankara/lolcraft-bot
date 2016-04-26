var Discord = new require("discord.js");
var fs = require("fs");
var helper = require('./helper.js');
var commands = require('./commands.js');


var bot = new Discord.Client();
var dbName = "./stats.db";

if (!helper.fileExists(dbName)){
    helper.createDB(dbName);
} else {
    helper.openDB(dbName);
}

bot.on("message", function (message) {
    helper.trackMessage(message);
    /*
    if (helper.checkFilter()) {
        bot.deleteMessage(message);
    }
    tmp disable messages because I want to be able to run this on a "real" server
    if (message.author == bot.user) {
        return;
    }
    var messageContents = message.content.split(" ");
    var curCommand = commands[messageContents[0]];

    if (!curCommand) {
        if (messageContents[0][0] == '!') {
            bot.reply(message, "That is not a valid command!");
        }
    }
    else { 
        if (helper.checkPrivilege(message, curCommand)) {
            curCommand.process(bot, message);
        } else {
            bot.reply(message, "Check that you have the appropriate privilege to use that command");
        }
    }*/
});
var obj = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
bot.login(obj.loginUserName, obj.loginPassword).then(helper.startStatTracking());

