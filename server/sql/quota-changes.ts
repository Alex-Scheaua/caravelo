export const INSERT = 'INSERT INTO quota_changes (user_id, old_quota, new_quota, reason) VALUES (?, ?, ?, ?)'

export const SELECT_BY_USER = `SELECT
    id,
    user_id AS userId,
    old_quota AS oldQuota,
    new_quota AS newQuota,
    reason,
    changed_at AS changedAt
  FROM quota_changes
  WHERE user_id = ?
  ORDER BY changed_at DESC`
