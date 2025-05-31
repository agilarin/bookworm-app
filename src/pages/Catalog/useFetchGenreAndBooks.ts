import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { useGetGenreByIdQuery } from "@/redux/services/genresApi";
import { useGetBooksMutation } from "@/redux/services/bookApi";
import { BooksSortFieldValues } from "@/types";

export function useFetchGenreAndBooks() {
  const [page, setPage] = useState(1);
  const { genreSlug } = useParams();
  const [searchParams] = useSearchParams();
  const { data: genre, isSuccess: genreIsSuccess } = useGetGenreByIdQuery(
    genreSlug as string,
    { skip: !genreSlug }
  );
  const [getBooks, books] = useGetBooksMutation();

  const genresId = useMemo(
    () => genre?.genresId || (genre?.id && [genre?.id]) || undefined,
    [genre]
  );

  const sort = useMemo(
    () => (searchParams.get("sort") || "popularDesc") as BooksSortFieldValues,
    [searchParams]
  );

  useEffect(() => {
    if (!genreSlug || genreIsSuccess) {
      getBooks({ genresId, sort });
    }
  }, [getBooks, genreIsSuccess, genresId, genreSlug, sort]);

  const nextPage = () => {
    if (books.data && Math.floor(books.data?.count / 30) > page) {
      setPage(page + 1);

      if (!genreSlug || genreIsSuccess) {
        getBooks({
          genresId,
          sort,
          nextPage: books.data.docs[books.data.docs.length - 1],
        });
      }
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      if (!genreSlug || genreIsSuccess) {
        getBooks({
          genresId,
          sort,
          prevPage: books.data?.docs[0],
        });
      }
    }
  };

  return {
    genre,
    books: books.data?.books,
    isLoading: books.isLoading,
    nextPage,
    prevPage,
    currentPage: page,
    pages: books.data && Math.floor(books.data?.count / 30) || 0
  };
}
