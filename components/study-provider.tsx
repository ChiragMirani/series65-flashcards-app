'use client';
import { createContext,useContext,useEffect,useRef,useState,useCallback,type ReactNode } from 'react';
import { IndexedDbStudyRepository, type StudyRepository } from '@/lib/repository';
import { deck } from '@/lib/deck';
import type { Snapshot } from '@/lib/model';
import type { Command } from '@/lib/engine';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
interface Store { data:Snapshot|null; now:Date; busy:boolean; error:string; notice:string; offlineReady:boolean; dispatch:(c:Command)=>Promise<boolean>; clearError:()=>void; }
const Context=createContext<Store|null>(null);
export function StudyProvider({children}:{children:ReactNode}){
  const router=useRouter();
  const [data,setData]=useState<Snapshot|null>(null);
  const [now,setNow]=useState(()=>new Date());
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [notice,setNotice]=useState('');
  const [offlineReady,setOfflineReady]=useState(false);
  const repo=useRef<StudyRepository|null>(null);
  const channel=useRef<BroadcastChannel|null>(null);
  const lock=useRef(false);
  useEffect(()=>{if(!notice)return;const timer=setTimeout(()=>setNotice(''),6000);return()=>clearTimeout(timer);},[notice]);
  useEffect(()=>{
    let active=true;
    const repository=new IndexedDbStudyRepository(deck);
    repo.current=repository;
    const read=()=>repository.read().then(s=>{if(active)setData(s);}).catch(()=>{if(active)setError('Your saved progress could not be opened. Check that this browser allows site storage, then reload. Existing data has not been reset.');});
    void read();
    const bc=typeof BroadcastChannel!=='undefined'?new BroadcastChannel('series65-study'):null;
    channel.current=bc;
    if(bc)bc.onmessage=()=>void read();
    const tick=setInterval(()=>setNow(new Date()),60_000);
    const visible=()=>{if(document.visibilityState==='visible'){setNow(new Date());void read();}};
    document.addEventListener('visibilitychange',visible);
    return()=>{active=false;clearInterval(tick);document.removeEventListener('visibilitychange',visible);bc?.close();repository.close();repo.current=null;};
  },[]);
  useEffect(()=>{
    if(!data)return;
    const media=matchMedia('(prefers-color-scheme: dark)');
    const apply=()=>{document.documentElement.dataset.theme=data.settings.theme==='system'?(media.matches?'dark':'light'):data.settings.theme;document.documentElement.dataset.reduceMotion=String(data.settings.reduceMotion);};
    apply();media.addEventListener('change',apply);return()=>media.removeEventListener('change',apply);
  },[data?.settings,data]);
  useEffect(()=>{
    if(process.env.NODE_ENV!=='production'||!('serviceWorker' in navigator))return;
    let active=true;
    navigator.serviceWorker.register('/sw.js').then(()=>navigator.serviceWorker.ready).then(()=>{if(active)setOfflineReady(true);}).catch(()=>{if(active)setNotice('Offline download did not finish. Reconnect and reload to try again.');});
    return()=>{active=false;};
  },[]);
  const dispatch=useCallback(async(command:Command)=>{
    if(lock.current||!repo.current)return false;
    lock.current=true;setBusy(true);setError('');
    try{
      const next=await repo.current.execute(command);setData(next);setNow(new Date());
      channel.current?.postMessage({revision:next.revision});
      if(command.type==='issue')setNotice('Issue saved on this device. Include it in a progress export for review.');
      else if(command.type==='settings')setNotice('Settings saved.');
      else if(command.type==='import')setNotice('Progress imported.');
      else if(command.type==='reset')setNotice('Progress reset.');
      return true;
    }catch(e){setError(e instanceof Error?e.message:'The change could not be saved. Try again.');try{setData(await repo.current.read());}catch{}return false;}
    finally{lock.current=false;setBusy(false);}
  },[]);
  useEffect(()=>{
    // Optional proposed WebMCP API; unsupported browsers keep the same visible UI.
    type Tool={name:string;description:string;inputSchema:object;annotations:{readOnlyHint:boolean};execute:(input:unknown)=>Promise<object>};
    const context=(document as Document & {modelContext?:{registerTool:(tool:Tool,options:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
    if(!context)return;
    const lifecycle=new AbortController();
    const tool:Tool={name:'start_series65_review',description:'Start or resume a local Series 65 study session. This does not reveal or rate cards.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:false},execute:async(input)=>{z.object({}).strict().parse(input);if(!await dispatch({type:'start',now:new Date().toISOString()}))throw new Error('Session could not be started.');router.push('/review/');return {started:true};}};
    try{void Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>undefined);}catch{}
    return()=>lifecycle.abort();
  },[dispatch,router]);
  return <Context.Provider value={{data,now,busy,error,notice,offlineReady,dispatch,clearError:()=>setError('')}}>
    {error&&<div className="message error" role="alert">{error}<button onClick={()=>setError('')} aria-label="Dismiss error">×</button></div>}
    {notice&&<div className="message" role="status">{notice}<button onClick={()=>setNotice('')} aria-label="Dismiss notice">×</button></div>}
    {children}
  </Context.Provider>;
}
export function useStudy(){const value=useContext(Context);if(!value)throw new Error('Study provider is missing.');return value;}
