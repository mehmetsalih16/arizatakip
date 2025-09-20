// Dosya yükleme işlemleri için yardımcı fonksiyonlar
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'src', 'uploads');

export function saveUploadedFile(file: File) {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const filePath = path.join(uploadDir, file.name);
  // Node.js ortamında File API yok, bu fonksiyon Next.js API route veya server action içinde kullanılmalı
  // Örnek: fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));
  return filePath;
}
