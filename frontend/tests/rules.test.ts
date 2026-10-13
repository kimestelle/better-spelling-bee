import test from 'node:test';
import assert from 'node:assert/strict';
import puzzles from '../src/game/puzzles.json';
import {applyDrop,checkWord,contains,dailyIndex,insertionIndex,MAX_LETTERS,nextPuzzleIndex,restoreWords,scoreWord} from '../src/game/rules';
const puzzle={id:'test',letters:['a','c','e','l','n','r','t'],center:'a',words:['area','crate','central','reentrant']};
test('validation enforces minimum, required letter, allowed letters, dictionary, and duplicates',()=>{
 assert.match(checkWord('cat',puzzle,[]).message,/short/);
 assert.match(checkWord('tree',puzzle,[]).message,/white/);
 assert.match(checkWord('axle',puzzle,[]).message,/pond/);
 assert.match(checkWord('aaaa',puzzle,[]).message,/word list/);
 assert.match(checkWord('area',puzzle,['area']).message,/Already/);
 assert.equal(checkWord(' AREA ',puzzle,[]).valid,true);
});
test('scores preserve four-letter and pangram rules including longer pangrams',()=>{
 assert.equal(scoreWord('area'),1);assert.equal(scoreWord('crate'),5);assert.equal(scoreWord('central'),14);assert.equal(scoreWord('reentrant'),9);
});
test('all bundled puzzles are playable, unique, have pangrams and valid words',()=>{
 assert.equal(puzzles.length,366);assert.equal(new Set(puzzles.map(p=>p.id)).size,366);
 for(const p of puzzles){assert.equal(new Set(p.letters).size,7);assert(p.letters.includes(p.center));assert(p.words.length>=20);assert.equal(new Set(p.words).size,p.words.length);assert(p.words.some(w=>new Set(w).size===7));for(const w of p.words)assert(checkWord(w,p,[]).valid,`${p.id}: ${w}`);}
});
test('restore rejects malformed, tampered and duplicated progress; score is recomputed',()=>{
 assert.deepEqual(restoreWords('broken',puzzle),[]);assert.deepEqual(restoreWords('{"score":999}',puzzle),[]);
 assert.deepEqual(restoreWords('["area","area",42,"invalid"]',puzzle),['area']);
});
test('daily selection is stable and next puzzle always differs',()=>{
 assert.equal(dailyIndex('2026-10-13',366),dailyIndex('2026-10-13',366));
 assert.equal(dailyIndex('2026-10-14',366),(dailyIndex('2026-10-13',366)+1)%366);
 for(const random of [0,.5,.99999])assert.notEqual(nextPuzzleIndex(365,366,random),365);
});
test('drop appends, reorders, removes and never mutates original state',()=>{
 const a={id:'a',letter:'a'},b={id:'b',letter:'a'},c={id:'c',letter:'c'};const before=[a,c];
 assert.deepEqual(applyDrop(before,b,false,1),[a,b,c]);assert.deepEqual(before,[a,c]);
 assert.deepEqual(applyDrop(before,a,true,1),[c,a]);assert.deepEqual(applyDrop(before,a,true,null),[c]);
 assert.equal(applyDrop(before,b,false,null),before);
 const full=Array.from({length:MAX_LETTERS},(_,i)=>({id:String(i),letter:'a'}));assert.equal(applyDrop(full,b,false,2),full);
});
test('hit testing uses pointer position and insertion supports wrapped rows',()=>{
 const rect={left:0,right:100,top:0,bottom:50};assert(contains(rect,50,25));assert(!contains(rect,50,60));
 const rects=[{left:0,right:40,top:0,bottom:40},{left:40,right:80,top:0,bottom:40},{left:0,right:40,top:40,bottom:80}];
 assert.equal(insertionIndex(rects,10,20),0);assert.equal(insertionIndex(rects,70,20),2);assert.equal(insertionIndex(rects,10,60),2);assert.equal(insertionIndex(rects,70,60),3);
});
