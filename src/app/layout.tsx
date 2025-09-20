import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arıza Takip Sistemi",
  description: "MVP Next.js fullstack uygulama",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <nav className="bg-gray-800 text-white p-4 flex gap-4">
          <Link href="/jobs">İşler</Link>
          <Link href="/job-ekle">İş Ekle</Link>
          <Link href="/malzemeler">Malzemeler</Link>
          <Link href="/malzeme-ekle">Malzeme Ekle</Link>
          <Link href="/raporlar">Raporlar</Link>
        </nav>
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
