// Jobs işlemleri (CRUD) - Next.js uyumlu
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'backend', 'data.db');

async function getDb(): Promise<Database> {
  return open({ filename: dbPath, driver: sqlite3.Database });
}

export async function getAllJobs() {
  const db = await getDb();
  const rows = await db.all('SELECT * FROM jobs ORDER BY id DESC');
  rows.forEach(row => {
    row.malzemeler = JSON.parse(row.malzemeler || '[]');
    row.gorseller = JSON.parse(row.gorseller || '[]');
  });
  await db.close();
  return rows;
}

export async function addJob(data: any, gorseller: string[] = []) {
  const db = await getDb();
  await db.run(
    `INSERT INTO jobs (username, date, ilce, mahalle, cadde, kapi, imalat, imalatMiktar, malzemeler, gorseller) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.username,
      data.date,
      data.ilce,
      data.mahalle,
      data.cadde,
      data.kapi,
      data.imalat,
      data.imalatMiktar,
      JSON.stringify(data.malzemeler || []),
      JSON.stringify(gorseller)
    ]
  );
  await db.close();
}

export async function deleteJob(id: number) {
  const db = await getDb();
  await db.run('DELETE FROM jobs WHERE id = ?', id);
  await db.close();
}

export async function updateJob(id: number, data: any, gorseller: string[] = []) {
  const db = await getDb();
  await db.run(
    `UPDATE jobs SET username=?, date=?, ilce=?, mahalle=?, cadde=?, kapi=?, imalat=?, imalatMiktar=?, malzemeler=?, gorseller=? WHERE id=?`,
    [
      data.username,
      data.date,
      data.ilce,
      data.mahalle,
      data.cadde,
      data.kapi,
      data.imalat,
      data.imalatMiktar,
      JSON.stringify(data.malzemeler || []),
      JSON.stringify(gorseller),
      id
    ]
  );
  await db.close();
}
