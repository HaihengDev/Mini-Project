import express from 'express';
import {
  createChapter,
  deleteChapter,
  updateChapter,
  readAllChapterByNovelId,
  readAllChapters,
  readChapterById,
} from '../controllers/chapter.controller';

const router = express.Router();

router.get('/', readAllChapters);
router.get('/:id', readChapterById);
router.get('/:novelId', readAllChapterByNovelId);
router.post('/', createChapter);
router.put('/:id', updateChapter);
router.delete('/:id', deleteChapter);

export default router;
