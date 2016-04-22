module.exports = {
    checkAdmin : function(message, server) {
        var roles = server.rolesOfUser(message.author);
        for (var i = 0; i < roles.length; i++) {
            if (roles[i].name == "admin") {
                return true;
            }
        }
        return false;
    }
}