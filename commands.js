var helper = require('./helper.js');

module.exports = {
    "!alias": {
        description: "Alias a word for another",
        process: function (bot, message) {
            var messageContents = message.content.split(" ");
            if (!messageContents[1]) {
                bot.reply(message, "You must set a new keyword as the alias");
            } else if (!helper.checkValidAlias(messageContents[1])) {
                bot.reply(message, "You cannot alias an existing command");
            } else {
                var messageRemnant = message.content.substring(messageContents[0].length + messageContents[1].length + 1);
                helper.addAlias(messageContents[1], messageRemnant);
            }
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
        description: "Deletes X messages (up to 100)",
        process: function (bot, message) {
            var messageContents = message.content.split(" ");
            if (!messageContents[1]) {
                bot.reply(message, "You must specify the number of messages to delete");
            } else if (messageContents[1] > 100) {
                bot.reply(message, "You can only delete less than 100 messages");
            } else {
                bot.getChannelLogs(message.channel, 100).then(function(logs) {
                    for (var i = 0; i < logs.length; i++) {
                        bot.deleteMessage(logs[i]);
                    } 
                });
            }
        },
        role: "admin"
    },
    "!Filter": {
        description: "Adds a Word to be Filtered",
        process: function (bot, message) {
            var messageContents = message.content.split(" ");
            if (messageContents[1]) {
                helper.addToFilter(messageContents[1]);
            } else  {
                bot.reply(message, "You need to write a word to be filtered, in the form !Filter <word>");
            }
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
            messages.push("!alias");
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
    },
    "!Statistics": {
        description: "Displays recorded statistics",
        process: function(bot, message) {
            helper.printStatistics(bot, message);
        },
        role: ""
    }
}