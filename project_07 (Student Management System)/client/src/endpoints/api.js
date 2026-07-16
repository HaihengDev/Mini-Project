const apiUrl = 'http://localhost:8888/api';

export const getAllStudents = async () => {
  const response = await fetch(`${apiUrl}/students`);

  if (!response.ok) {
    throw new Error('Failed to fetch students!');
  }

  return response.json();
};
