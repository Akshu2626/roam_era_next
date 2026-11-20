import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Off the map',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '100svh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: 'calc(var(--header-h) + 40px) var(--gutter) 80px',
      }}
    >
      <div style={{ display: 'grid', gap: 32, justifyItems: 'center' }}>
        <p className="eyebrow" style={{ color: 'var(--dim)' }}>
          Error 404
        </p>
        <h1 className="display" style={{ fontSize: 'clamp(64px, 13vw, 220px)' }}>
          Off the <span className="italic">map.</span>
        </h1>
        <p className="lead" style={{ marginInline: 'auto' }}>
          Even the best explorers take a wrong turn. This page doesn&apos;t exist — but the mountains and the sea do.
        </p>
        <Link href="/" className="btn">
          Back to the journey <ArrowUpRight size={16} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}
