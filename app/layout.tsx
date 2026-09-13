import type { Metadata,Viewport } from 'next';
import { StudyProvider } from '@/components/study-provider';
import { Header,Footer } from '@/components/chrome';
import { siteOrigin, indexable } from '@/lib/site-info';
import { publicPath } from '@/lib/paths';
import './globals.css';
import './workspace.css';
export const metadata:Metadata={metadataBase:siteOrigin?new URL(siteOrigin):undefined,title:{default:'Series 65 Flashcards — 1,003 exam questions and answers',template:'%s | Series 65 Flashcards'},description:'Study for the Series 65 exam with 1,003 flashcards covering laws, recommendations, investment vehicles, and economics. Trap answers, worked calculations, official sources. Works offline.',keywords:['Series 65','Series 65 flashcards','Series 65 practice questions','Uniform Investment Adviser Law Exam','NASAA Series 65 study'],robots:indexable?{index:true,follow:true}:{index:false,follow:false},openGraph:{type:'website',siteName:'Series 65 Flashcards',title:'Series 65 Flashcards — 1,003 exam questions and answers',description:'Free Series 65 flashcards with answers, trap explanations, and official sources.'},applicationName:'Series 65 Review',manifest:publicPath('/manifest.webmanifest'),icons:{icon:[{url:publicPath('/favicon.ico'),sizes:'16x16 32x32 48x48'},{url:publicPath('/icon.svg'),type:'image/svg+xml'}],apple:publicPath('/icon-192.png')},appleWebApp:{capable:true,title:'Series 65 Review',statusBarStyle:'default'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#0066cc'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body><StudyProvider><Header/><main id="main" tabIndex={-1}>{children}</main><Footer/></StudyProvider></body></html>;}
