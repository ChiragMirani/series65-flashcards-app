import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/lib/site-info';
import { publicPath } from '@/lib/paths';
import { topics } from '@/lib/topics';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{
  if(!siteOrigin) return [];
  const routes=['/','/topics/',...topics.map(topic=>`/topics/${topic.slug}/`),'/about/','/faq/'];
  return routes.map(route=>({url:new URL(publicPath(route),siteOrigin).href,changeFrequency:'monthly',priority:route==='/'?1:route.startsWith('/topics/')?0.8:0.5}));
}
