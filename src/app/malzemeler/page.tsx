



import { headers } from 'next/headers';


export default async function MalzemelerPage() {
  // Sunucu ortamında tam URL ile fetch yapılmalı
  const h = headers();
  let baseUrl = 'http://localhost:3001';
  try {
    // headers() bazen Promise dönebilir, bazen doğrudan ReadonlyHeaders döner
    const getHeader = (hh: any) => (typeof hh.get === 'function' ? hh.get('x-forwarded-host') : undefined);
    const forwarded = getHeader(h);
    if (forwarded) baseUrl = `http://${forwarded}`;
  } catch {}
  const res = await fetch(`${baseUrl}/api/malzemeler`, { cache: 'no-store' });
  if (!res.ok) {
    return <div>Malzemeler yüklenemedi.</div>;
  }
  const malzemeler = await res.json();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Malzeme Listesi</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2">Tarih</th>
            <th className="border px-2">Taşınır Kodu</th>
            <th className="border px-2">Ad</th>
            <th className="border px-2">Ölçü Birimi</th>
            <th className="border px-2">Miktar</th>
          </tr>
        </thead>
        <tbody>
          {malzemeler.map((m: any) => (
            <tr key={m.id}>
              <td className="border px-2">{m.tarih}</td>
              <td className="border px-2">{m.tasinir_kodu}</td>
              <td className="border px-2">{m.ad}</td>
              <td className="border px-2">{m.olcu_birimi}</td>
              <td className="border px-2">{m.miktar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
