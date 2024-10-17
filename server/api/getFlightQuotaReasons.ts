export default defineEventHandler(async (event) => {
    await $fetch('https://httpstat.us/200?sleep=500')

    return {
        add: [
            {
                message: 'Airline canceled flight',
                id: 1
            },
            {
                message: 'Subscriber canceled flight',
                id: 2
            },
            {
                message: 'Customer compensation',
                id: 3
            },
            {
                message: 'Other',
                id: 4
            }
        ],
        remove: [
            {
                message: 'Flight not redeposited after a flight cancellation',
                id: 5
            },
            {
                message: 'Subscriber had log in or password issues',
                id: 6
            },
            {
                message: 'Subscriber had issues when booking',
                id: 7
            },
            {
                message: 'Subscription has not renewed correctly',
                id: 8
            },
            {
                message: 'Other',
                id: 9
            }
        ]
    }
})