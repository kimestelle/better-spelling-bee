'use client';
import React, { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { startIdleFlapping } from './idle';
import { createPortal } from 'react-dom';
import { applyDrop, asset, contains, insertionIndex, MAX_LETTERS, type Letter, type Puzzle } from './rules';

type Drag = { item: Letter; fromTray: boolean; pointer: number; originX: number; originY: number; x: number; y: number; width: number; height: number; moved: boolean; target: HTMLButtonElement };
export function DuckArt({ letter, center, flying = false, flapping = false }: {letter: string; center: boolean; flying?: boolean; flapping?: boolean}) {
  return <span className={`duck-art ${center ? 'center-letter' : ''} ${flapping ? 'is-flapping' : ''}`}>
    {/* Artwork and letter share one isolated stacking context and one animation. */}
    <img className="rest-sprite" src={asset(`game-assets/${flying ? 'duck-fly' : 'duck'}.svg`)} alt="" draggable={false}/>
    {!flying && <img className="flap-sprite" src={asset("game-assets/duck-fly.svg")} alt="" draggable={false}/>}
    <span className="duck-letter">{letter.toUpperCase()}</span>
  </span>;
}
export default function DuckBoard({ puzzle, onSubmit }: { puzzle: Puzzle; onSubmit: (word: string) => {reset: boolean; sink: boolean} }) {
  const [items, setItems] = useState<Letter[]>([]);
  const [order, setOrder] = useState([puzzle.center, ...puzzle.letters.filter(l => l !== puzzle.center)]);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [over, setOver] = useState(false);
  const [animation, setAnimation] = useState('');
  const [flappingIndex, setFlappingIndex] = useState<number | null>(null);
  const [limitMessage, setLimitMessage] = useState('');
  const dragRef = useRef<Drag | null>(null);
  const trayRef = useRef<HTMLDivElement>(null);
  const sequence = useRef(0);
  const suppressClick = useRef(false);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => startIdleFlapping(7, setFlappingIndex, () => !dragRef.current && !busy.current && !document.hidden), []);
  const makeItem = (letter: string) => ({ id: `duck-${sequence.current++}`, letter });
  const clearDrag = useCallback(() => {
    const active = dragRef.current;
    dragRef.current = null;
    setDrag(null); setOver(false);
    if (active?.target.hasPointerCapture(active.pointer)) active.target.releasePointerCapture(active.pointer);
  }, []);
  useEffect(() => {
    const cancel = () => { if (dragRef.current) suppressClick.current = true; clearDrag(); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && dragRef.current) { event.preventDefault(); cancel(); } };
    window.addEventListener('resize', cancel);
    window.addEventListener('blur', cancel);
    window.addEventListener('scroll', cancel, true);
    window.addEventListener('keydown', escape);
    return () => {
      window.removeEventListener('resize', cancel); window.removeEventListener('blur', cancel);
      window.removeEventListener('scroll', cancel, true); window.removeEventListener('keydown', escape);
      clearTimeout(timer.current);
      const active = dragRef.current;
      if (active?.target.hasPointerCapture(active.pointer)) active.target.releasePointerCapture(active.pointer);
    };
  }, [clearDrag]);
  const add = useCallback((letter: string) => {
    if (busy.current || dragRef.current) return;
    setItems(previous => {
      if (previous.length >= MAX_LETTERS) return previous;
      return [...previous, {id: `duck-${sequence.current++}`, letter}];
    });
  }, []);
  const submit = useCallback(() => {
    if (busy.current || dragRef.current || !items.length) return;
    const result = onSubmit(items.map(i => i.letter).join(''));
    if (result.reset) {
      busy.current = true; setAnimation(result.sink ? 'duck-sink' : 'duck-fly');
      timer.current = setTimeout(() => { setItems([]); setAnimation(''); busy.current = false; }, 400);
    }
  }, [items, onSubmit]);
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.repeat || busy.current || dragRef.current) return;
      const target = event.target as HTMLElement;
      if (target.closest('a') || target.matches('input,textarea,select') || target.isContentEditable) return;
      if (event.key === 'Enter' && target.closest('button:not(.duck)')) return;
      if (event.key === 'Enter') { event.preventDefault(); submit(); }
      else if (event.key === 'Backspace' || event.key === 'Delete') { event.preventDefault(); setItems(p => p.slice(0,-1)); }
      else if (puzzle.letters.includes(event.key.toLowerCase())) { event.preventDefault(); add(event.key.toLowerCase()); }
      else if (event.key === 'Escape') setItems([]);
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [add, puzzle.letters, submit]);
  function start(event: ReactPointerEvent<HTMLButtonElement>, item: Letter, fromTray: boolean) {
    if (event.button !== 0 || !event.isPrimary || busy.current || dragRef.current) return;
    suppressClick.current = false;
    const rect = event.currentTarget.getBoundingClientRect();
    const value: Drag = { item, fromTray, pointer: event.pointerId, originX: event.clientX, originY: event.clientY, x: event.clientX, y: event.clientY, width: rect.width, height: rect.height, moved: false, target: event.currentTarget };
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = value;
  }
  function move(event: ReactPointerEvent<HTMLButtonElement>) {
    const active = dragRef.current;
    if (!active || active.pointer !== event.pointerId) return;
    const moved = active.moved || Math.hypot(event.clientX-active.originX,event.clientY-active.originY) > 5;
    const value = {...active, x:event.clientX, y:event.clientY, moved};
    dragRef.current = value;
    if (moved) {
      setDrag(value);
      const rect = trayRef.current?.getBoundingClientRect();
      setOver(!!rect && contains(rect, event.clientX, event.clientY));
    }
  }
  function end(event: ReactPointerEvent<HTMLButtonElement>, cancelled = false) {
    const active = dragRef.current;
    if (!active || active.pointer !== event.pointerId) return;
    suppressClick.current = active.moved || cancelled;
    if (active.moved && !cancelled && trayRef.current) {
      const inside = contains(trayRef.current.getBoundingClientRect(), event.clientX, event.clientY);
      const rects = Array.from(trayRef.current.querySelectorAll<HTMLButtonElement>('[data-tray-duck]'))
        .filter(el => el.dataset.trayDuck !== active.item.id).map(el => el.getBoundingClientRect());
      const index = inside ? insertionIndex(rects, event.clientX, event.clientY) : null;
      setItems(previous => applyDrop(previous, active.item, active.fromTray, index));
    }
    clearDrag();
  }
  function click(action: () => void) {
    if (suppressClick.current) { suppressClick.current = false; return; }
    if (!busy.current) action();
  }
  function handlers(item: Letter, fromTray: boolean) {
    return {
      onPointerDown: (event: ReactPointerEvent<HTMLButtonElement>) => start(event, item, fromTray),
      onPointerMove: move,
      onPointerUp: (event: ReactPointerEvent<HTMLButtonElement>) => end(event),
      onPointerCancel: (event: ReactPointerEvent<HTMLButtonElement>) => end(event, true),
      onLostPointerCapture: () => { if (dragRef.current) { suppressClick.current = true; clearDrag(); } },
    };
  }
  function shuffle() {
    setOrder(previous => {
      const outside = previous.slice(1);
      for (let i=outside.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [outside[i],outside[j]]=[outside[j],outside[i]]; }
      return [puzzle.center,...outside];
    });
  }
  return <section className="board" aria-label="Duck word builder">
    <div className="word-readout sr-only" aria-live="polite" aria-label="Current word">{items.map(i=>i.letter).join('').toUpperCase() || ''}</div>
    <div ref={trayRef} className={`word-tray ${over?'drop-over':''} ${animation}`} aria-label="Word tray" data-testid="word-tray">
      {items.map(item => <button key={item.id} type="button" className={`duck tray-duck ${drag?.item.id===item.id?'drag-source':''}`} data-tray-duck={item.id} aria-label={`Move ${item.letter.toUpperCase()} in word`} {...handlers(item,true)} onClick={()=>click(()=>{})}>
        <DuckArt letter={item.letter} center={item.letter===puzzle.center}/>
      </button>)}
    </div>
    <div className="pond" style={{backgroundImage:`url(${asset('game-assets/pond.svg')})`}} aria-label="Letter pond">
      {order.map((letter,index)=><button type="button" key={letter} className={`duck pond-duck duck-${index}`} aria-label={`Add ${letter.toUpperCase()}${letter===puzzle.center?' (required letter)':''}`} {...handlers({id:`pool-${letter}`,letter},false)}
        onPointerDown={event=>start(event,makeItem(letter),false)}
        onClick={()=>click(()=>{if(items.length>=MAX_LETTERS) setLimitMessage(`Up to ${MAX_LETTERS} letters per word.`); else add(letter);})}>
        <DuckArt letter={letter} center={letter===puzzle.center} flapping={flappingIndex===index && !drag}/>
      </button>)}
    </div>
    <div className="word-controls">
      <button type="button" onClick={()=>setItems(p=>p.slice(0,-1))} disabled={!!animation}>Delete</button>
      <button type="button" className="shuffle" aria-label="Shuffle letters" onClick={shuffle}><img src={asset('game-assets/shuffle.svg')} alt=""/></button>
      <button type="button" onClick={submit} disabled={!!animation}>Enter</button>
    </div>

    <p className="sr-only" role="status">{limitMessage}</p>
    {drag?.moved && createPortal(<div className="drag-overlay" data-testid="drag-overlay" aria-hidden="true" style={{left:drag.x-drag.width/2,top:drag.y-drag.height/2,width:drag.width,height:drag.height}}><DuckArt letter={drag.item.letter} center={drag.item.letter===puzzle.center} flying/></div>,document.body)}
  </section>;
}
