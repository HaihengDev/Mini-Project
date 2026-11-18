import express from 'express';
import {
  createNovel,
  deleteNovel,
  readAllNovels,
  readNovelById,
  updateNovel,
} from '../controllers/novel.controller';

const router = express.Router();

router.get('/', readAllNovels);
router.get('/:id', readNovelById);
router.post('/', createNovel);
router.put('/:id', updateNovel);
router.delete('/:id', deleteNovel);

export default router;
