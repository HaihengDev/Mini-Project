import { exportList } from '../endpoints/api.js';

export const handleExport = async (path) => {
  try {
    await exportList(path);
  } catch (err) {
    alert(err.message);
  }
};
