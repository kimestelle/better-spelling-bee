import type { Metadata } from 'next';
import '@fontsource/arvo/400.css';
import '@fontsource/arvo/700.css';
import './globals.css';
import { asset } from '../game/rules';
export const metadata: Metadata = { title:'Better Spelling Bee', description:'A little word magic, a pond full of ducks. Play normal or infinite, no account needed.', icons:{icon:asset('black-duck.svg')} };
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body style={{"--noise":`url(${asset("noise.png")})`} as React.CSSProperties}>{children}</body></html>;
}
