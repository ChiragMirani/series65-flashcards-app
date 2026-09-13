import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/lib/site-info';
import { publicPath } from '@/lib/paths';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return siteOrigin?['/','/about/','/faq/'].map(route=>({url:new URL(publicPath(route),siteOrigin).href})):[];}
