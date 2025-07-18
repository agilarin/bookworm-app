export const BOOKS_TAG = "books";

export const getBooksTagByGenreId = (id: string) => `books-${id}`;

export const BOOK_ITEM_TAG = "bookItem";

export const getBookTagById = (id: string) => `book-${id}`;

export const BOOKS_FILTER_TAG = "booksFilter";

export const getBooksFilterTagByName = (name: string) => `bookFilter-${name}`;
export const getBooksFilterTagByGenreId = (id: string) => `bookFilter-${id}`;

export const BOOK_REVIEWS_TAG = "bookReviews";

export const getBookReviewsTagByBookId = (id: string) => `bookReviews-${id}`;
