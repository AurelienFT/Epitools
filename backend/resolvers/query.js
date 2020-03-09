const Query = {
    async getUserInfos(root, args, context) {
        return await context.prisma.user({
            id: args.userID
        });
    },
    async userExists(root, args, context) {
        let result = await context.prisma.user({
            email: args.email
        });
        if (result)
            return true
        return false
    }
}

module.exports = { Query }
        
