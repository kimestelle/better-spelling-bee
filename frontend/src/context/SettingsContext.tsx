'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
const SettingsContext=createContext<{isDarkMode:boolean;toggleDarkMode:()=>void;isSoundEffectsOn:boolean;toggleSoundEffects:()=>void}|undefined>(undefined);
export function useSettings(){const value=useContext(SettingsContext);if(!value)throw new Error('SettingsProvider missing');return value;}
export function SettingsProvider({children}:{children:ReactNode}){
 const [isDarkMode,setDark]=useState(false),[isSoundEffectsOn,setSound]=useState(false);
 useEffect(()=>{setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);},[]);
 const toggleDarkMode=()=>{setDark(previous=>{const next=!previous;document.documentElement.dataset.theme=next?'dark':'light';return next;});};
 useEffect(()=>{
   if(!isSoundEffectsOn)return;
   const small=new Audio(`${process.env.NEXT_PUBLIC_BASE_PATH||''}/audio/small-quack.mp3`);
   const big=new Audio(`${process.env.NEXT_PUBLIC_BASE_PATH||''}/audio/big-quack.mp3`);
   const play=()=>{const audio=Math.floor(Math.random()*8)===0?big:small;audio.currentTime=0;void audio.play().catch(()=>{});};
   document.addEventListener('pointerdown',play);document.addEventListener('keydown',play);
   return()=>{document.removeEventListener('pointerdown',play);document.removeEventListener('keydown',play);small.pause();big.pause();};
 },[isSoundEffectsOn]);
 return <SettingsContext.Provider value={{isDarkMode,toggleDarkMode,isSoundEffectsOn,toggleSoundEffects:()=>setSound(p=>!p)}}>{children}</SettingsContext.Provider>;
}
