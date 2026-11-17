import Novel from '../models/novel.model';
import { INovel } from '../types/types';

class NovelRepository {
  async findAll(): Promise<INovel[]> {
    return await Novel.find();
  }

  async findById(id: string): Promise<INovel | null> {
    return await Novel.findOne({ novel_id: id });
  }

  async create(novel: INovel): Promise<INovel | null> {
    return await Novel.create(novel);
  }

  async update(id: string, newNovel: INovel): Promise<INovel | null> {
    return await Novel.findOneAndUpdate({ novel_id: id }, newNovel, {
      new: true,
    });
  }

  async delete(id: string) {
    return await Novel.findOneAndDelete({ novel_id: id });
  }
}

export default new NovelRepository();
