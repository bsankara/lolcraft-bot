var trivia = require('./trivia.js')

function messageSend(bot, messages, location) {
        var completeMessage = "";
        for (var i = 0; i < messages.length; i++) {
            completeMessage += messages[i];
            completeMessage += "\n";
        }
        bot.sendMessage(location, completeMessage);
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
    }
}