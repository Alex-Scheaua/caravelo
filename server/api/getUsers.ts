export default defineEventHandler(async (event) => {
    await $fetch('https://tools-httpstatus.pickup-services.com/200?sleep=500')

    const db = useDB()
    const users = db.prepare('SELECT id, name, flights_quota AS flightsQuota FROM users').all()

    return users
})
