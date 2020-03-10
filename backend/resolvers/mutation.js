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
    }
}

module.exports = { Mutation }
