export const INSERT = 'INSERT INTO quota_changes (user_id, old_quota, new_quota, reason_id) VALUES (?, ?, ?, ?)'

export const SELECT_BY_USER = `SELECT
    quota_changes.id,
    user_id AS userId,
    old_quota AS oldQuota,
    new_quota AS newQuota,
    quota_change_reasons.message AS reason,
    changed_at AS changedAt
  FROM quota_changes
  INNER JOIN quota_change_reasons ON quota_changes.reason_id = quota_change_reasons.id
  WHERE user_id = ?
  ORDER BY changed_at DESC`
