import { BookReviewType } from "@/types";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";

import { formatReviewDate } from "@/utils/formatDate";

interface ReviewItemProps {
  review: BookReviewType;
}
export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <Stack
      paddingY={1.5}
      paddingX={2}
      sx={{
        borderTop: "1px solid",
        borderTopColor: "divider",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={1}
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
        >
          <Typography fontWeight={500}>{review.username}</Typography>
          <Typography
            color="textSecondary"
            fontSize={14}
          >
            {formatReviewDate(review.createdAt)}
          </Typography>
        </Stack>

        <Rating
          name="review-rating-read"
          defaultValue={review.rating}
          size="small"
          readOnly
          emptyIcon={
            <StarIcon
              style={{ color: "text.secondary" }}
              fontSize="inherit"
            />
          }
        />
      </Stack>

      <Typography
        whiteSpace="pre-line"
        dangerouslySetInnerHTML={{ __html: review.text }}
      />
    </Stack>
  );
}
