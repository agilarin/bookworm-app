"use client";

import useEmblaCarousel from "embla-carousel-react";
import { BookType } from "@/types";
import Stack from "@mui/material/Stack";
import { BookPreviewCard } from "../UI/BookPreviewCard";
import { SliderButton, useSliderButtons } from "../UI/SliderButton";
interface BookPreviewSliderSectionProps {
  items: BookType[];
}

export function BookPreviewSliderSection({
  items,
}: BookPreviewSliderSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = useSliderButtons(emblaApi);

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

      <SliderButton
        variant="left"
        left="-14px"
        disabled={prevBtnDisabled}
        onClick={onPrevButtonClick}
      />
      <SliderButton
        variant="right"
        right="-14px"
        disabled={nextBtnDisabled}
        onClick={onNextButtonClick}
      />
    </Stack>
  );
}
