export type BlogPost = {
  id: string;
  title: string;
  date: string;
  language: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
};

export type GalleryItem = {
  title: string;
  tag: string;
  accent: string;
  accent2: string;
  src: string | null;
};