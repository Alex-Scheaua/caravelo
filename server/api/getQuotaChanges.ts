export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const userId = Number(query.userId)

    if (!userId) {
        throw new Error('userId is required')
    }

    const db = useDB()
    const changes = db.prepare(
        `SELECT
            id,
            user_id AS userId,
            old_quota AS oldQuota,
            new_quota AS newQuota,
            reason,
            changed_at AS changedAt
         FROM quota_changes
         WHERE user_id = ?
         ORDER BY changed_at DESC`
    ).all(userId)

    return changes
})
