import { headers } from 'next/headers';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/options";
import { redirect } from "next/navigation";


export default async function MalzemelerPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const h = await headers();
  let baseUrl = 'http://localhost:3001';
  const forwarded = h.get('x-forwarded-host');
  if (forwarded) baseUrl = `http://${forwarded}`;
  const res = await fetch(`${baseUrl}/api/malzemeler`, { cache: 'no-store' });
  let malzemeler: any[] = [];
  let error = false;
  if (!res.ok) {
    error = true;
  } else {
    malzemeler = await res.json();
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Malzeme Listesi</h1>
      {error ? (
        <div>Malzemeler yüklenemedi.</div>
      ) : (
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
      )}
    </main>
  );
}
