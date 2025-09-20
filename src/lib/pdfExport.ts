// PDF dosyası oluşturma fonksiyonu
import PDFDocument from 'pdfkit';
import path from 'path';
import { ensureDirExists } from './fileUtils';

export function exportJobsToPDF(jobs: any[], exportDir: string) {
  ensureDirExists(exportDir);
  const fileName = `is-listesi-${new Date().toISOString().split('T')[0]}.pdf`;
  const filePath = path.join(exportDir, fileName);
  const doc = new PDFDocument({ margin: 30 });
  const stream = doc.pipe(require('fs').createWriteStream(filePath));
  doc.fontSize(18).text('İş Takip Raporu', { align: 'center' });
  doc.fontSize(12).text(`Rapor Tarihi: ${new Date().toLocaleDateString('tr-TR')}`, { align: 'center' });
  doc.moveDown();
  const headers = ['Kullanıcı', 'Tarih', 'İlçe', 'Mahalle', 'İmalat', 'Miktar'];
  let y = doc.y;
  headers.forEach((header, i) => {
    doc.text(header, 50 + i * 80, y, { width: 75, align: 'center' });
  });
  doc.moveTo(30, y + 15).lineTo(570, y + 15).stroke();
  doc.moveDown();
  jobs.forEach((job, index) => {
    if (doc.y > 700) {
      doc.addPage();
      doc.y = 50;
    }
    const currentY = doc.y;
    const values = [
      job.username || '',
      job.date || '',
      job.ilce || '',
      job.mahalle || '',
      job.imalat || '',
      job.imalatMiktar || ''
    ];
    values.forEach((value, i) => {
      doc.text(String(value).substring(0, 10), 50 + i * 80, currentY, { width: 75, align: 'center' });
    });
    doc.moveDown(0.5);
  });
  doc.end();
  return new Promise<string>((resolve) => {
    stream.on('finish', () => resolve(filePath));
  });
}
