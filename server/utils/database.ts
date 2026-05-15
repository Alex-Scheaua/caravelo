import Database from 'better-sqlite3'
import { resolve } from 'pathe'

let _db: Database.Database | null = null

function getDbPath(): string {
  const serverDir = resolve(process.cwd(), 'server', 'data')
  return resolve(serverDir, 'caravelo.db')
}

function initDb(): Database.Database {
  const dbPath = getDbPath()
  const db = new Database(dbPath)

  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      flights_quota INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS quota_changes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      old_quota INTEGER NOT NULL,
      new_quota INTEGER NOT NULL,
      reason TEXT NOT NULL DEFAULT '',
      changed_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `)

  const count = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }
  if (count.count === 0) {
    const insertUser = db.prepare('INSERT INTO users (id, name, flights_quota) VALUES (?, ?, ?)')
    insertUser.run(1, 'John Doe', 3)
    insertUser.run(12, 'John Doe Alexandrovich', 2)
  }

  return db
}

export function useDB(): Database.Database {
  if (!_db) {
    _db = initDb()
  }
  return _db
}
