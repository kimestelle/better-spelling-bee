'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import puzzles from './puzzles.json';
import DuckBoard from './DuckBoard';
import { asset, checkWord, dailyIndex, nextPuzzleIndex, restoreWords, scoreWord, type Puzzle } from './rules';

function read(key: string) { try { return localStorage.getItem(key); } catch { return null; } }
function write(key: string, value: string) { try { localStorage.setItem(key,value); return true; } catch { return false; } }
const today = () => new Date().toISOString().slice(0,10);
type Mode = 'normal' | 'infinite';
export default function Game({mode}: {mode: Mode}) {
  const [date,setDate] = useState('');
  const [practice,setPractice] = useState<number | null>(null);
  useEffect(()=>{
    setDate(today());
    const stored = Number(read('duck-pond:practice'));
    setPractice(Number.isInteger(stored) && stored>=0 && stored<puzzles.length ? stored : 0);
    const update = () => setDate(today());
    const timer = setInterval(update,30000);
    window.addEventListener('focus',update);
    return ()=>{ clearInterval(timer); window.removeEventListener('focus',update); };
  },[]);
  if (!date || practice===null) return <main className="loading" aria-label="Loading game"><img src={asset('game-assets/duck.svg')} alt="Loading"/></main>;
  const index = mode==='normal' ? dailyIndex(date,puzzles.length) : practice;
  const key = `duck-pond:v1:${mode}:${mode==='normal'?date+':':''}${puzzles[index].id}`;
  return <GameSession key={key} puzzle={puzzles[index]} storageKey={key} mode={mode} date={date} onNext={()=>{
    const next = nextPuzzleIndex(index,puzzles.length);
    write('duck-pond:practice',String(next)); setPractice(next);
  }}/>;
}
function GameSession({puzzle,storageKey,mode,date,onNext}: {puzzle: Puzzle;storageKey:string;mode:Mode;date:string;onNext:()=>void}) {
  const [found,setFound]=useState<string[]>([]);
  const [ready,setReady]=useState(false);
  const [status,setStatus]=useState('');
  const [storageUnavailable,setStorageUnavailable]=useState(false);
  const [sound,setSound]=useState(false);
  useEffect(()=>{setFound(restoreWords(read(storageKey),puzzle));setReady(true);},[puzzle,storageKey]);
  const points=found.reduce((sum,w)=>sum+scoreWord(w),0);
  const total=puzzle.words.reduce((sum,w)=>sum+scoreWord(w),0);
  const target=Math.ceil(total*.7);
  const submit=useCallback((word:string)=>{
    const result=checkWord(word,puzzle,found);
    setStatus(result.message);
    if(!result.valid) return false;
    const updated=[...found,result.word];
    setFound(updated);
    setStorageUnavailable(!write(storageKey,JSON.stringify(updated)));
    return true;
  },[found,puzzle,storageKey]);
  return <main className="game-shell">
    <header className="game-header">
      <Link href="/" aria-label="Back to opening screen" className="icon-link"><img src={asset('icons/home-icon.svg')} alt=""/></Link>
      <img src={asset('logo.svg')} alt="Better Spelling Bee" className="game-logo"/>
      <label className="sound-toggle"><input type="checkbox" checked={sound} onChange={e=>setSound(e.target.checked)}/> Sound</label>
    </header>
    <nav className="mode-nav" aria-label="Game mode"><Link href="/play/daily/" aria-current={mode==='normal'?'page':undefined}>Normal</Link><Link href="/play/infinite/" aria-current={mode==='infinite'?'page':undefined}>Infinite</Link></nav>
    <p className="mode-caption">{mode==='normal'?`The daily pond · ${date} (UTC)`:'A fresh pond whenever you like'}{mode==='infinite'&&<button type="button" className="text-button" onClick={onNext}>New puzzle ↗</button>}</p>
    <div className="game-columns">
      <div className="play-area">
        <p className="game-status" role="status">{status || <>Every word needs <strong>{puzzle.center.toUpperCase()}</strong>, the white letter.</>}</p>
        {ready && <DuckBoard puzzle={puzzle} onSubmit={submit} sound={sound}/>}
      </div>
      <aside className="score-panel" aria-label="Your progress">
        <div className="score-heading"><strong data-testid="score">{points}</strong><span>points</span><span className="rank">{found.length===puzzle.words.length?'Pond perfect!':points>=target?'Genius!':'Keep paddling'}</span></div>
        <progress value={Math.min(points,target)} max={target} aria-label="Progress toward genius"/>
        <p className="score-caption">{points>=target?'Genius reached! Keep finding words.':`${target-points} points to genius`}</p>
        <h2>Found words <span>{found.length} / {puzzle.words.length}</span></h2>
        {found.length ? <ul className="found-words">{[...found].sort().map(w=><li key={w}>{w}<span>{scoreWord(w)}</span></li>)}</ul> : <p className="empty-words">A whole pond of possibilities.<br/>Your words will appear here.</p>}
        {found.length===puzzle.words.length&&<p role="status" className="completion">You found every word. Quack-tastic!</p>}
        <details className="rules"><summary>How to play</summary><p>Make words with 4 or more letters. Always include the white letter. Letters can be used more than once.</p><p>Four-letter words earn 1 point. Longer words earn their length. A pangram uses all 7 letters and earns 14 points.</p><p>Drag ducks into the word tray, rearrange them, or click a tray duck to remove it. Drag one back out to remove it. Escape cancels a drag or clears the word.</p><p>Normal has one puzzle per UTC day. Infinite draws from 366 bundled puzzles. Progress stays in this browser; no account needed.</p></details>
        <p className="save-note">{storageUnavailable?'Browser storage is unavailable. Progress lasts for this visit.':'Progress saved on this device.'}</p>
      </aside>
    </div>
  </main>;
}
