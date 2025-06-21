"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { Collapse, Typography, Link } from "@mui/material";

interface ExpandableTextProps {
  text: string;
}

export function ExpandableText({ text }: ExpandableTextProps) {
  const [open, setOpen] = useState(false);
  const [isExpandable, setIsExpandable] = useState(true);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!paragraphRef.current) {
      return;
    }
    const rect = paragraphRef.current.getBoundingClientRect();
    setIsExpandable(rect.height > 144);
  }, [paragraphRef]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Collapse
        in={open}
        collapsedSize={144}
      >
        <Typography
          ref={paragraphRef}
          component="p"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Collapse>

      {isExpandable && (
        <Link
          component="button"
          underline="none"
          fontSize="14px"
          onClick={handleClick}
        >
          {open ? "Свернуть" : "Подробнее..."}
        </Link>
      )}
    </>
  );
}
