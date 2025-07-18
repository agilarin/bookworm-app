"use client";

import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { BookType } from "@/types";

type TabListItem = {
  value: string;
  label: string;
  item: React.ReactNode;
};

interface BookTabsProps {
  tabList: TabListItem[];
  book: BookType;
}

export function BookTabs({ tabList }: BookTabsProps) {
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
      {tabList.find(({ value }) => value === tabValue)?.item}
    </>
  );
}
