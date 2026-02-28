import type { Metadata } from "next";
import { Outfit, Cascadia_Code } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cascadiaCode = Cascadia_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "TypeScript → C#",
  description: "Comparaciones de código lado a lado entre TypeScript y C#",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${cascadiaCode.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
