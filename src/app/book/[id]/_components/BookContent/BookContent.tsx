"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BookType } from "@/types";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addItemToCart } from "@/redux/cartSlice";
import { MediaQuery } from "@/components/MediaQuery";
import { RatingInfo } from "../RatingInfo";
import { AboutBook } from "../AboutBook";
import * as S from "./BookContent.styles";

interface ContentProps {
  book: BookType;
}

export function BookContent({ book }: ContentProps) {
  const [tabValue, setTabValue] = useState("about");
  const dispatch = useAppDispatch();
  const aurhors = book?.authors.map((author) => author.name).join(", ");

  const handleClick = () => {
    if (book) {
      dispatch(addItemToCart(book.id));
    }
  };

  return (
    <Stack gap={{ md: 2 }}>
      <MediaQuery minWidth="md">
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
              {aurhors}
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
      </MediaQuery>

      <MediaQuery minWidth="md">
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
      </MediaQuery>

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

      <MediaQuery maxWidth="md">
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
      </MediaQuery>
    </Stack>
  );
}
