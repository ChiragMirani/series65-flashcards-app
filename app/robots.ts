import type { MetadataRoute } from 'next';
import { indexable, siteOrigin } from '@/lib/site-info';
import { publicPath } from '@/lib/paths';
export const dynamic='force-static';
export default function robots():MetadataRoute.Robots{
  if(!indexable||!siteOrigin) return {rules:[{userAgent:'*',disallow:'/'}]};
  return {rules:[{userAgent:'*',allow:'/',disallow:[publicPath('/progress/'),publicPath('/settings/')]}],sitemap:new URL(publicPath('/sitemap.xml'),siteOrigin).href};
}
