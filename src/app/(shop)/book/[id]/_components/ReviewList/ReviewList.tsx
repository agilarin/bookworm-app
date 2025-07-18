import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { BookReviewType } from "@/types";
import { ReviewItem } from "../ReviewItem";
import { Loader } from "@/components/UI/Loader";

interface ReviewListProps {
  isLoading: boolean;
  reviews: BookReviewType[];
}

export function ReviewList({ isLoading, reviews }: ReviewListProps) {
  if (isLoading) {
    return (
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height={160}
        paddingY={1.5}
        paddingX={2}
        sx={{
          borderTop: "1px solid",
          borderTopColor: "divider",
        }}
      >
        <Loader />
      </Stack>
    );
  }

  if (!reviews.length) {
    return (
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height={120}
        paddingY={1.5}
        paddingX={2}
        sx={{
          borderTop: "1px solid",
          borderTopColor: "divider",
        }}
      >
        <Typography
          component="p"
          color="text.secondary"
        >
          Здесь пока нет отзывов, будь первым.
        </Typography>
      </Stack>
    );
  }

  return (
    <>
      {reviews?.map((item) => (
        <ReviewItem
          key={item.id}
          review={item}
        />
      ))}
    </>
  );
}
