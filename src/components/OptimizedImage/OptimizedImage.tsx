import { useMemo } from "react";
import { BookImagesType, CoverSize } from "@/types";

interface ImgComponentProps {
  src: string;
  alt: string;
}

interface OptimizedImageProps {
  images: BookImagesType;
  defaultCover: CoverSize;
  imgComponent: (props: ImgComponentProps) => React.ReactNode;
  breakpoints?: [string, string];
  covers: [CoverSize, CoverSize];
  alt: string;
}

export function OptimizedImage({
  images,
  defaultCover,
  imgComponent,
  breakpoints = ["(max-width: 699px)", "(min-width: 700px)"],
  covers,
  alt,
}: OptimizedImageProps) {
  const sources = useMemo(() => {
    return covers.flatMap((width, i) => {
      const image = images[width];
      const breakpoint = breakpoints[i];

      if (!image || !breakpoint) return [];

      const mediaQueries = [
        { media: breakpoint, type: "image/webp", src: image.webp },
        { media: breakpoint, type: "image/jpeg", src: image.jpeg },
      ];

      return mediaQueries
        .filter(({ src }) => src)
        .map(({ media, type, src }) => (
          <source
            key={`${width}-${media}-${type}`}
            media={media}
            srcSet={src}
            type={type}
          />
        ));
    });
  }, [images, breakpoints, covers]);

  const fallback = images[defaultCover]?.jpeg || "";

  return (
    <picture>
      {sources}
      {imgComponent({ src: fallback, alt })}
    </picture>
  );
}
