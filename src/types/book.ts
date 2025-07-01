export type GenreType = {
  name: string;
  id: string;
  genres?: GenreType[];
  genresId?: string[];
};
export type SuperGenreType = {
  name: string;
  id: string;
  genres: GenreType[];
};

export type TagType = {
  name: string;
  id: string;
};

export type PublisherType = {
  name: string;
  id: string;
};

export type AuthorType = {
  name: string;
  id: string;
};
export type BookImageType = {
  src: string;
  cover: string;
  format: string;
};
export type BookType = {
  id: string;
  title: string;
  description: string;
  price: number;
  ratingValue?: number;
  ratingCount?: number;
  pages: number;
  ageRating: string;
  isbn?: string;
  translator?: string;
  publisher?: PublisherType;
  dateTranslate?: number;
  dateCreate?: number;
  images: BookImageType[];
  genres: GenreType[];
  tags: TagType[];
  authors: AuthorType[];
  genresId: string[];
  tagsId: string[];
  authorsId: AuthorType[];
};

export type BooksSortFieldValues =
  | "popularDesc"
  | "ratingDesc"
  | "priceAsc"
  | "priceDesc";
