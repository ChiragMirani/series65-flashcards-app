import type { Metadata,Viewport } from 'next';
import { StudyProvider } from '@/components/study-provider';
import { Header,Footer } from '@/components/chrome';
import { siteOrigin } from '@/lib/site-info';
import './globals.css';
import './workspace.css';
export const metadata:Metadata={metadataBase:siteOrigin?new URL(siteOrigin):undefined,title:{default:'Series 65 Review — Focused flashcards',template:'%s | Series 65 Review'},description:'A focused Series 65 final-review prototype with original recall, application, contrast, and calculation flashcards, spaced repetition, and device-local progress.',robots:{index:false,follow:false},applicationName:'Series 65 Review',manifest:'/manifest.webmanifest',icons:{icon:[{url:'/favicon.ico',sizes:'16x16 32x32 48x48'},{url:'/icon.svg',type:'image/svg+xml'}],apple:'/icon-192.png'},appleWebApp:{capable:true,title:'Series 65 Review',statusBarStyle:'default'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#0066cc'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body><StudyProvider><Header/><main id="main" tabIndex={-1}>{children}</main><Footer/></StudyProvider></body></html>;}
