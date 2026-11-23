import type { ReactElement } from 'react';

export default function Card({
  title,
  chapterCount,
}: {
  title: string;
  chapterCount?: number;
}): ReactElement {
  return (
    <section className="card-container">
      <h3>{title}</h3>
      {chapterCount !== undefined && <p>chapters: {chapterCount}</p>}
    </section>
  );
}
