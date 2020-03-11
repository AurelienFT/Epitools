const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const Mutation = {
    async createUser(root, args, context) {
        if (args.microsoftID) {
            const user = await context.prisma.createUser({
                name: args.name,
                email: args.email,
                microsoftID: args.microsoftID
            });
            return {
                token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
                user: {
                    id: user.id,
                    email: user.email
                },
            }
        }
        const password = await bcrypt.hash(args.password, 10)
        const user = await context.prisma.createUser({
            name: args.name,
            email: args.email,
            password: password
        })
        return {
            token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
            user: {
                id: user.id,
                email: user.email
            },
        }
    },
    async createLink(root, args, context) {
        let calendar = await context.prisma.calendarType({
            displayName: args.displayName
        })
        var decoded = jwt.verify(args.token, process.env.APP_SECRET);
        //check if autologin ok and encrypt it
        const link = await context.prisma.createLink({
            userID: decoded.userId,
            activated: true,
            epitechAuthToken: args.autoLogin,
            type: {
                connect: {
                    id: calendar.id
                }
            }
        })
        return link.id;
    }
}

module.exports = { Mutation }
