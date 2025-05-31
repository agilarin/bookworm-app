import { BookImageType } from "@/types";
import { ReactNode } from "react";

type ImageCoverType = "cover_415" | "cover_330" | "cover_200" | "cover_100";
function getImgSrc(
  images: BookImageType[],
  cover: ImageCoverType,
  format: "image/webp" | "image/jpeg"
) {
  return images.find((image) => {
    return image.cover === cover && image.format === format;
  })?.src;
}

interface ImagePictureProps {
  images: BookImageType[];
  covers?: [ImageCoverType, ImageCoverType];
  defaultCover: ImageCoverType;
  imageEl: (url: string) => ReactNode;
}

export function ImagePicture({
  images,
  covers,
  defaultCover,
  imageEl,
}: ImagePictureProps) {
  const webp = covers?.map((cover) => getImgSrc(images, cover, "image/webp"));
  const jpeg = covers?.map((cover) => getImgSrc(images, cover, "image/jpeg"));
  const defaultImg = getImgSrc(images, defaultCover, "image/jpeg");

  return (
    <picture>
      {webp?.[0] && (
        <source
          media="(max-width: 699px)"
          srcSet={webp[0]}
          type="image/webp"
        />
      )}
      {webp?.[1] && (
        <source
          media="(min-width: 700px)"
          srcSet={webp[1]}
          type="image/webp"
        />
      )}
      {jpeg?.[0] && (
        <source
          media="(max-width: 699px)"
          srcSet={jpeg[0]}
        />
      )}
      {jpeg?.[1] && (
        <source
          media="(min-width: 700px)"
          srcSet={jpeg[1]}
        />
      )}
      {imageEl(defaultImg || "")}
    </picture>
  );
}
