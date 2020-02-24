const Query = {
    async getUserInfos(root, args, context) {
        return await context.prisma.user({
            id: args.userID
        });
    }
}

module.exports = { Query }
        
