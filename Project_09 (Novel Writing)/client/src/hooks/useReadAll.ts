import { useCallback, useEffect, useState } from 'react';
import { readAll } from '../endpoints/api';

export function useReadAll<T>(path: string) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const refetch = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controllers = new AbortController();

    async function fetchItems() {
      try {
        setLoading(true);
        setError('');

        const items = await readAll<T>(path, controllers.signal);
        setData(items);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(
          err instanceof Error ? err.message : 'Unexpected error occured',
        );
      } finally {
        if (!controllers.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchItems();

    return () => {
      controllers.abort();
    };
  }, [path, reloadKey]);

  return { data, error, loading, refetch };
}
