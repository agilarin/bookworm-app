"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { BookType } from "@/types";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { BasicCard } from "../UI/BasicCard";
import { SliderButton, useSliderButtons } from "../UI/SliderButton";

interface SliderSectionProps {
  title?: string;
  href?: string;
  items: BookType[];
}

export function SliderSection({ title, href, items }: SliderSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = useSliderButtons(emblaApi);

  return (
    <Stack>
      <Stack
        direction="row"
        paddingTop={1.5}
        paddingX={2}
      >
        <Link href={{ pathname: href }}>
          <Typography
            component="div"
            display="flex"
            alignItems="center"
            gap={1}
            color="textPrimary"
            fontSize={20}
            fontWeight={500}
          >
            {title}
            <ArrowForwardRoundedIcon color="inherit" />
          </Typography>
        </Link>
      </Stack>

      <Stack position="relative">
        <Stack
          overflow="hidden"
          ref={emblaRef}
          paddingTop={1.5}
          paddingBottom={1.5}
          paddingX={2}
        >
          <Stack
            direction="row"
            gap={2}
          >
            {items.map((item) => (
              <Stack
                key={item.id}
                flex="0 0 auto"
              >
                <BasicCard book={item} />
              </Stack>
            ))}
          </Stack>
        </Stack>
        <SliderButton
          variant="left"
          left="-16px"
          disabled={prevBtnDisabled}
          onClick={onPrevButtonClick}
        />
        <SliderButton
          variant="right"
          right="-16px"
          disabled={nextBtnDisabled}
          onClick={onNextButtonClick}
        />
      </Stack>
    </Stack>
  );
}
