import { styled } from "@mui/material/styles";
import {Tab, Tabs, tabsClasses } from "@mui/material";


export const TabList = styled(Tabs)`
  padding: 0 ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  min-height: 42px;
  & .${tabsClasses.indicator} {
    height: 3px;
    border-radius: 3px 3px 0 0;
  }
  & .${tabsClasses.list} {
    gap: ${({ theme }) => theme.spacing(2)};
  }
`

export const TabItem = styled(Tab)`
  padding-left: 0;
  padding-right: 0;
  min-height: 42px;
  min-width: 0;
  font-weight: 400;
  text-transform: none;
`