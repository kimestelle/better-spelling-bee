import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

test('duck lifecycle: repeated drops, whole-duck overlay, cancellation, resizing, touch and cleanup',async()=>{
 const dom=new JSDOM('<div id="root"></div>',{url:'http://localhost/'});
 Object.assign(globalThis,{window:dom.window,document:dom.window.document,HTMLElement:dom.window.HTMLElement,IS_REACT_ACT_ENVIRONMENT:true});
 const captures=new Map<Element,number>();
 dom.window.HTMLElement.prototype.setPointerCapture=function(id:number){captures.set(this,id);};
 dom.window.HTMLElement.prototype.hasPointerCapture=function(id:number){return captures.get(this)===id;};
 dom.window.HTMLElement.prototype.releasePointerCapture=function(){captures.delete(this);};
 dom.window.HTMLElement.prototype.getBoundingClientRect=function(){
   const tray=this.classList.contains('word-tray');
   return {left:0,top:tray?0:200,right:300,bottom:tray?100:260,width:60,height:60,x:0,y:tray?0:200,toJSON:()=>({})};
 };
 const {default:DuckBoard}=await import('../src/game/DuckBoard');
 const root=createRoot(document.getElementById('root')!);
 const puzzle={id:'test',letters:['a','c','e','l','n','r','t'],center:'a',words:['area']};
 await act(async()=>root.render(React.createElement(DuckBoard,{puzzle,onSubmit:()=>true,sound:false})));
 const source=()=>document.querySelector<HTMLButtonElement>('[aria-label="Add A (required letter)"]')!;
 const word=()=>document.querySelector('.word-readout')!.textContent;
 const emit=async(target:Element|Window,type:string,x=30,y=230,extra:Record<string,unknown>={})=>{
   const event=new dom.window.MouseEvent(type,{bubbles:true,cancelable:true,clientX:x,clientY:y,button:0});
   Object.defineProperties(event,{pointerId:{value:1},isPrimary:{value:true},pointerType:{value:'mouse'},...Object.fromEntries(Object.entries(extra).map(([k,value])=>[k,{value}]))});
   await act(async()=>{target.dispatchEvent(event);});
 };
 for(let i=0;i<3;i++){
   await emit(source(),'pointerdown');await emit(source(),'pointermove',60,50);
   assert.equal(document.querySelectorAll('.drag-overlay img').length,1);assert.equal(document.querySelector('.drag-overlay .duck-letter')!.textContent,'A');
   await emit(source(),'pointerup',60,50);await emit(source(),'click',60,50);
   assert.equal(word(),'A'.repeat(i+1));assert.equal(captures.size,0);assert.equal(document.querySelector('.drag-overlay'),null);
 }
 for(const cancel of ['pointercancel','lostpointercapture']){
   await emit(source(),'pointerdown');await emit(source(),'pointermove',60,50);await emit(source(),cancel,60,50);
   assert.equal(word(),'AAA');assert.equal(document.querySelector('.drag-overlay'),null);
 }
 await emit(source(),'pointerdown');await emit(source(),'pointermove',60,50);
 await act(async()=>window.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true})));
 assert.equal(word(),'AAA');assert.equal(document.querySelector('.drag-overlay'),null);
 await emit(source(),'pointerdown');await emit(source(),'pointermove',60,50);
 await act(async()=>window.dispatchEvent(new dom.window.Event('resize')));
 assert.equal(word(),'AAA');assert.equal(captures.size,0);
 // A touch pointer uses the same capture and release path; no competing touch sensor.
 await emit(source(),'pointerdown',30,230,{pointerType:'touch'});await emit(source(),'pointermove',60,50,{pointerType:'touch'});await emit(source(),'pointerup',60,50,{pointerType:'touch'});
 assert.equal(word(),'AAAA');
 const trayDuck=document.querySelector('[data-tray-duck]')!;
 await emit(trayDuck,'pointerdown',30,50);await emit(trayDuck,'pointermove',400,300);await emit(trayDuck,'pointerup',400,300);
 assert.equal(word(),'AAA');
 await emit(source(),'pointerdown');await emit(source(),'pointermove',60,50);
 await act(async()=>root.unmount());assert.equal(captures.size,0);assert.equal(document.querySelector('.drag-overlay'),null);
 dom.window.close();
});
