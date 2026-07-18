import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yeesong (Yisong Luo) — Portfolio",
  description: "Strategy, creative technology, fashion, sustainability and the work between worlds.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
