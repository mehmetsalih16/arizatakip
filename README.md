This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Railway Deploy Adımları

1. Railway projesi oluşturun veya mevcut projenizi açın.
2. Kodu Railway'e push edin (GitHub ile bağlayın veya railway CLI ile deploy edin).
3. Railway panelinde **Environment** sekmesinden aşağıdaki ortam değişkenlerini ekleyin:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - (Varsa) `DATABASE_URL` (PostgreSQL kullanıyorsanız)
4. Railway'de dosya sistemi kalıcı değildir, fotoğraflar Cloudinary'ye yüklenir.
5. SQLite dosyanız (`backend/data.db`) Railway'de kalıcı değildir, veri kaybı olmaması için Railway PostgreSQL kullanmanız önerilir.
6. Deploy sonrası uygulamanız Railway URL'sinde çalışacaktır.

### Test
- `npx jest` ile otomatik testleri Railway'de de çalıştırabilirsiniz.

### Notlar
- `.env.example` dosyasını referans alarak Railway ortam değişkenlerini eksiksiz girin.
- Cloudinary ve veritabanı bağlantılarını test edin.
