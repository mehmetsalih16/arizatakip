import { headers } from 'next/headers';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/options";
import { redirect } from "next/navigation";


import React, { useState } from 'react';

export default function JobsPageClient() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [ilce, setIlce] = useState('');
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  async function fetchJobs() {
    let url = '/api/jobs?';
    if (ilce) url += `ilce=${encodeURIComponent(ilce)}&`;
    if (date1) url += `date1=${encodeURIComponent(date1)}&`;
    if (date2) url += `date2=${encodeURIComponent(date2)}&`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      setError(true);
      setJobs([]);
    } else {
      setError(false);
      setJobs(await res.json());
    }
  }

  // İlk yüklemede ve filtre değişince verileri çek
  React.useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, [ilce, date1, date2]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">İş Listesi</h1>
      <div className="flex gap-4 mb-4">
        <input type="text" placeholder="İlçe" value={ilce} onChange={e => setIlce(e.target.value)} className="border px-2 py-1" />
        <input type="date" value={date1} onChange={e => setDate1(e.target.value)} className="border px-2 py-1" />
        <input type="date" value={date2} onChange={e => setDate2(e.target.value)} className="border px-2 py-1" />
        <button onClick={fetchJobs} className="bg-blue-600 text-white px-3 py-1 rounded">Filtrele</button>
      </div>
      {error ? (
        <div>İşler yüklenemedi.</div>
      ) : (
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
      )}
    </main>
  );
}
