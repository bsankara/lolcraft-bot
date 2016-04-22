module.exports = {
    "!addCommand": {
        description: "Add a new Command",
        process: function(bot, message) {
            console.log("Adding Command");
        },
        role: "@everyone"
    },
    "!Kill": {
        description: "Kill the Bot",
        process: function(bot) {
            console.log("Killing Bot");
            bot.logout();
            process.exit(0);
        },
        role: "admin"
    }
}