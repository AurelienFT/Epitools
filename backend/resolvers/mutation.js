const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const Mutation = {
    async createUser(root, args, context) {
        console.log("test")
        if (args.googleID) {
            const user = await context.prisma.createUser({
                name: args.name,
                email: args.email,
                microsoftID: args.microsoftID
            });
            console.log(process.env.APP_SECRET)
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
    }
}

module.exports = { Mutation }
