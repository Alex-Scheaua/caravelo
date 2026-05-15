export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      flights_quota INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS quota_change_reason_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS quota_change_reasons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message TEXT NOT NULL DEFAULT '',
      type_id INTEGER NOT NULL,
      FOREIGN KEY (type_id) REFERENCES quota_change_reason_types(id)
    );

    CREATE TABLE IF NOT EXISTS quota_changes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      old_quota INTEGER NOT NULL,
      new_quota INTEGER NOT NULL,
      reason_id INTEGER NOT NULL,
      changed_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (reason_id) REFERENCES quota_change_reasons(id)
    );
  `