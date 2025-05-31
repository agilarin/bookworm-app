import { Stack, Modal, CircularProgress } from "@mui/material";
import { BurgerMenuMobileContent } from "./components/BurgerMenuMobileContent";
import { useGetGenresListQuery } from "@/redux/services/genresApi";

interface BurgerMenuMobileProps {
  open: boolean;
  onClose: () => void;
}

export function BurgerMenuMobile({ open, onClose }: BurgerMenuMobileProps) {
  const { data: genresList, isLoading } = useGetGenresListQuery();

  if (isLoading) {
    return (
      <Modal open={open}>
        <Stack
          height="calc(100vh - 56px)"
          bgcolor={(theme) => theme.palette.background.paper}
        >
          <CircularProgress size={52} />
        </Stack>
      </Modal>
    );
  }

  if (!genresList) {
    return (
      <Modal open={open}>
        <Stack
          height="calc(100vh - 56px)"
          bgcolor={(theme) => theme.palette.background.paper}
        ></Stack>
      </Modal>
    );
  }

  return (
    <Modal open={open}>
      <Stack
        height="calc(100vh - 56px)"
        bgcolor={(theme) => theme.palette.background.paper}
      >
        <BurgerMenuMobileContent
          title="Каталог"
          genres={genresList}
          onReturnBack={onClose}
          onClose={onClose}
        />
      </Stack>
    </Modal>
  );
}
