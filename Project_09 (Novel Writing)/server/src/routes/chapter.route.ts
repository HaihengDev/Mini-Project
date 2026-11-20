import express from 'express';
import {
  createChapter,
  readAllChapters,
  readChapterById,
} from '../controllers/chapter.controller';

const router = express.Router();

router.get('/', readAllChapters);
router.get('/:id', readChapterById);
router.post('/', createChapter);

export default router;
