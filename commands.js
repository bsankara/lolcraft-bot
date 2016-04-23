module.exports = {
    "!addCommand": {
        description: "Add a new Command",
        process: function(bot, message) {
            console.log("Adding Command");
        },
        role: ""
    },
    "!Kill": {
        description: "Kill the Bot",
        process: function(bot) {
            console.log("Killing Bot");
            bot.logout();
            process.exit(0);
        },
        role: "admin"
    },
    "Ping": {
        description: "Ping Pong",
        process: function(bot, message) {
            console.log("Ping pong")
            bot.sendMessage(message.channel, " " + message.sender + " pong!");
        },
        role: ""
    },
    "!Purge": {
        description: "Deletes X messages",
        process: function(bot, message) {
        },
        role: "admin"
    },
    "!Filter": {
        description: "Adds a Word to be Filtered",
        process: function(bot, message) {
        },
        role: "admin"
    }
}