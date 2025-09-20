'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function JobEklePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [malzemeler, setMalzemeler] = useState([{ ad: '', miktar: '' }]);
  const [gorseller, setGorseller] = useState<File[]>([]);

  function handleMalzemeChange(index: number, field: string, value: string) {
    const yeni = [...malzemeler];
    yeni[index][field] = value;
    setMalzemeler(yeni);
  }

  function handleMalzemeEkle() {
    setMalzemeler([...malzemeler, { ad: '', miktar: '' }]);
  }

  function handleMalzemeSil(index: number) {
    if (malzemeler.length === 1) return;
    setMalzemeler(malzemeler.filter((_, i) => i !== index));
  }

  function handleGorselChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setGorseller(Array.from(e.target.files));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const data: any = {
      username: formData.get('username'),
      date: formData.get('date'),
      ilce: formData.get('ilce'),
      mahalle: formData.get('mahalle'),
      cadde: formData.get('cadde'),
      kapi: formData.get('kapi'),
      imalat: formData.get('imalat'),
      imalatMiktar: Number(formData.get('imalatMiktar')),
      malzemeler,
    };
    // Fotoğrafları FormData ile gönder
    const sendData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'malzemeler') {
        sendData.append('malzemeler', JSON.stringify(value));
      } else {
        sendData.append(key, value as any);
      }
    });
    gorseller.forEach((file) => {
      sendData.append('gorseller', file);
    });
    await fetch('/api/job-ekle', {
      method: 'POST',
      body: sendData,
    });
    setLoading(false);
    router.push('/jobs');
  }

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">İş Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input name="username" placeholder="Kullanıcı" className="border px-2 py-1 w-full" required />
        <input name="date" type="date" className="border px-2 py-1 w-full" required />
        <input name="ilce" placeholder="İlçe" className="border px-2 py-1 w-full" required />
        <input name="mahalle" placeholder="Mahalle" className="border px-2 py-1 w-full" required />
        <input name="cadde" placeholder="Cadde/Sokak" className="border px-2 py-1 w-full" required />
        <input name="kapi" placeholder="Kapı No" className="border px-2 py-1 w-full" required />
        <input name="imalat" placeholder="İmalat" className="border px-2 py-1 w-full" required />
        <input name="imalatMiktar" type="number" placeholder="İmalat Miktarı" className="border px-2 py-1 w-full" required />
        <div>
          <label className="font-semibold">Malzemeler:</label>
          {malzemeler.map((m, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Malzeme Adı"
                value={m.ad}
                onChange={e => handleMalzemeChange(i, 'ad', e.target.value)}
                className="border px-2 py-1 flex-1"
                required
              />
              <input
                type="number"
                placeholder="Miktar"
                value={m.miktar}
                onChange={e => handleMalzemeChange(i, 'miktar', e.target.value)}
                className="border px-2 py-1 w-24"
                required
              />
              <button type="button" onClick={() => handleMalzemeSil(i)} className="text-red-600">Sil</button>
            </div>
          ))}
          <button type="button" onClick={handleMalzemeEkle} className="text-blue-600">+ Malzeme Ekle</button>
        </div>
        <div>
          <label className="font-semibold">Fotoğraflar:</label>
          <input type="file" name="gorseller" multiple accept="image/*" onChange={handleGorselChange} className="block mt-1" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Ekleniyor...' : 'Ekle'}</button>
      </form>
    </main>
  );
}
