import Link from 'next/link';
import LoginScene from './LoginScene';
import { asset } from '../game/rules';
export default function Home() {
  return <main className="opening">
    <img src={asset('logo.svg')} alt="Better Spelling Bee" className="opening-logo"/>
    <div className="opening-actions"><Link href="/play/daily/" className="play-button">Normal</Link><Link href="/play/infinite/" className="play-button">Infinite</Link></div>
    <LoginScene/>
  </main>;
}
