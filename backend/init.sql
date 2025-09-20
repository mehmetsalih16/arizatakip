-- Malzemeler tablosu
CREATE TABLE IF NOT EXISTS malzemeler (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tarih TEXT NOT NULL,
  tasinir_kodu TEXT NOT NULL,
  ad TEXT NOT NULL,
  olcu_birimi TEXT NOT NULL,
  miktar REAL NOT NULL
);

-- Jobs tablosu
CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  date TEXT NOT NULL,
  ilce TEXT NOT NULL,
  mahalle TEXT NOT NULL,
  cadde TEXT NOT NULL,
  kapi TEXT NOT NULL,
  imalat TEXT NOT NULL,
  imalatMiktar REAL NOT NULL,
  malzemeler TEXT,
  gorseller TEXT
);
