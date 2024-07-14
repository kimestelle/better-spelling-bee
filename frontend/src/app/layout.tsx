import type { Metadata } from "next";
import { Arvo } from "next/font/google";

import ClientLayout from './ClientLayout'

import "./globals.css";

const arvo = Arvo({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "better-spelling-bee",
  description: "not your normal nyt spelling bee",
  icons: {
    icon: "/black-duck.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={arvo.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
