import { GET_REASONS } from "#server/sql/change-reasons";

export default defineEventHandler(async (event) => {
    const db = useDB()

    const response = db.prepare(GET_REASONS).all()

    const reasons = {
        add: [],
        remove: []
    }

    response?.forEach(reason => reasons[reason.type].push(reason))

    return reasons
})