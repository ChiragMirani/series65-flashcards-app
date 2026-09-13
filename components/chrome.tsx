'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen,Grid2X2,ChartNoAxesCombined,SlidersHorizontal,Layers } from 'lucide-react';
import { useStudy } from './study-provider';
import { disclaimer } from '@/lib/site-info';
const nav=[{href:'/',label:'Study',icon:BookOpen},{href:'/browse/',label:'Browse',icon:Grid2X2},{href:'/progress/',label:'Progress',icon:ChartNoAxesCombined},{href:'/settings/',label:'Settings',icon:SlidersHorizontal}];
export function Header(){const pathname=usePathname();return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header"><div className="header-inner"><Link href="/" className="brand" aria-label="Series 65 Review home"><Layers aria-hidden="true"/><span>Series<span className="brand-accent">65</span><small>REVIEW</small></span></Link><nav aria-label="Main navigation">{nav.map(({href,label,icon:Icon})=><Link key={href} href={href} aria-current={pathname===href||pathname===href.slice(0,-1)||(href==='/'&&pathname==='/review/')?'page':undefined}><Icon aria-hidden="true"/><span>{label}</span></Link>)}</nav></div></header></>;}
export function Footer(){const {offlineReady}=useStudy();return <footer className="site-footer"><div className="footer-top"><span>{offlineReady?'Available offline on this device':'Progress stays on this device'}</span><div><Link href="/about/">About</Link><Link href="/faq/">FAQ</Link></div></div><p>{disclaimer}</p></footer>;}
