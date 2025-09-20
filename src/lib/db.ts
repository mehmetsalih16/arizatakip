// SQLite işlemleri için yardımcı fonksiyonlar
// Buraya eski backend'deki sqlite işlemlerini TypeScript fonksiyonları olarak taşıyacağız

import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src', 'data', 'production.db');

export async function getDb(): Promise<Database> {
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}

// Örnek: Tüm arızaları getir
export async function getAllArizalar() {
  const db = await getDb();
  const rows = await db.all('SELECT * FROM arizalar');
  await db.close();
  return rows;
}

// Diğer CRUD fonksiyonları buraya eklenecek
