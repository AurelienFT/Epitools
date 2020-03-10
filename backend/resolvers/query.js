const jwt = require('jsonwebtoken')

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
    },
    async login(root, args, context) {
        if (args.microsoftID) {
            const user = await context.prisma.user({
                email: args.email,
            });
            return {
                token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
                user: {
                    id: user.id,
                    email: user.email
                },
            }
        }
        const user = await context.prisma.user({
            email: args.email,
        })
        return {
            token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
            user: {
                id: user.id,
                email: user.email
            },
        }   
    }
}

module.exports = { Query }
        
