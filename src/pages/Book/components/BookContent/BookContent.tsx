import {useState} from "react";
import {Box, Paper, Typography} from "@mui/material";
import {AboutBook} from "@/pages/Book/components/AboutBook";
import * as S from "./Content.styles.ts";


interface ContentProps {
  book: any
}

export function Content({ book }: ContentProps) {
  const [tabValue, setTabValue] = useState("about");

  return (
    <>
      <Box>
        <Typography color="textSecondary" component="h2">
          {book?.authorsName.join(", ")}
        </Typography>
        <Typography component="h1" variant="h4" fontWeight={500} >
          {book?.name}
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ mt: 2 }}>
        <S.TabList
          value={tabValue}
          onChange={(_ ,value) => setTabValue(value)}
          textColor="inherit"
          indicatorColor="primary"
        >
          <S.TabItem value="about" label="О книге" />
        </S.TabList>

        <AboutBook book={book}/>
      </Paper>
    </>
  );
}