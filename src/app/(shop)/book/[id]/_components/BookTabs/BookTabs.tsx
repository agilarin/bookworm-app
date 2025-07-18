"use client";

import { Suspense, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { BookInfo } from "../BookInfoTab";
// import { BookReviews } from "../BookReviews";
import { BookType } from "@/types";
import dynamic from "next/dynamic";

const tabs = [
  {
    value: "info",
    label: "О книге",
  },
  {
    value: "reviews",
    label: "Отзывы",
  },
];

// const { BookInfo } = dynamic(() => import("../BookInfo/BookInfo"));
const BookReviews = dynamic(() =>
  import("../BookReviewsTab").then((mod) => mod.BookReviews)
);
// const ComponentC = dynamic(() => import('../components/C'), { ssr: false })

type TabListItem = {
  value: string;
  label: string;
  item: React.ReactNode;
};

interface BookTabsProps {
  tabList: TabListItem[];
  book: BookType;
}

export function BookTabs({ tabList, book }: BookTabsProps) {
  const [tabValue, setTabValue] = useState(tabList[0].value);

  return (
    <>
      <Tabs
        value={tabValue}
        onChange={(_, value) => setTabValue(value)}
        textColor="inherit"
        indicatorColor="primary"
        slotProps={{
          indicator: {
            sx: {
              height: "3px",
              borderRadius: "3px 3px 0 0",
            },
          },
          list: { sx: { gap: 2 } },
        }}
        sx={{
          paddingX: 2,
          minHeight: "42px",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {tabList.map(({ value, label }) => (
          <Tab
            key={value}
            disableRipple
            value={value}
            label={label}
            sx={{
              paddingLeft: 0,
              paddingRight: 0,
              minHeight: "42px",
              minWidth: 0,
              fontweight: 400,
              textTransform: "none",
            }}
          />
        ))}
      </Tabs>
      {/* {tabValue === "info" ? (
        <BookInfo book={book} />
      ) : (
        <Suspense fallback={"Loading"}>
          <BookReviews bookId={book.id} />
        </Suspense>
      )} */}
      {/* <Suspense fallback={"Loading"}> */}
      {tabList.find(({ value }) => value === tabValue)?.item}
      {/* </Suspense> */}
    </>
  );
}
