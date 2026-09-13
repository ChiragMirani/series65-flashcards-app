'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Check, Link2 } from 'lucide-react';
import { useStudy } from './study-provider';
import { disclaimer } from '@/lib/site-info';
import { publicPath } from '@/lib/paths';
import { studyLink } from '@/lib/study-selection';

export function Header() {
  const { data } = useStudy();
  const [notice, setNotice] = useState('');
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(''), 3000); return () => clearTimeout(timer); }, [notice]);
  const copy = async () => {
    const session = data?.session;
    const url = studyLink(window.location.origin, publicPath('/'), session?.category, session?.mode ?? 'random');
    try { await navigator.clipboard.writeText(url); setNotice('Link copied'); }
    catch { setNotice('Use your browser Share menu to copy the link.'); }
  };
  return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header"><div className="header-inner"><Link href="/" className="brand" aria-label="Series 65 Review home"><span>Series<span className="brand-accent">65</span></span></Link><button className="share-link" aria-label="Copy study link" title="Copy study link" onClick={() => void copy()}>{notice === 'Link copied' ? <Check aria-hidden="true"/> : <Link2 aria-hidden="true"/>}</button><span className="share-notice" role="status">{notice}</span></div></header></>;
}
export function Footer() {
  const { offlineReady } = useStudy();
  return <footer className="site-footer"><nav aria-label="Study tools"><Link href="/">Study</Link><Link href="/browse/">Browse</Link><Link href="/topics/">Topics</Link><Link href="/progress/">Progress</Link><Link href="/settings/">Settings</Link><Link href="/about/">About</Link><Link href="/faq/">FAQ</Link></nav><p className="offline-note">{offlineReady ? 'Available offline on this device' : 'Progress stays on this device'}</p><p>{disclaimer}</p></footer>;
}
