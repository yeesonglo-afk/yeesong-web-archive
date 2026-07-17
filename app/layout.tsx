import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yisong (Yeesong) Luo — Portfolio",
  description: "Strategy, creative technology, fashion, sustainability and the work between worlds.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
