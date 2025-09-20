// Bu script backend/data.db dosyasını ve gerekli tabloları oluşturur
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'data.db');
const initSql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf-8');

const db = new sqlite3.Database(dbPath);

db.exec(initSql, (err) => {
  if (err) {
    console.error('Tablolar oluşturulurken hata:', err.message);
    process.exit(1);
  } else {
    console.log('Veritabanı ve tablolar başarıyla oluşturuldu.');
    process.exit(0);
  }
});
