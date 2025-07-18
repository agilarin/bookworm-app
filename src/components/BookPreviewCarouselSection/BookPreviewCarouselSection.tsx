"use client";

import useEmblaCarousel from "embla-carousel-react";
import { BookType } from "@/types";
import Stack from "@mui/material/Stack";
import { BookPreviewCard } from "../UI/BookPreviewCard";
import {
  CarouselPrevNextButton,
  useCarouselPrevNextButtons,
} from "../UI/CarouselPrevNextButton";
import { useMediaQuery } from "@mui/material";

interface BookPreviewCarouselSectionProps {
  items: BookType[];
}

export function BookPreviewCarouselSection({
  items,
}: BookPreviewCarouselSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = useCarouselPrevNextButtons(emblaApi);
  const isUpMD = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Stack position="relative">
      <Stack
        overflow="hidden"
        ref={emblaRef}
      >
        <Stack
          direction="row"
          gap={2}
        >
          {items.map((item) => (
            <Stack
              key={item.id}
              flex="0 0 100%"
            >
              <BookPreviewCard book={item} />
            </Stack>
          ))}
        </Stack>
      </Stack>

      <CarouselPrevNextButton
        variant="left"
        left={isUpMD ? "-14px" : "4px"}
        disabled={prevBtnDisabled}
        onClick={onPrevButtonClick}
      />
      <CarouselPrevNextButton
        variant="right"
        right={isUpMD ? "-14px" : "4px"}
        disabled={nextBtnDisabled}
        onClick={onNextButtonClick}
      />
    </Stack>
  );
}
