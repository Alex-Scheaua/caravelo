export const SELECT_ALL = 'SELECT id, name, flights_quota AS flightsQuota FROM users'

export const SELECT_BY_ID = 'SELECT flights_quota FROM users WHERE id = ?'

export const UPDATE_QUOTA = 'UPDATE users SET flights_quota = ? WHERE id = ?'

export const COUNT_ALL = 'SELECT COUNT(*) as count FROM users'

export const INSERT = 'INSERT INTO users (name, flights_quota) VALUES (?, ?)'
