'use client';

export default function StreamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-950">
      {children}
    </main>
  );
} 