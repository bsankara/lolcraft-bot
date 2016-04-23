var Discord = new require("discord.js");
var fs = require("fs");
var helper = require('./helper.js');
var commands = require('./commands.js');


var bot = new Discord.Client();

bot.on("message", function (message) {
    if (message.author == bot.user) {
        return;
    }
    var messageContents = message.content.split(" ");
    var curCommand = commands[messageContents[0]];
    
    if (!curCommand) {
        bot.reply(message, "That is not a valid command!");        
    } 
    if (helper.checkPrivilege(message, curCommand)) {
        curCommand.process(bot, message);
    } else {
        bot.reply(message, "Check that you have the appropriate privilege to use that command");
    }
});
var obj = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
bot.login(obj.loginUserName, obj.loginPassword).then();

