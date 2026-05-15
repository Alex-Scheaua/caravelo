import { INSERT, SELECT_USER_BY_ID } from '#server/sql/users'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
        throw new Error('User name is required')
    }

    const flightsQuota = typeof body.flightsQuota === 'number' ? body.flightsQuota : 0

    if (flightsQuota > 3 || flightsQuota < 0) {
        throw new Error('Flight Quota is out of range')
    }

    const db = useDB()
    const result = db.prepare(INSERT).run(body.name.trim(), flightsQuota)
    return db.prepare(SELECT_USER_BY_ID).get(result.lastInsertRowid) as { id: number, name: string, flightsQuota: number }
})
