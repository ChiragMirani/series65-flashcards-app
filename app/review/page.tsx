import type { Metadata } from 'next';
import { LegacyReviewRedirect } from '@/components/review';
export const metadata:Metadata={title:'Review cards'};
export default function ReviewPage(){return <LegacyReviewRedirect/>;}
