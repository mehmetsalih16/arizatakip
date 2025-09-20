import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: "Kullanıcı adı ve şifre zorunlu." }, { status: 400 });
  }

  // DB bağlantısı
  const db = await open({
    filename: "./arizatakip.sqlite",
    driver: sqlite3.Database
  });

  // Kullanıcı var mı kontrolü
  const existing = await db.get("SELECT * FROM users WHERE username = ?", username);
  if (existing) {
    return NextResponse.json({ error: "Bu kullanıcı adı zaten alınmış." }, { status: 400 });
  }

  // Kayıt
  await db.run("INSERT INTO users (username, password) VALUES (?, ?)", username, password);
  return NextResponse.json({ success: true });
}
