import { ExternalLink } from 'lucide-react';
import type { Card } from '@/lib/model';

export function OfficialLinks({ card }: { card: Card }) {
  return <div className="official-links" aria-label="Answer sources">
    {card.officialSources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" title={source.title}>
      {source.authority} {source.kind === 'outline' ? 'exam topic' : source.kind === 'rule' ? 'rule' : source.kind === 'reference' ? 'reference' : 'guide'}
      <ExternalLink size={13} aria-hidden="true"/><span className="sr-only">: {source.title} (opens in a new tab)</span>
    </a>)}
  </div>;
}
