export const metadata = { title: "Rebel7 Starter", description: "Next 13+ TS" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="it">
      <body className="min-h-dvh bg-black text-white antialiased">
        {children}
        {gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script dangerouslySetInnerHTML={{ __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date()); gtag('config', '${gaId}');
            `}} />
          </>
        ) : null}
      </body>
    </html>
  );
}
