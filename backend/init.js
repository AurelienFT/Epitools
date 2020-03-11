const { prisma } = require('./generated/prisma-client')


async function initCalendars() {
    await prisma.createCalendarType({
        type: "GOOGLE_CALENDAR",
        displayName: "Google Calendar"
    });
}

initCalendars();