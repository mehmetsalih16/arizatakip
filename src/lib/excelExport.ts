// Excel dosyası oluşturma fonksiyonu
import XLSX from 'xlsx';
import path from 'path';
import { ensureDirExists } from './fileUtils';

export function exportJobsToExcel(jobs: any[], exportDir: string) {
  const excelData = jobs.map(job => {
    const malzemeText = Array.isArray(job.malzemeler)
      ? job.malzemeler.map((m: any) => `${m.ad}: ${m.miktar}`).join(', ')
      : job.malzemeler || '';
    return {
      'Kullanıcı': job.username,
      'Tarih': job.date,
      'İlçe': job.ilce,
      'Mahalle': job.mahalle,
      'Cadde/Sokak': job.cadde,
      'Kapı No': job.kapi,
      'İmalat': job.imalat,
      'İmalat Miktarı': job.imalatMiktar,
      'Malzemeler': malzemeText,
      'Görsel Sayısı': Array.isArray(job.gorseller) ? job.gorseller.length : 0
    };
  });
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(excelData);
  XLSX.utils.book_append_sheet(wb, ws, 'İş Listesi');
  ensureDirExists(exportDir);
  const fileName = `is-listesi-${new Date().toISOString().split('T')[0]}.xlsx`;
  const filePath = path.join(exportDir, fileName);
  XLSX.writeFile(wb, filePath);
  return filePath;
}
