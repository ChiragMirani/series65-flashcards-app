import Link from 'next/link';
import { notFound } from 'next/navigation';
import { topics, topicBySlug } from '@/lib/topics';
import { categories } from '@/lib/model';
import { pageMetadata, siteOrigin } from '@/lib/site-info';
import { publicPath } from '@/lib/paths';
import { StructuredData } from '@/components/structured-data';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return topics.map(topic => ({ slug: topic.slug })); }
export async function generateMetadata({ params }: Props) {
  const topic = topicBySlug.get((await params).slug);
  if (!topic) return {};
  return pageMetadata(`${topic.title} — Series 65 questions`, `${topic.cards.length} Series 65 practice questions and answers on ${topic.title.toLowerCase()}, with trap answers and official sources.`, `/topics/${topic.slug}/`);
}

export default async function TopicPage({ params }: Props) {
  const topic = topicBySlug.get((await params).slug);
  if (!topic) notFound();
  const index = topics.indexOf(topic);
  const route = `/topics/${topic.slug}/`;
  const url = (path:string) => siteOrigin ? new URL(publicPath(path), siteOrigin).href : publicPath(path);
  const subject = categories[topic.cards[0].category].title;
  return <article className="page prose">
    <p className="eyebrow"><Link href="/topics/">Topics</Link> · {subject}</p>
    <h1>{topic.title}: Series 65 questions and answers</h1>
    <p className="lead">{topic.cards.length} flashcards. Read the question, then check the answer.</p>
    <p className="micro muted">Draft content pending expert review. Not affiliated with NASAA or FINRA.</p>
    <p><Link className="button primary" href="/">Study with flashcards</Link></p>
    {topic.cards.map(card => <section className="faq-item" key={card.id} id={card.id}>
      <h2>{card.front}</h2>
      <p><strong>Answer:</strong> {card.answer}</p>
      {card.trap && <p className="muted"><strong>Common trap:</strong> {card.trap}</p>}
      <p className="micro">{card.officialSources.map(source => <a key={source.url} href={source.url} rel="noopener" target="_blank">{source.authority}: {source.title}</a>)}</p>
    </section>)}
    <nav className="topic-pager" aria-label="More topics">
      {index > 0 && <Link href={`/topics/${topics[index - 1].slug}/`}>← {topics[index - 1].title}</Link>}
      {index < topics.length - 1 && <Link href={`/topics/${topics[index + 1].slug}/`}>{topics[index + 1].title} →</Link>}
    </nav>
    <StructuredData value={{ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Quiz', name: `Series 65: ${topic.title}`, url: url(route), about: { '@type': 'Thing', name: topic.title }, educationalLevel: 'Professional licensing exam', learningResourceType: 'Flashcards', inLanguage: 'en',
        hasPart: topic.cards.map(card => ({ '@type': 'Question', name: card.front, eduQuestionType: 'Flashcard', acceptedAnswer: { '@type': 'Answer', text: card.answer } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Topics', item: url('/topics/') },
        { '@type': 'ListItem', position: 2, name: topic.title, item: url(route) } ] },
    ] }}/>
  </article>;
}
