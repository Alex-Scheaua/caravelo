import { SELECT_BY_ID, UPDATE_QUOTA } from '#server/sql/users'
import { INSERT as INSERT_CHANGE } from '#server/sql/quota-changes'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (body.flightsQuota > 3 || body.flightsQuota < 0) {
        throw new Error('Flight Quota is out of range')
    }

    const db = useDB()

    const current = db.prepare(SELECT_BY_ID).get(body.id) as { flights_quota: number } | undefined
    if (!current) {
        throw new Error('User not found')
    }

    const oldQuota = current.flights_quota
    const newQuota = body.flightsQuota

    const updateUser = db.prepare(UPDATE_QUOTA)
    const insertChange = db.prepare(INSERT_CHANGE)

    const transaction = db.transaction(() => {
        updateUser.run(newQuota, body.id)
        insertChange.run(body.id, oldQuota, newQuota, body.reasonId || null)
    })

    transaction()

    return {
        id: body.id,
        name: body.name,
        flightsQuota: newQuota
    }
})
