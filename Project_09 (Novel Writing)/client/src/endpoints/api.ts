const baseUrl = import.meta.env.BASE_URL || 'http://localhost:8888/api/v1';

export async function readAll<T>(
  path: string,
  signal?: AbortSignal,
): Promise<T[]> {
  const cleanPath = path.replace(/^\+/, '');
  const url = `${baseUrl}/${cleanPath}`;

  const response = await fetch(url, {
    method: 'GET',
    signal,
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from the list.');
  }

  const json = (await response.json()) as T[] | { data?: T[] };

  if (Array.isArray(json)) {
    return json;
  }

  if (Array.isArray(json.data)) {
    return json.data;
  }

  throw new Error(
    'unexpected response format: exptected an array or {data: [...]}',
  );
}
