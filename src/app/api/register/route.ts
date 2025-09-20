import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import nodemailer from "nodemailer";

const ADMIN_EMAIL = "mehmetsalihbasturk16@gmail.com";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();
  if (!username || !email || !password) {
    return NextResponse.json({ error: "Kullanıcı adı, e-posta ve şifre zorunlu." }, { status: 400 });
  }

  // DB bağlantısı
  const db = await open({
    filename: "./arizatakip.sqlite",
    driver: sqlite3.Database
  });

  // Kullanıcı var mı kontrolü
  const existing = await db.get("SELECT * FROM users WHERE username = ? OR email = ?", username, email);
  if (existing) {
    return NextResponse.json({ error: "Bu kullanıcı adı veya e-posta zaten alınmış." }, { status: 400 });
  }

  // Onay bekleyen kullanıcıyı ekle (aktif değil)
  await db.run("INSERT INTO users (username, email, password, is_active) VALUES (?, ?, ?, 0)", username, email, password);

  // Admin'e e-posta gönder
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ADMIN_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD || ""
    }
  });

  await transporter.sendMail({
    from: ADMIN_EMAIL,
    to: ADMIN_EMAIL,
    subject: "Yeni Kayıt Onayı Gerekli",
    text: `Yeni kayıt isteği:\nKullanıcı adı: ${username}\nE-posta: ${email}\nOnaylamak için veritabanında is_active=1 yapın.`
  });

  return NextResponse.json({ success: true });
}
