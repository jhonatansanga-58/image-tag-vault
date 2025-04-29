export interface ImageData {
  image: string;
  tags: string[];
  character_tags: string[];
  ratings: string[];
}

export interface TagInfo {
  name: string;
  count: number;
  type: "tag" | "character" | "rating";
}
