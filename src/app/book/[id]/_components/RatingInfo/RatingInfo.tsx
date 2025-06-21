import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";

interface RatingInfoProps {
  value: number | undefined;
  count: number | undefined;
}

export function RatingInfo({ value, count }: RatingInfoProps) {
  return (
    <Stack
      direction={{ xs: "row", md: "column" }}
      alignItems={{ xs: "center", md: "flex-end" }}
      gap={{ xs: 1, md: 0.25 }}
    >
      <Stack
        direction="row"
        alignItems="center"
      >
        <StarIcon
          color="warning"
          fontSize="small"
        />
        <Typography
          fontWeight={500}
          fontSize={24}
          lineHeight={1}
          ml={0.5}
        >
          {value}
        </Typography>
      </Stack>
      <Typography
        fontSize={12}
        color="textSecondary"
        fontWeight={500}
      >
        {count} оценок
      </Typography>
    </Stack>
  );
}
