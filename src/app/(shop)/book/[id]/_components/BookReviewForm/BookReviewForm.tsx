"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v4";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import { addBookReview } from "@/lib/actions/bookReviews";
import { BookReviewType } from "@/types";
import { useAuth } from "@/hooks/useAuth";

const bookReviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, "Минималтная оценка 1")
    .max(5, "Максимвльная оценка 5"),
  text: z.string().min(5, "Отзыв слишком короткий"),
});

type BookReviewFormFields = z.infer<typeof bookReviewSchema>;

interface BookReviewFormProps {
  bookId: string;
  onSuccess?: (review: BookReviewType) => void;
}

export function BookReviewForm({ bookId, onSuccess }: BookReviewFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookReviewFormFields>({
    resolver: zodResolver(bookReviewSchema),
    defaultValues: {
      rating: 0,
      text: "",
    },
  });
  const { user } = useAuth();

  const isDisabled = !user || isSubmitting;

  const onSubmit = async (data: BookReviewFormFields) => {
    if (!user) {
      return;
    }
    const newReview = {
      bookId,
      userId: user.uid,
      username: user.username,
      ...data,
    };
    // await new Promise((r) => setTimeout(() => r("asd"), 2000)).then(() => {
    //   reset();
    //   if (onSuccess) {
    //     onSuccess({
    //       id: "asdasdsad",
    //       ...newReview,
    //       createdAt: new Date(Date.now()),
    //     });
    //   }
    // });
    await addBookReview({
      bookId,
      userId: user.uid,
      username: user.username,
      ...data,
    }).then(() => {
      reset();
      if (onSuccess) {
        onSuccess({
          id: "asdasdsad",
          ...newReview,
          createdAt: new Date(Date.now()),
        });
      }
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      width="100%"
      gap={1.5}
    >
      <Controller
        name="text"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            rows={4}
            error={!!errors.text}
            helperText={errors.text?.message}
            fullWidth
            placeholder="Написать отзыв..."
            disabled={isDisabled}
          />
        )}
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <Box
              display="flex"
              flexDirection="column"
            >
              <Rating
                {...field}
                value={field.value || 0}
                onChange={(_, value) => field.onChange(value)}
                disabled={isDisabled}
              />
              {errors.rating && (
                <Typography
                  color="error"
                  variant="caption"
                >
                  {errors.rating.message}
                </Typography>
              )}
            </Box>
          )}
        />
        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={isDisabled}
        >
          Сохранить
        </Button>
      </Box>
    </Box>
  );
}
