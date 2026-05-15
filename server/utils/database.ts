import Database from 'better-sqlite3'
import { resolve } from 'pathe'
import * as UserSql from '#server/sql/users'
import { CREATE_TABLE } from "#server/sql/create-table";
import * as change_reasons from "#server/sql/change-reasons";
import reasons from '#server/sql/seed-data/quota-change-reasons'

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

  db.exec(CREATE_TABLE)

  const countReasonTypes = db.prepare(change_reasons.COUNT_ALL_REASON_TYPES).get() as {count: number}
  if(countReasonTypes.count === 0) {
    const insertReasonType = db.prepare(change_reasons.INSERT_REASON_TYPE)
    insertReasonType.run('add')
    insertReasonType.run('remove')
  }

  const countReasons = db.prepare(change_reasons.COUNT_ALL_REASONS).get() as {count: number}
  if(countReasons.count === 0) {
    const insertReason = db.prepare(change_reasons.INSERT)

    for(const type in reasons) {
      reasons[type].forEach(reason => {
        insertReason.run(reason.message, type==='add' ? 1 :2)
      })
    }
  }

  const count = db.prepare(UserSql.COUNT_ALL).get() as { count: number }
  if (count.count === 0) {
    const insertUser = db.prepare(UserSql.INSERT)
    insertUser.run('John Doe', 3)
    insertUser.run('John Alexandrovich', 2)
  }

  return db
}

export function useDB(): Database.Database {
  if (!_db) {
    _db = initDb()
  }
  return _db
}
