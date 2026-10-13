'use client';
import { useCallback, useEffect, useState } from 'react';
import puzzles from './puzzles.json';
import DuckBoard from './DuckBoard';
import FoundWords from './original/FoundWords';
import ScoreBar from './original/ScoreBar';
import TopBar from './original/TopBar';
import WinScreen from './original/WinScreen';
import { asset, checkWord, dailyIndex, nextPuzzleIndex, restoreWords, scoreWord, type Puzzle } from './rules';

function read(key: string) { try { return localStorage.getItem(key); } catch { return null; } }
function write(key: string, value: string) { try { localStorage.setItem(key,value); return true; } catch { return false; } }
const today = () => new Date().toISOString().slice(0,10);
type Mode = 'normal' | 'infinite';
export default function Game({mode}: {mode: Mode}) {
  const [date,setDate] = useState('');
  const [practice,setPractice] = useState<number | null>(null);
  const [generation,setGeneration] = useState(0);
  useEffect(()=>{
    setDate(today());
    const stored = Number(read('duck-pond:practice'));
    setPractice(Number.isInteger(stored) && stored>=0 && stored<puzzles.length ? stored : 0);
    const update = () => setDate(today());
    const timer = setInterval(update,30000);
    window.addEventListener('focus',update);
    return ()=>{ clearInterval(timer); window.removeEventListener('focus',update); };
  },[]);
  if (!date || practice===null) return <div className="w-[10svh] h-[10svh] flex justify-center items-center bg-white rounded-[100%] bg-opacity-50 border-[1svh] border-white border-opacity-20"><img src={asset('game-assets/duck.svg')} alt="Loading" className="w-[6svh] h-[6svh] twirl-infinite-animation"/></div>;
  const index = mode==='normal' ? dailyIndex(date,puzzles.length) : practice;
  const key = `duck-pond:v1:${mode}:${mode==='normal'?date+':':''}${puzzles[index].id}`;
  return <GameSession key={key+':'+generation} puzzle={puzzles[index]} storageKey={key} mode={mode} date={date} onNext={()=>{
    if(!window.confirm('Are you sure you want to reset the game? This cannot be undone.'))return;
    const next = nextPuzzleIndex(index,puzzles.length);
    write(`duck-pond:v1:infinite:${puzzles[next].id}`,'[]');
    write('duck-pond:practice',String(next)); setPractice(next);setGeneration(g=>g+1);
  }}/>;
}
function GameSession({puzzle,storageKey,mode,date,onNext}: {puzzle: Puzzle;storageKey:string;mode:Mode;date:string;onNext:()=>void}) {
  const [found,setFound]=useState<string[]>([]);
  const [ready,setReady]=useState(false);
  const [status,setStatus]=useState('');
  const [winScreenDisplayed,setWinScreenDisplayed]=useState(false);
  useEffect(()=>{setFound(restoreWords(read(storageKey),puzzle));setReady(true);},[puzzle,storageKey]);
  useEffect(()=>{if(!status)return;const timer=setTimeout(()=>setStatus(''),1500);return()=>clearTimeout(timer);},[status]);
  const points=found.reduce((sum,w)=>sum+scoreWord(w),0);
  const total=puzzle.words.reduce((sum,w)=>sum+scoreWord(w),0);
  const percentage=points/total*100;
  const counterPosition=[2,5,8,15,25,40,50].findIndex(limit=>percentage<=limit)+1 || 8;
  const submit=useCallback((word:string)=>{
    const result=checkWord(word,puzzle,found);
    if(word.length<4){setStatus('Too Short!');return {reset:false,sink:false};}
    if(!word.includes(puzzle.center)){setStatus('Missing center letter');return {reset:true,sink:true};}
    if(found.includes(word)){setStatus('Already found!');return {reset:true,sink:true};}
    if(!result.valid){setStatus('Not in word list');return {reset:true,sink:true};}
    const updated=[...found,result.word];
    setFound(updated);
    const saved=write(storageKey,JSON.stringify(updated));
    setStatus(saved ? new Set(word).size===7?'PANGRAM!':word.length===4?'good!':word.length===5?'great!':'quack-tastic!' : 'Progress could not be saved on this device');
    return {reset:true,sink:false};
  },[found,puzzle,storageKey]);
  if(points>=Math.ceil(total*.7)&&!winScreenDisplayed)return <WinScreen onReturn={()=>setWinScreenDisplayed(true)}/>;
  return <main className="flex flex-col w-[50svh] h-[100svh] md:w-[100svh] border-black md:pt-[2svh]" aria-label={mode==='normal'?'Normal game':'Infinite game'}>
    <div className="flex flex-col h-full items-center">
      <TopBar daily={mode==='normal'}/>
      {mode==='normal'?<span className="inline-block text-white">daily: <span className="italic">{date.slice(5,7)}/{date.slice(8,10)}/{date.slice(0,4)}</span></span>:<span className="inline-block bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] to-50% text-transparent bg-clip-text">infinite mode! <span onClick={onNext} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==='Enter'||e.key===' ')onNext();}} className="text-white italic clickable">&lt;reset game&gt;</span></span>}
    </div>
    <div className="flex flex-col md:flex-row-reverse">
      <div className="relative h-[14svh] w-[50svh] flex flex-col md:mt-[2svh]">
        <ScoreBar points={points} counterPosition={counterPosition}/>
        <FoundWords foundWords={found}/>
      </div>
      <div className="flex flex-col h-[75svh] w-[50svh] md:mt-[8svh]">
        <div role="status" className={`flex h-[4svh] w-fit justify-center items-center self-center px-[1.5svh] ${status?'bg-white bg-opacity-50 rounded-lg':''}`}>{status}</div>
        {ready&&<DuckBoard puzzle={puzzle} onSubmit={submit}/>}
      </div>
    </div>
  </main>;
}
