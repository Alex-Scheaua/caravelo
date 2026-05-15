export const INSERT_REASON_TYPE = 'INSERT INTO quota_change_reason_types (type) VALUES (?)'
export const COUNT_ALL_REASON_TYPES = 'SELECT COUNT(*) as count FROM quota_change_reason_types'
export const GET_REASON_TYPES = 'SELECT * FROM quota_change_reason_types'

export const INSERT = 'INSERT INTO quota_change_reasons (message, type_id) VALUES (?, ?)'
export const COUNT_ALL_REASONS = 'SELECT COUNT(*) as count FROM quota_change_reasons'
export const GET_REASONS = 'SELECT quota_change_reasons.id, message, type FROM quota_change_reasons INNER JOIN quota_change_reason_types ON quota_change_reasons.type_id = quota_change_reason_types.id'