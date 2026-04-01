import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "365 Виджет — Календарь для iOS",
  description: "Маркет виджетов в стиле отрывного календаря для iOS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="antialiased bg-[#0a0a0a]">
      <body className="m-0 p-0 bg-[#0a0a0a] w-screen h-[100dvh] overflow-hidden overscroll-none fixed inset-0">
        {children}
      </body>
    </html>
  );
}
