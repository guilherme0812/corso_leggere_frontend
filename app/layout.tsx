export const revalidate = 0;

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Thin.woff2", weight: "100", style: "normal" },
    { path: "./fonts/Poppins-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Poppins-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Poppins-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Poppins-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Poppins-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Poppins-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Corso Leggere",
  description: "gestor de escritório de advocacia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="text-gray-900">
      <body className={`${poppins.variable}  antialiased`}>{children}</body>
    </html>
  );
}
