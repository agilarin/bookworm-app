"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import Stack from "@mui/material/Stack";

import { BookReviewType } from "@/types";
import { BookReviewForm } from "../BookReviewForm";
import { getBookReviews, CursorType } from "@/lib/client/bookRewiews";
import { ReviewList } from "../ReviewList";

const items: BookReviewType[] = [
  {
    id: "asd",
    userId: "Sterbern",
    username: "Sterbern",
    text:
      "Так, я отвечу на несколько вопросов:\n" +
      "1. Это яой? Это Сёнэн-ай?" +
      "Нет, это не ЯОЙ и не Сёнэн-ай как считают некоторые." +
      "Я не знаю почему некоторые считают, что это произведение яой, но есть предположение (моё предположение), что это кажется из-за рисовки, или же, люди видя парней в окружение гг, считают это произведение яоем. Ну камон, в реальности это разве так работает? Нет же)" +
      "2. Почему манхва называется Элисед?" +
      "Во первых, про сам перевод названия, мы знаем что более правильно будет Элесид а не Элисед, но нам не понравилось как он звучит." +
      'Во вторых, что оно означает.Elecced - сокращено со слов "Electrical" и "Speed"(способности Кайдена и Джи У).Это я так считаю, просто других вариантов не вижу)' +
      "3. Когда глава?" +
      "Новая глава выходит на Naver-е каждый вторник, сам перевод же выходит позже. Мы тоже люди, и не всегда получается сделать по быстрее как хотелось бы. У переводчиков тоже есть своя личная жизнь, поэтому задержки неизбежный фактор, так что надеюсь на ваше терпение и вы продолжите читать Элисед в нашем переводе." +
      "!ПЕРЕВОД ИДЁТ НОГА В НОГУ С ОРИГИНАЛОМ!4. Это оригинальный проект, здесь нету первоисточника." +
      "ОБЛОЖКУ ОБНОВИМ ТОГДА, КАК ТОЛЬКО ХУДОЖНИК НАРИСУЕТ НОВУЮ!",
    createdAt: new Date(Date.now()),
    rating: 1,
  },
  {
    id: "zczcwer2eq",
    userId: "asdsad",
    username: "asdsad",
    text: "Не понимаю людей, которые ругаются, я вот бесплатно прочитал эту главу, но потратил всего 1 минуту, смысл писать гневный комментарий, если можно сделать, как я",
    createdAt: new Date(Date.now()),
    rating: 3,
  },
  {
    id: "asasd212312d",
    userId: "asdsad",
    username: "asdsad",
    text: "Уведомление пришло, Удивился зашёл, увидел реальность вышел, зашёл комментарии, и понимаю чём дело, и теперь думай радоваться или грустит",
    createdAt: new Date(Date.now()),
    rating: 5,
  },
  {
    id: "xasdx123123",
    userId: "asdsad",
    username: "asdsad",
    text: "Можно отключить уведы на платные главы и тогда они будут приходить только тогда, когда выйдут из раннего доступа",
    createdAt: new Date(Date.now()),
    rating: 4,
  },
];

interface BookReviewsTabProps {
  bookId: string;
}

export function BookReviewsTab({ bookId }: BookReviewsTabProps) {
  const queryClient = useQueryClient();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["bookReviews", bookId],
    queryFn: ({ pageParam }) => getBookReviews({ bookId, cursor: pageParam }),
    initialPageParam: null as CursorType,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
  });

  const reviews = data?.pages.flatMap((page) => page.reviews) ?? [];

  const onSuccess = (newReview: BookReviewType) => {
    queryClient.setQueryData(["bookReviews", bookId], (old: any) => {
      if (!old) return old;

      const updatedFirstPage = {
        ...old.pages[0],
        reviews: [newReview, ...old.pages[0].reviews],
      };

      return {
        ...old,
        pages: [updatedFirstPage, ...old.pages.slice(1)],
      };
    });
  };

  return (
    <Stack>
      <Stack padding={2}>
        <BookReviewForm
          bookId={bookId}
          onSuccess={onSuccess}
        />
      </Stack>
      <ReviewList
        isLoading={isLoading}
        reviews={reviews}
      />
    </Stack>
  );
}
