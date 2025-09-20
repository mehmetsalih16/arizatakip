
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function JobEklePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get('username'),
      date: formData.get('date'),
      ilce: formData.get('ilce'),
      mahalle: formData.get('mahalle'),
      cadde: formData.get('cadde'),
      kapi: formData.get('kapi'),
      imalat: formData.get('imalat'),
      imalatMiktar: Number(formData.get('imalatMiktar')),
      malzemeler: [],
    };
    await fetch('/api/job-ekle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setLoading(false);
    router.push('/jobs');
  }

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">İş Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" placeholder="Kullanıcı" className="border px-2 py-1 w-full" required />
        <input name="date" type="date" className="border px-2 py-1 w-full" required />
        <input name="ilce" placeholder="İlçe" className="border px-2 py-1 w-full" required />
        <input name="mahalle" placeholder="Mahalle" className="border px-2 py-1 w-full" required />
        <input name="cadde" placeholder="Cadde/Sokak" className="border px-2 py-1 w-full" required />
        <input name="kapi" placeholder="Kapı No" className="border px-2 py-1 w-full" required />
        <input name="imalat" placeholder="İmalat" className="border px-2 py-1 w-full" required />
        <input name="imalatMiktar" type="number" placeholder="İmalat Miktarı" className="border px-2 py-1 w-full" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Ekleniyor...' : 'Ekle'}</button>
      </form>
    </main>
  );
}
