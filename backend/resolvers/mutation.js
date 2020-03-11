const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function sanitizeAutoLogin(autoLogin) {
    if (autoLogin.indexOf('https://intra.epitech.eu/') == 0) {
        autoLogin = autoLogin.slice(25);
    }
    if (autoLogin.indexOf('/') == 0) {
        autoLogin = autoLogin.slice(1);
    }
    let testPage = await fetch(`https://intra.epitech.eu/${autoLogin}/user/?format=json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    );
    if (testPage.status != 200) {
        return null;
    }
    return autoLogin;
}

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
        let autoLogin = await sanitizeAutoLogin(args.autoLogin);
        if (autoLogin == null) {
            return null;
        }
        const link = await context.prisma.createLink({
            userID: decoded.userId,
            activated: true,
            epitechAuthToken: autoLogin,
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
