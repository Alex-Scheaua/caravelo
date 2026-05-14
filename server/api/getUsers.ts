export default defineEventHandler(async (event) => {
    await $fetch('https://tools-httpstatus.pickup-services.com/200?sleep=500')

    return [
        {
            id: 1,
            name: 'John Doe',
            flightsQuota: 3
        },
        {
            id: 12,
            name: 'John Doe Alexandrovich',
            flightsQuota: 2
        }
    ]
})