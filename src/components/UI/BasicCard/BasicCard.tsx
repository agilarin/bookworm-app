import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { BookType } from "@/types";
import { ImagePicture } from "../../ImagePicture";

interface BasicCardProps {
  book: BookType;
}

export function BasicCard({ book }: BasicCardProps) {
  const authors = book.authors.map((author) => author.name).join(", ");

  return (
    <Card
      elevation={0}
      sx={{ maxWidth: 180, width: "100%" }}
    >
      <Link href={`/book/${book.id}`}>
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
                borderRadius: 1,
                aspectRatio: "2 / 3",
                bgcolor: "grey.300",
              }}
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
            {authors}
          </Typography>
        </CardContent>
        <div></div>
      </Link>
    </Card>
  );
}
