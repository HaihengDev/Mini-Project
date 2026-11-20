import Chapter from '../models/chapter.model';
import { IChapter } from '../types/types';

class ChapterRepository {
  async findAll(): Promise<IChapter[]> {
    return await Chapter.find();
  }

  async findById(id: string): Promise<IChapter | null> {
    return await Chapter.findOne({ chapter_id: id });
  }

  async findByNovelId(novelId: string): Promise<IChapter[]> {
    return await Chapter.find({ novel: novelId }).lean<IChapter[]>().exec();
  }

  async create(chapter: IChapter): Promise<IChapter | null> {
    return await Chapter.create(chapter);
  }

  async update(id: string, newChapter: IChapter): Promise<IChapter | null> {
    return await Chapter.findOneAndUpdate({ chpater_id: id }, newChapter, {
      new: true,
    });
  }

  async delete(id: string): Promise<IChapter | null> {
    return await Chapter.findOneAndDelete({ chapter_id: id });
  }
}

export default new ChapterRepository();
