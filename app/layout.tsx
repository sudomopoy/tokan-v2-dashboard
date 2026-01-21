import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tokan Dashboard",
  description: "Tokan store-builder dashboard"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
