// Arıza işlemleri için temel servis fonksiyonları
import { getDb } from './db';

export async function getArizalar() {
  const db = await getDb();
  const rows = await db.all('SELECT * FROM arizalar');
  await db.close();
  return rows;
}

export async function addAriza(data: any) {
  const db = await getDb();
  const stmt = await db.prepare('INSERT INTO arizalar (baslik, aciklama, durum, tarih) VALUES (?, ?, ?, ?)');
  await stmt.run(data.baslik, data.aciklama, data.durum, data.tarih);
  await stmt.finalize();
  await db.close();
}

export async function updateAriza(id: number, data: any) {
  const db = await getDb();
  const stmt = await db.prepare('UPDATE arizalar SET baslik=?, aciklama=?, durum=?, tarih=? WHERE id=?');
  await stmt.run(data.baslik, data.aciklama, data.durum, data.tarih, id);
  await stmt.finalize();
  await db.close();
}

export async function deleteAriza(id: number) {
  const db = await getDb();
  await db.run('DELETE FROM arizalar WHERE id=?', id);
  await db.close();
}
