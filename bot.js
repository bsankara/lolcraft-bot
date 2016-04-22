var Discord = new require("discord.js");
var fs = require("fs");
var helper = require('./helper.js')

var bot = new Discord.Client();

bot.on("message", function(message) {
    if (message.content === "Hi") {
        bot.reply(message, "Hey there!");
    } else if (message.content === "Kill") {
        bot.logout();
        process.exit(0);
    }
});
var obj = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
bot.login(obj.loginUserName, obj.loginPassword).then();

