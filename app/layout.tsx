import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Charutos Premium — Catálogo 2025",
  description: "Maior seleção de charutos premium do Brasil. Cubanos, dominicanos, nicaraguenses e nacionais. Entrega para todo o país.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
