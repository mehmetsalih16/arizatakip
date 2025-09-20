

import { headers } from 'next/headers';

  const h = await headers();
  let baseUrl = 'http://localhost:3001';
  const forwarded = h.get('x-forwarded-host');
  if (forwarded) baseUrl = `http://${forwarded}`;
  const res = await fetch(`${baseUrl}/api/jobs`, { cache: 'no-store' });
  if (!res.ok) {
    return <div>İşler yüklenemedi.</div>;
  }
  const jobs = await res.json();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">İş Listesi</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2">Kullanıcı</th>
            <th className="border px-2">Tarih</th>
            <th className="border px-2">İlçe</th>
            <th className="border px-2">Mahalle</th>
            <th className="border px-2">İmalat</th>
            <th className="border px-2">Miktar</th>
            <th className="border px-2">Malzemeler</th>
            <th className="border px-2">Görsel</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job: any) => (
            <tr key={job.id}>
              <td className="border px-2">{job.username}</td>
              <td className="border px-2">{job.date}</td>
              <td className="border px-2">{job.ilce}</td>
              <td className="border px-2">{job.mahalle}</td>
              <td className="border px-2">{job.imalat}</td>
              <td className="border px-2">{job.imalatMiktar}</td>
              <td className="border px-2">{Array.isArray(job.malzemeler) ? job.malzemeler.map((m: any) => `${m.ad}: ${m.miktar}`).join(', ') : ''}</td>
              <td className="border px-2">{Array.isArray(job.gorseller) ? job.gorseller.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
