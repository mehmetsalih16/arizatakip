// Malzeme işlemleri için temel servis fonksiyonları
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

const dbPath = path.join(process.cwd(), 'backend', 'data.db');

async function getDb(): Promise<Database> {
  return open({ filename: dbPath, driver: sqlite3.Database });
}

export async function getAllMalzemeler() {
  const db = await getDb();
  const rows = await db.all('SELECT * FROM malzemeler ORDER BY tarih DESC, ad');
  await db.close();
  return rows;
}

export async function addMalzeme(data: any) {
  const db = await getDb();
  await db.run(
    `INSERT INTO malzemeler (tarih, tasinir_kodu, ad, olcu_birimi, miktar) VALUES (?, ?, ?, ?, ?)`,
    [data.tarih, data.tasinir_kodu, data.ad, data.olcu_birimi, data.miktar]
  );
  await db.close();
}

export async function updateMalzeme(id: number, miktar: number) {
  const db = await getDb();
  await db.run('UPDATE malzemeler SET miktar = ? WHERE id = ?', [miktar, id]);
  await db.close();
}

export async function deleteMalzeme(id: number) {
  const db = await getDb();
  await db.run('DELETE FROM malzemeler WHERE id = ?', id);
  await db.close();
}
