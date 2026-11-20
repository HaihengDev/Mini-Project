import { Request, Response } from 'express';
import ChapterService from '../services/chapter.service';
import { IChapter } from '../types/types';

export async function readAllChapters(
  res: Response,
): Promise<Response<IChapter[]>> {
  try {
    const chapters = await ChapterService.getAll();

    return res.status(200).json({ data: chapters });
  } catch (err) {
    return res.status(200).json({
      message: 'Server Error',
      error: err,
    });
  }
}

export async function readChapterById(
  req: Request,
  res: Response,
): Promise<Response<IChapter | null>> {
  try {
    const id = req.params.id as string;

    const chapter = await ChapterService.getById(id);

    return res.status(200).json({ data: chapter });
  } catch (err: unknown) {
    return res.status(500).json({
      message: 'Server Error',
      error: err,
    });
  }
}

export async function readAllChapterByNovelId(
  req: Request,
  res: Response,
): Promise<Response<IChapter[]>> {
  try {
    const novelId = req.params.novelId as string;

    const chapters = await ChapterService.getByNovelId(novelId);

    return res.status(200).json({ data: chapters });
  } catch (err: unknown) {
    return res.status(500).json({
      message: 'Server Error',
      error: err,
    });
  }
}

export async function createChapter(
  req: Request,
  res: Response,
): Promise<Response<IChapter | null>> {
  try {
    const { chapter_id, title, novel } = req.body;

    const chapter: IChapter = {
      chapter_id,
      title,
      novel,
    };

    const chapterCreated = await ChapterService.create(chapter);

    return res.status(201).json({
      message: 'Chapter is created successfully.',
      data: chapterCreated,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Server Error',
      error: err,
    });
  }
}

export async function updateChapter(
  req: Request,
  res: Response,
): Promise<Response<IChapter | null>> {
  try {
    const id = req.params.id as string;
    const { chapter_id, title, novel } = req.body;

    const newChapter: IChapter = {
      chapter_id,
      title,
      novel,
    };

    const chapterUpdated = await ChapterService.update(id, newChapter);

    return res.status(200).json({
      message: 'Chpater is updated successfully.',
      data: chapterUpdated,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Server Error',
      error: err,
    });
  }
}

export async function deleteChapter(
  req: Request,
  res: Response,
): Promise<Response<IChapter | null>> {
  try {
    const id = req.params.id as string;

    const chapterDeleted = await ChapterService.delete(id);

    return res.status(204).json({
      message: 'Chatper is deleted successfully.',
      data: chapterDeleted,
    });
  } catch (err: unknown) {
    return res.status(500).json({
      message: 'Server Error',
      error: err,
    });
  }
}
