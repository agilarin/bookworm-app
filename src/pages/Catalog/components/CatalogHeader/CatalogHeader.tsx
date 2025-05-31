import { Stack, Typography, useMediaQuery } from "@mui/material";
import { SortMenu } from "@/pages/Catalog/components/SortMenu";
import { FilterMobile } from "../FilterMobile";

interface CatalogHeaderProps {
  title: string;
}

export function CatalogHeader({ title }: CatalogHeaderProps) {
  const isDownMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Stack
      direction={{ md: "row" }}
      justifyContent={{ md: "space-between" }}
      alignItems={{ md: "center" }}
      pt={{ xs: 3, md: 1.5 }}
      pb={1}
      px={{ md: 2 }}
      gap={1.5}
    >
      <Typography
        variant="h6"
        fontSize={{ xs: 18, md: 20 }}
        component="h1"
        lineHeight={1.4}
      >
        {title}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
      >
        <SortMenu />
        {isDownMd && <FilterMobile />}
      </Stack>
    </Stack>
  );
}
