const apiUrl = import.meta.env.VITE_API_KEY;

export const getAll = async (path) => {
  const response = await fetch(`${apiUrl}/${path}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data!');
  }

  return response.json();
};

export const getById = async (path, id) => {
  const response = await fetch(`${apiUrl + path}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data!');
  }

  return response.json();
};

export const create = async (path, data) => {
  const response = await fetch(`${apiUrl}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create!');
  }

  return response.json();
};
