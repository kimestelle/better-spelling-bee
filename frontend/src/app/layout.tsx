import type { Metadata } from 'next';
import '@fontsource/arvo/400.css';
import '@fontsource/arvo/700.css';
import './globals.css';
import { asset } from '../game/rules';
import { SettingsProvider } from '../context/SettingsContext';
export const metadata: Metadata = { title:'better-spelling-bee', description:'not your normal nyt spelling bee', icons:{icon:asset('black-duck.svg')} };
export default function RootLayout({children}:{children:React.ReactNode}) {
  const artwork={ '--noise':`url(${asset('noise.png')})`, '--pond':`url(${asset('game-assets/pond.svg')})`, '--duck':`url(${asset('game-assets/duck.svg')})`, '--duck-fly':`url(${asset('game-assets/duck-fly.svg')})` } as React.CSSProperties;
  return <html lang="en" style={artwork}><body className="flex justify-center items-center"><SettingsProvider><div className="h-[100svh] w-full overflow-hidden flex items-center justify-center"><div className="h-[100svh] flex overflow-visible items-center justify-center w-full">{children}</div></div></SettingsProvider></body></html>;
}
