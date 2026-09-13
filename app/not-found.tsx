import Link from 'next/link';
export default function NotFound(){return <div className="page narrow empty-state"><h1>This card path is not here.</h1><p>Return to your study dashboard or browse the current deck.</p><Link href="/" className="button primary">Back to study</Link></div>;}
