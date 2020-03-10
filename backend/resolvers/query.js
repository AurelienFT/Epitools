const jwt = require('jsonwebtoken')

const Query = {
    async getUserInfos(root, args, context) {
        var decoded = jwt.verify(args.token, process.env.APP_SECRET);
        return await context.prisma.user({
            id: decoded.userId
        });
    },
    async userExists(root, args, context) {
        if (args.email) {
            let result = await context.prisma.user({
                email: args.email
            });
            if (result)
                return true
        } else {
            var decoded = jwt.verify(args.token, process.env.APP_SECRET);
            let user = await context.prisma.user({
                id: decoded.userId
            });
            if (user)
                return true
        }
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

