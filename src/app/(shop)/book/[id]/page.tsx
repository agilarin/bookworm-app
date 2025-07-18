import { Suspense } from "react";
import { notFound } from "next/navigation";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { GenerateMetadataProps } from "@/types";
import { getBookById } from "@/lib/server/books";
import { OptimizedImage } from "@/components/OptimizedImage";
import { MediaQuery } from "@/components/MediaQuery";
import { ShopContainer } from "@/components/UI/ShopContainer";

import { BookAbout } from "./_components/BookAbout";
import { BookCartActions } from "./_components/BookCartActions";
import { BookTabs } from "./_components/BookTabs";
import { BookCartActionsMobile } from "./_components/BookCartActionsMobile";
import { BookInfoTab } from "./_components/BookInfoTab";
import { BookReviewsTab } from "./_components/BookReviewsTab";
import * as S from "./Book.styles";

type BookParams = Promise<{ id: string }>;

interface BookProps {
  params: BookParams;
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps<BookParams>) {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) {
    notFound();
  }

  const authorsNames = book?.authors.map((item) => item.name).join(" ,");

  const title = [
    book?.title,
    authorsNames && `(${authorsNames})`,
    "- BookWorm",
  ].join(" ");

  return { title: title };
}

export default async function Book({ params }: BookProps) {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) {
    notFound();
  }

  return (
    <ShopContainer>
      <Grid
        container
        gap={{ xs: 2, md: 3 }}
        my={3}
      >
        <Grid
          size={{ xs: 12, md: "auto" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <OptimizedImage
            images={book.images}
            covers={[200, 330]}
            defaultCover={200}
            alt={book.title}
            imgComponent={(props) => <S.ImagePreview {...props} />}
          />
        </Grid>

        <Grid
          display="flex"
          flexDirection="column"
          size={{ xs: 12, md: "grow" }}
          gap={2}
        >
          <BookAbout book={book} />
          <MediaQuery minWidth="md">
            <Paper elevation={0}>
              <BookCartActions
                bookId={book.id}
                price={book.price}
              />
            </Paper>
          </MediaQuery>
          <Paper elevation={0}>
            <BookTabs
              book={book}
              tabList={[
                {
                  value: "info",
                  label: "О книге",
                  item: <BookInfoTab book={book} />,
                },
                {
                  value: "reviews",
                  label: "Отзывы",
                  item: (
                    <Suspense fallback={"loading"}>
                      <BookReviewsTab bookId={book.id} />
                    </Suspense>
                  ),
                },
              ]}
            />
          </Paper>
          <BookCartActionsMobile bookId={book.id} />
        </Grid>
      </Grid>
    </ShopContainer>
  );
}
