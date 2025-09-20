
import { NextRequest } from 'next/server';
import { addJob } from '@/lib/jobsService';
import cloudinary from '@/lib/cloudinary';
import { updateMalzeme, getAllMalzemeler } from '@/lib/malzemeService';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const data: any = {};
  for (const [key, value] of formData.entries()) {
    if (key === 'malzemeler') {
      data.malzemeler = JSON.parse(value as string);
    } else if (key === 'gorseller') {
      // handled below
    } else {
      data[key] = value;
    }
  }


  // Fotoğrafları Cloudinary'ye yükle
  const gorseller: string[] = [];
  const files = formData.getAll('gorseller');
  for (const file of files) {
    if (typeof file === 'object' && 'arrayBuffer' in file && file.name) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadRes = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'arizatakip' }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }).end(buffer);
      });
      gorseller.push(uploadRes.secure_url);
    }
  }

  await addJob(data, gorseller);

  // Kullanılan malzemeleri depodan düş
  if (Array.isArray(data.malzemeler)) {
    // Tüm malzemeleri çek (ad ve tasinir_kodu ile eşleştirme için)
    const tumMalzemeler = await getAllMalzemeler();
    for (const kullanilan of data.malzemeler) {
      // Malzeme adı ve taşınır kodu ile bul
      const depoMalzeme = tumMalzemeler.find((m: any) =>
        m.ad === kullanilan.ad && m.tasinir_kodu === kullanilan.tasinir_kodu
      );
      if (depoMalzeme) {
        const yeniMiktar = Number(depoMalzeme.miktar) - Number(kullanilan.miktar);
        await updateMalzeme(depoMalzeme.id, yeniMiktar);
      }
    }
  }
  return Response.json({ success: true });
}
