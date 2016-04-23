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
    }
}