import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <p className="text-sm tracking-[0.3em] text-gold uppercase">✦ WhisperUp ✦</p>
      <h1 className="font-serif text-4xl mt-4">Bootstrap OK</h1>
      <p className="font-sans mt-2 opacity-70">locale: {locale}</p>
    </main>
  );
}
