import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { generatePath, Link } from "react-router";
import { ROUTES_PATHS } from "@/constants";
import { BookType } from "@/types";
import { ImagePicture } from "../ImagePicture";

interface BasicCardProps {
  book: BookType;
}

export function BasicCard({ book }: BasicCardProps) {
  return (
    <Card
      elevation={0}
      sx={{ maxWidth: 180 }}
    >
      <Link to={generatePath(ROUTES_PATHS.BOOK, { bookId: book.id })}>
        <ImagePicture
          images={book.images}
          covers={["cover_200", "cover_330"]}
          defaultCover="cover_200"
          imageEl={(img) => (
            <CardMedia
              component="img"
              image={img}
              alt={book.title}
              sx={{ borderRadius: 1 }}
              // sx={{ borderRadius: 1, height: "270px" }}
            />
          )}
        />
        <CardContent sx={{ p: 0, pt: 1 }}>
          <Typography
            color="textPrimary"
            variant="body2"
            component="p"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {book.title}
          </Typography>

          <Typography
            color="textSecondary"
            variant="body2"
            component="p"
            sx={{
              fontSize: "13px",
              mt: "2px",
            }}
            noWrap
          >
            {book.authors.map((author) => author.name).join(", ")}
          </Typography>
        </CardContent>
        <div></div>
      </Link>
    </Card>
  );
}
