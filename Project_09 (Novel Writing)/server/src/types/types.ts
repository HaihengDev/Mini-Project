export interface INovel {
  novel_id: string;
  title: string;
}

export interface IChapter {
  chapter_id: string;
  title: string;
  novel: string;
}
