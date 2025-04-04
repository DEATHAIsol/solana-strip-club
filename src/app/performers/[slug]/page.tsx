import { notFound } from 'next/navigation';
import { performers } from '@/data/performers';
import PerformerProfile from '@/components/PerformerProfile';

interface PerformerPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return performers.map((performer) => ({
    slug: performer.slug,
  }));
}

export default function PerformerPage({ params }: PerformerPageProps) {
  const performer = performers.find((p) => p.slug === params.slug);

  if (!performer) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <PerformerProfile {...performer} />
    </main>
  );
} 