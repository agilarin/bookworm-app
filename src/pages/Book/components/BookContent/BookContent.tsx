import { useState } from "react";
import {
  Box,
  Button,
  Fab,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { BookType } from "@/types";
import { AboutBook } from "@/pages/Book/components/AboutBook";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { addItemToCart } from "@/redux/cartSlice.ts";
import { RatingInfo } from "../RatingInfo";
import * as S from "./BookContent.styles.ts";

interface ContentProps {
  book: BookType;
}

export function BookContent({ book }: ContentProps) {
  const [tabValue, setTabValue] = useState("about");
  const isUpMD = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (book) {
      dispatch(addItemToCart(book.id));
    }
  };

  return (
    <Stack gap={{ md: 2 }}>
      {isUpMD && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              color="textSecondary"
              component="h2"
            >
              {book?.authors.map((author) => author.name).join(", ")}
            </Typography>
            <Typography
              component="h1"
              variant="h4"
              fontWeight={500}
            >
              {book?.title}
            </Typography>
          </Box>
          <RatingInfo
            value={book.ratingValue}
            count={book.ratingCount}
          />
        </Stack>
      )}

      {isUpMD && (
        <Paper elevation={0}>
          <Stack
            paddingX={2}
            paddingY={1.5}
            direction={{ md: "row" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              component="div"
              variant="h4"
              fontWeight={500}
            >
              {book?.price} ₽
            </Typography>
            <Button
              size="large"
              variant="contained"
              disableElevation
              sx={{ minWidth: "240px" }}
              onClick={handleClick}
            >
              Добавить в карзину
            </Button>
          </Stack>
        </Paper>
      )}

      <Paper elevation={0}>
        <S.TabList
          value={tabValue}
          onChange={(_, value) => setTabValue(value)}
          textColor="inherit"
          indicatorColor="primary"
        >
          <S.TabItem
            value="about"
            label="О книге"
          />
        </S.TabList>

        <AboutBook book={book} />
      </Paper>

      {!isUpMD && (
        <Fab
          variant="extended"
          color="primary"
          sx={{
            position: "fixed",
            bottom: 64,
            left: 8,
            right: 8,
          }}
          onClick={handleClick}
        >
          Добавить в карзину
        </Fab>
      )}
    </Stack>
  );
}
