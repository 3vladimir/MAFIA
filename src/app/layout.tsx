import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  description:
    "بازی مافیا را بدون استفاده از قلم و کاغذ و بدون استرس اشتباه کردن در گردانندگی انجام دهید",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="./facicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
