import { SELECT_BY_USER } from '#server/sql/quota-changes'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const userId = Number(query.userId)

    if (!userId) {
        throw new Error('userId is required')
    }

    const db = useDB()
    return db.prepare(SELECT_BY_USER).all(userId)
})
