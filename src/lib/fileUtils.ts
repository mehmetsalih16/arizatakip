// Dosya işlemleri ve upload yardımcıları
import fs from 'fs';
import path from 'path';

export function ensureDirExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function saveFile(buffer: Buffer, fileName: string, folder: string) {
  ensureDirExists(folder);
  const filePath = path.join(folder, fileName);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}

export function deleteFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}
