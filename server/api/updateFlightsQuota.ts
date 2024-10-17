export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    //Run a check in BE to make sure data was not altered
    if(body.flightsQuota > 3 || body.flightsQuota < 0) {
        throw new Error('Flight Quota is out of range')
    }

    //Randomly throw errors for the Notification
    const successOrFail = Math.random() > 0.5 ? 200 : 404;

    await $fetch(`https://httpstat.us/${successOrFail}?sleep=500`)

    return body
})