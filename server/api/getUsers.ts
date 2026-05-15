import { SELECT_ALL } from '#server/sql/users'

export default defineEventHandler(async (event) => {
    const db = useDB()
    const users = db.prepare(SELECT_ALL).all()

    return users
})
