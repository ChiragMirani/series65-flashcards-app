import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Browse } from '@/components/browse';
export const metadata:Metadata={title:'Browse flashcards',description:'Search the Series 65 draft review deck by rule, section, category, priority, card type, and review status.'};
export default function BrowsePage(){return <Suspense fallback={<div className="page" role="status">Opening the deck…</div>}><Browse/></Suspense>;}
