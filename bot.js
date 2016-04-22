var Discord = new require("discord.js");
var fs = require("fs");
var helper = require('./helper.js');
var commands = require('./commands.js');


var bot = new Discord.Client();

bot.on("message", function (message) {
    var messageContents = message.content.split(" ");
    var curCommand = commands[messageContents[0]];
    console.log(curCommand);
    
    if (helper.checkPrivilege(message, curCommand)) {
        curCommand.process(bot, message);
    } else {
        // display message saying they they need to check their privilege
    }
});
var obj = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
bot.login(obj.loginUserName, obj.loginPassword).then();

