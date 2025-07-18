"use client";

import Link from "next/link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";

import { OptimizedImage } from "@/components/OptimizedImage";
import { BookType } from "@/types";

interface BookPreviewCardProps {
  book: BookType;
}

export function BookPreviewCard({ book }: BookPreviewCardProps) {
  const isUpMD = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const authors = book.authors.map(({ name }) => name).join(", ");

  return (
    <Card elevation={0}>
      <Stack
        direction={{ md: "row" }}
        alignItems="center"
      >
        <Stack
          minWidth={{ xs: "160px", md: "240px" }}
          maxWidth={{ xs: "160px", md: "240px" }}
        >
          <OptimizedImage
            images={book.images}
            covers={[200, 330]}
            defaultCover={200}
            alt={book.title}
            imgComponent={(props) => (
              <CardMedia
                component="img"
                {...props}
                sx={{
                  width: "260px",
                  borderRadius: 1,
                  aspectRatio: "2 / 3",
                  bgcolor: "grey.300",
                }}
              />
            )}
          />
        </Stack>
        <Stack
          alignItems={{ xs: "center", md: "flex-start" }}
          paddingY={{ xs: 2, sm: 2, md: 2 }}
          paddingX={{ xs: 1, sm: 2, md: 4 }}
        >
          {!isUpMD && authors && (
            <Typography
              component="div"
              textAlign={{ xs: "center", md: "start" }}
              color="textSecondary"
            >
              {authors}
            </Typography>
          )}
          <Typography
            component="div"
            marginBottom={{ md: 1.5 }}
            marginTop={{ xs: 1.5, md: 0 }}
            fontSize={{ xs: 24, md: 36 }}
            lineHeight={1.2}
            fontWeight={500}
            textAlign={{ xs: "center", md: "start" }}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {book.title}
          </Typography>
          {isUpMD && authors && (
            <Typography
              component="div"
              textAlign={{ xs: "center", md: "start" }}
              color="textSecondary"
            >
              {authors}
            </Typography>
          )}
          <Typography
            marginTop={2}
            textAlign={{ xs: "center", md: "start" }}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            {book.description}
          </Typography>

          <Stack
            direction="row"
            marginTop={3}
          >
            <Button
              component={Link}
              variant="contained"
              disableElevation
              href={`/book/${book.id}`}
            >
              Подробнее
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
