import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { BookType } from "@/types";
import { OptimizedImage } from "@/components/OptimizedImage";

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
        <OptimizedImage
          images={book.images}
          alt={book.title}
          covers={[200, 330]}
          defaultCover={200}
          imgComponent={(props) => (
            <CardMedia
              component="img"
              {...props}
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
