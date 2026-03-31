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
    <html lang="ru" className="antialiased">
      <body className="bg-[#030303] overflow-x-hidden">{children}</body>
    </html>
  );
}
