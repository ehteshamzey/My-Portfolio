import { mkdirSync } from "node:fs";
import path from "node:path";

import Database from "better-sqlite3";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "portfolio.db");

// Reuse a single connection across hot-reloads in dev to avoid leaking handles.
declare global {
  var __portfolioDb: Database.Database | undefined;
}

function createDatabase(): Database.Database {
  mkdirSync(DATA_DIR, { recursive: true });

  const db = new Database(DB_FILE);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  return db;
}

export function getDb(): Database.Database {
  if (!globalThis.__portfolioDb) {
    globalThis.__portfolioDb = createDatabase();
  }
  return globalThis.__portfolioDb;
}
