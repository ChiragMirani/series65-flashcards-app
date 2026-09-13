import type { Metadata } from 'next';
import { Progress } from '@/components/progress';
export const metadata:Metadata={title:'Study progress'};
export default function ProgressPage(){return <Progress/>;}
