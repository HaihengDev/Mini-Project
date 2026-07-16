const apiUrl = 'http://localhost:8888/api';

export const getAllStudents = async (path) => {
  const response = await fetch(`${apiUrl}/${path}`);

  if (!response.ok) {
    throw new Error('Failed to fetch students!');
  }

  return response.json();
};
