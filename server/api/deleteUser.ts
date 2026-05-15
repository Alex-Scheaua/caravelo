import { DELETE_USER, DELETE_USER_QUOTA_CHANGES, SELECT_ALL } from '#server/sql/users'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.id) {
        throw new Error('User id is required')
    }

    const db = useDB()

    const transaction = db.transaction(() => {
        db.prepare(DELETE_USER_QUOTA_CHANGES).run(body.id)
        db.prepare(DELETE_USER).run(body.id)
    })

    transaction()

    return { success: true }
})
