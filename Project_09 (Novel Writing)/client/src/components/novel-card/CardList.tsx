import { useReadAll } from '../../hooks/useReadAll';
import type { INovel } from '../../types/novel.type';
import Loading from '../commons/Loading';
import Error from '../commons/Error';
import Card from './Card';

export default function CardList() {
  const { data: novels, error, loading } = useReadAll<INovel>('novels');

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="card-list">
      {novels.map((novel) => (
        <Card key={novel.novel_id} title={novel.title} />
      ))}
    </div>
  );
}
