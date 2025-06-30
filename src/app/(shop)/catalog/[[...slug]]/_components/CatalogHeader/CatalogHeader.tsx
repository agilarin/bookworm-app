import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MediaQuery } from "@/components/MediaQuery";
import { SortMenu } from "../SortMenu";
import { FilterMobile, FilterMobileProps } from "../FilterMobile";

interface CatalogHeaderProps extends FilterMobileProps {
  title: string;
}

export function CatalogHeader({
  title,
  genresList,
  slug,
  ageRatings,
  publishers,
}: CatalogHeaderProps) {
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
        <MediaQuery maxWidth="md">
          <FilterMobile
            publishers={publishers}
            ageRatings={ageRatings}
            genresList={genresList}
            slug={slug}
          />
        </MediaQuery>
      </Stack>
    </Stack>
  );
}
