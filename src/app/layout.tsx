import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#0a0a0a",
          overflow: "hidden",
          overscrollBehavior: "none",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
