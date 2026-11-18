import NovelRepository from '../repositories/novel.repository';
import { INovel } from '../types/types';

class NovelService {
  async getAll(): Promise<INovel[]> {
    return await NovelRepository.findAll();
  }

  async getById(id: string): Promise<INovel | null> {
    return await NovelRepository.findById(id);
  }

  async create(novel: INovel): Promise<INovel | null> {
    return await NovelRepository.create(novel);
  }

  async update(id: string, newNovel: INovel): Promise<INovel | null> {
    return await NovelRepository.update(id, newNovel);
  }

  async delete(id: string): Promise<INovel | null> {
    return await NovelRepository.delete(id);
  }
}

export default new NovelService();
