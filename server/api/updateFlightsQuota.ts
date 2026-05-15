export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (body.flightsQuota > 3 || body.flightsQuota < 0) {
        throw new Error('Flight Quota is out of range')
    }

    const db = useDB()

    const current = db.prepare('SELECT flights_quota FROM users WHERE id = ?').get(body.id) as { flights_quota: number } | undefined
    if (!current) {
        throw new Error('User not found')
    }

    const oldQuota = current.flights_quota
    const newQuota = body.flightsQuota

    const updateUser = db.prepare('UPDATE users SET flights_quota = ? WHERE id = ?')
    const insertChange = db.prepare(
        'INSERT INTO quota_changes (user_id, old_quota, new_quota, reason) VALUES (?, ?, ?, ?)'
    )

    const transaction = db.transaction(() => {
        updateUser.run(newQuota, body.id)
        insertChange.run(body.id, oldQuota, newQuota, body.reason || '')
    })

    transaction()

    return {
        id: body.id,
        name: body.name,
        flightsQuota: newQuota
    }
})
