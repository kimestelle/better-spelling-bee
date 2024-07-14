"use client";

import { Arvo } from "next/font/google";
import { AuthProvider } from './context/AuthContext'; // Ensure the correct path
import "./globals.css";

const arvo = Arvo({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${arvo.className} h-[100svh] w-full overflow-hidden flex items-center justify-center`}>
      <AuthProvider>
        <div className='h-[100svh] w-[50svh] flex overflow-visible'>
          {children}
        </div>
      </AuthProvider>
    </div>
  );
}
