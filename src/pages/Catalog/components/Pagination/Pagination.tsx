import { Stack, Button, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

interface PaginationProps {
  page: number;
  count: number;
  onNext: () => void;
  onPrev: () => void;
}

export function Pagination({ page, count, onNext, onPrev }: PaginationProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
    >
      <Button
        onClick={onPrev}
        startIcon={<ArrowBackRoundedIcon />}
        color="inherit"
      >
        Предыдущая
      </Button>
      <Typography fontSize={15}>
        {page} из {count}
      </Typography>
      <Button
        onClick={onNext}
        endIcon={<ArrowForwardRoundedIcon />}
        color="inherit"
      >
        Следующая
      </Button>
    </Stack>
  );
}
