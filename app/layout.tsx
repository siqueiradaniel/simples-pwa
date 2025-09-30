import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PWA Demo",
  description: "Exemplo PWA Next.js + Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body>{children}</body>
    </html>
  );
}
