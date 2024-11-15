"use client";

import { Arvo } from "next/font/google";
import { AuthProvider } from '../context/AuthContext'; 
import "./globals.css";
import { useQuackOnClick } from './components/QuackOnClick';


const arvo = Arvo({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useQuackOnClick();
  return (
    <div className={`${arvo.className} h-[100svh] w-full overflow-hidden flex items-center justify-center`}>
      <AuthProvider>
        <div className='h-[100svh] flex overflow-visible items-center justify-center'>
          {children}
        </div>
      </AuthProvider>
    </div>
  );
}
