import { Stack, Typography } from "@mui/material";

export type DetailItem = {
  name: string;
  value: string | number | undefined;
};

interface DetailListProps {
  details: DetailItem[];
}

export function DetailList({ details }: DetailListProps) {
  return (
    <Stack gap={1}>
      {details.map(
        ({ name, value }) =>
          !!value && (
            <Stack
              key={name}
              component="p"
              direction="row"
              spacing={0.5}
            >
              <Typography
                variant="body2"
                component="span"
                color="textSecondary"
              >
                {name}
              </Typography>
              <Typography
                variant="body2"
                component="span"
              >
                {value}
              </Typography>
            </Stack>
          )
      )}
    </Stack>
  );
}
