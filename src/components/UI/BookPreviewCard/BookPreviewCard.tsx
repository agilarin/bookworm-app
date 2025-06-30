"use client";

import { ImagePicture } from "@/components/ImagePicture";
import { BookType } from "@/types";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";

interface BookPreviewCardProps {
  book: BookType;
}

export function BookPreviewCard({ book }: BookPreviewCardProps) {
  const isUpSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const authors = book.authors.map(({ name }) => name).join(", ");

  return (
    <Card elevation={0}>
      <Stack
        direction={{ sm: "row" }}
        alignItems="center"
      >
        <Stack
          minWidth={{ xs: "160px", md: "240px" }}
          maxWidth={{ xs: "160px", md: "240px" }}
        >
          <ImagePicture
            images={book.images}
            covers={["cover_200", "cover_330"]}
            defaultCover="cover_200"
            imageEl={(img) => (
              <CardMedia
                component="img"
                image={img}
                alt={book.title}
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
          alignItems={{ xs: "center", sm: "flex-start" }}
          paddingY={{ xs: 2, sm: 2, md: 2 }}
          paddingX={{ xs: 1, sm: 2, md: 4 }}
        >
          {!isUpSM && authors && (
            <Typography
              component="div"
              textAlign={{ xs: "center", sm: "start" }}
              color="textSecondary"
            >
              {authors}
            </Typography>
          )}
          <Typography
            component="div"
            marginBottom={{ sm: 1.5 }}
            marginTop={{ xs: 1.5, sm: 0 }}
            fontSize={{ xs: 24, md: 36 }}
            lineHeight={1.2}
            fontWeight={500}
            textAlign={{ xs: "center", sm: "start" }}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {book.title}
          </Typography>
          {isUpSM && authors && (
            <Typography
              component="div"
              textAlign={{ xs: "center", sm: "start" }}
              color="textSecondary"
            >
              {authors}
            </Typography>
          )}
          <Typography
            marginTop={2}
            textAlign={{ xs: "center", sm: "start" }}
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
              variant="contained"
              disableElevation
            >
              Подробнее
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
