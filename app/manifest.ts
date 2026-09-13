import type { MetadataRoute } from 'next';
import { publicPath } from '@/lib/paths';
export const dynamic='force-static';
export default function manifest():MetadataRoute.Manifest{return {id:publicPath('/'),name:'Series 65 Review',short_name:'Series65',description:'Focused Series 65 flashcards and tap-through review.',start_url:publicPath('/'),scope:publicPath('/'),display:'standalone',background_color:'#f5f5f7',theme_color:'#0066cc',lang:'en',icons:[{src:publicPath('/icon-192.png'),sizes:'192x192',type:'image/png',purpose:'any'},{src:publicPath('/icon-512.png'),sizes:'512x512',type:'image/png',purpose:'any'},{src:publicPath('/icon-maskable-512.png'),sizes:'512x512',type:'image/png',purpose:'maskable'}]};}
