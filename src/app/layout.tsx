import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "365 Виджет — Календарь для iOS",
  description: "Маркет виджетов в стиле отрывного календаря для iOS",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="antialiased" style={{ height: "100%" }}>
      <body
        className="m-0 p-0 overscroll-none"
        style={{
          minHeight: "100lvh",
          overflow: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
