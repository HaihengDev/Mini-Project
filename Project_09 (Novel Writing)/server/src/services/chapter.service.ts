import ChapterRepository from '../repositories/chapter.repository';
import { IChapter } from '../types/types';

class ChapterService {
  async getAll(): Promise<IChapter[]> {
    return await ChapterRepository.findAll();
  }

  async getById(id: string): Promise<IChapter | null> {
    return await ChapterRepository.findById(id);
  }

  async getByNovelId(id: string): Promise<IChapter[]> {
    return await ChapterRepository.findByNovelId(id);
  }

  async create(chapter: IChapter): Promise<IChapter | null> {
    return await ChapterRepository.create(chapter);
  }

  async update(id: string, newChapter: IChapter): Promise<IChapter | null> {
    return await ChapterRepository.update(id, newChapter);
  }

  async delete(id: string): Promise<IChapter | null> {
    return await ChapterRepository.delete(id);
  }
}

export default new ChapterService();
