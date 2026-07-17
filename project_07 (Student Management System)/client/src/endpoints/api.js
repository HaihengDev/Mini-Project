const apiUrl = 'http://localhost:8888/api';

export const getAllStudents = async (path) => {
  const response = await fetch(`${apiUrl}/${path}`);

  if (!response.ok) {
    throw new Error('Failed to fetch students!');
  }

  return response.json();
};

export const exportList = async (path) => {
  const response = await fetch(`${apiUrl}/${path}/download`);

  if (!response.ok) {
    throw new Error('Failed to export student list!');
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'student_list.xlsx';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
