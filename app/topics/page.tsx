import Link from 'next/link';
import { topics } from '@/lib/topics';
import { deck } from '@/lib/deck';
import { pageMetadata, siteOrigin } from '@/lib/site-info';
import { publicPath } from '@/lib/paths';
import { StructuredData } from '@/components/structured-data';

export const metadata = pageMetadata('Series 65 topics — questions and answers', `Browse ${deck.length.toLocaleString('en-US')} Series 65 flashcard questions and answers in ${topics.length} topics, with trap answers and official sources.`, '/topics/');

export default function Topics() {
  const url = (route:string) => siteOrigin ? new URL(publicPath(route), siteOrigin).href : publicPath(route);
  return <article className="page prose">
    <p className="eyebrow">SERIES 65 TOPICS</p>
    <h1>Series 65 questions and answers by topic</h1>
    <p className="lead">{deck.length.toLocaleString('en-US')} flashcards in {topics.length} topics. Each answer links to its source.</p>
    <p className="micro muted">Draft content pending expert review.</p>
    <ol className="topic-list">{topics.map(topic => <li key={topic.slug}><Link href={`/topics/${topic.slug}/`}>{topic.title}</Link> <span className="muted">· {topic.cards.length} cards</span></li>)}</ol>
    <StructuredData value={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Series 65 questions and answers by topic', url: url('/topics/'), about: 'Series 65 Uniform Investment Adviser Law Exam',
      hasPart: topics.map(topic => ({ '@type': 'Quiz', name: `Series 65: ${topic.title}`, url: url(`/topics/${topic.slug}/`) })) }}/>
  </article>;
}
