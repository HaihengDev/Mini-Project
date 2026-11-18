import { Request, Response } from 'express';
import NovelService from '../services/novel.service';
import { INovel } from '../types/types';

export async function readAllNovels(
  req: Request,
  res: Response,
): Promise<Response<INovel[]>> {
  try {
    const novels = await NovelService.getAll();

    return res.status(200).json({
      data: novels,
    });
  } catch (err: unknown) {
    return res.status(500).json({
      message: 'Server Error',
      error: err,
    });
  }
}

export async function readNovelById(
  req: Request,
  res: Response,
): Promise<Response<INovel | null>> {
  try {
    const id = req.params.id as string;

    const novel = await NovelService.getById(id);

    return res.status(200).json({
      data: novel,
    });
  } catch (err: unknown) {
    return res.status(500).json({
      message: 'Server Error',
      error: err,
    });
  }
}

export async function createNovel(
  req: Request,
  res: Response,
): Promise<Response<INovel | null>> {
  try {
    const { novel_id, title } = req.body;

    const novel: INovel = {
      novel_id,
      title,
    };

    const novelCreated = await NovelService.create(novel);

    return res.status(201).json({
      message: 'Novel is created successfully!',
      data: novelCreated,
    });
  } catch (err: unknown) {
    return res.status(500).json({
      message: 'Server Errro',
      error: err,
    });
  }
}

export async function updateNovel(
  req: Request,
  res: Response,
): Promise<Response<INovel | null>> {
  try {
    const id = req.params.id as string;
    const { novel_id, title } = req.body;

    const newNovel: INovel = {
      novel_id,
      title,
    };

    const novelUpdated = await NovelService.update(id, newNovel);

    return res.status(200).json({
      message: 'Novel is updatd successfully!',
      data: novelUpdated,
    });
  } catch (err: unknown) {
    return res.status(500).json({
      message: 'Server Error',
      error: err,
    });
  }
}

export async function deleteNovel(
  req: Request,
  res: Response,
): Promise<Response<INovel | null>> {
  try {
    const id = req.params.id as string;
    const novelDeleted = await NovelService.delete(id);

    return res.status(204).json({
      message: 'Novel is deleted successfully.',
      data: novelDeleted,
    });
  } catch (err: unknown) {
    return res.status(500).json({
      message: 'Server Error',
      error: err,
    });
  }
}
