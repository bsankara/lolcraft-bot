var helper = require('./helper.js');

module.exports = {
    "!addCommand": {
        description: "Add a new Command",
        process: function (bot, message) {
            console.log("Adding Command");
        },
        role: ""
    },
    "!Kill": {
        description: "Kill the Bot",
        process: function (bot) {
            console.log("Killing Bot");
            bot.logout();
            process.exit(0);
        },
        role: "admin"
    },
    "Ping": {
        description: "Responds with Pong if the bot is online and functional",
        process: function (bot, message) {
            console.log("Ping pong")
            bot.sendMessage(message.channel, " " + message.sender + " pong!");
        },
        role: ""
    },
    "!Purge": {
        description: "Deletes X messages",
        process: function (bot, message) {
        },
        role: "admin"
    },
    "!Filter": {
        description: "Adds a Word to be Filtered",
        process: function (bot, message) {
        },
        role: "admin"
    },
    "!Mafia": {
        description: "Spawns a game of Mafia",
        process: function (bot, message) {
        },
        role: ""
    },
    "!Trivia": {
        description: "Creates a new Trivia Game",
        process: function (bot, message) {
            var messageContents = message.content.split(" ");
            // messageContents[0] is the !Trivia part of it
            if (messageContents[1].toLowerCase() === "list") {
                helper.listTriviaPackages(bot, message.author);
            } else if (messageContents[1].toLowerCase() == "start") {
                // messageContents[2] is the trivia package they want to try
                helper.startTriviaGame(bot, message.channel, messageContents[2]);
            } else {
                bot.reply(message, "I could not understand that trivia command, the available commands are `!Trivia List` and `!Trivia Start <Package>`");
            }
        },
        role: ""
    },
    "!Help": {
        description: "Displays a list of available commands",
        process: function(bot, message) {
            messages = [];
            messages.push("");
            messages.push("**Available Commands:**");
            messages.push("```")
            messages.push("!addCommand");
            messages.push("!Kill");
            messages.push("Ping");
            messages.push("!Purge");
            messages.push("!Filter");
            messages.push("!Mafia");
            messages.push("!Trivia");
            messages.push("```");
            helper.sendMessageList(bot, messages, message.author);
        },
        role: ""
    }
}