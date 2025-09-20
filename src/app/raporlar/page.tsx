
"use client";
import { useState } from 'react';

export default function RaporlarPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleExport(type: 'excel' | 'pdf') {
    setLoading(true);
    setMessage(null);
    const res = await fetch('/api/raporlar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      setMessage(`${type.toUpperCase()} raporu başarıyla oluşturuldu: ${data.filePath}`);
    } else {
      setMessage('Rapor oluşturulamadı.');
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Raporlar</h1>
      <button
        onClick={() => handleExport('excel')}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        disabled={loading}
      >
        {loading ? 'Oluşturuluyor...' : 'Excel Raporu Oluştur'}
      </button>
      <button
        onClick={() => handleExport('pdf')}
        className="bg-red-600 text-white px-4 py-2 rounded ml-2"
        disabled={loading}
      >
        {loading ? 'Oluşturuluyor...' : 'PDF Raporu Oluştur'}
      </button>
      {message && <div className="mt-4 text-blue-700">{message}</div>}
    </main>
  );
}
