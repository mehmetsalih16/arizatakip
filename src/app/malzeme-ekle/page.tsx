
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MalzemeEklePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const data = {
      tarih: formData.get('tarih'),
      tasinir_kodu: formData.get('tasinir_kodu'),
      ad: formData.get('ad'),
      olcu_birimi: formData.get('olcu_birimi'),
      miktar: Number(formData.get('miktar')),
    };
    await fetch('/api/malzeme-ekle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setLoading(false);
    router.push('/malzemeler');
  }

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Malzeme Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="tarih" type="date" className="border px-2 py-1 w-full" required />
        <input name="tasinir_kodu" placeholder="Taşınır Kodu" className="border px-2 py-1 w-full" required />
        <input name="ad" placeholder="Malzeme Adı" className="border px-2 py-1 w-full" required />
        <input name="olcu_birimi" placeholder="Ölçü Birimi" className="border px-2 py-1 w-full" required />
        <input name="miktar" type="number" placeholder="Miktar" className="border px-2 py-1 w-full" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Ekleniyor...' : 'Ekle'}</button>
      </form>
    </main>
  );
}
