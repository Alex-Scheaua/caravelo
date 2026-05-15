export type QuotaChange = {
    id: number,
    userId: number,
    oldQuota: number,
    newQuota: number,
    reason: string,
    changedAt: string
}
