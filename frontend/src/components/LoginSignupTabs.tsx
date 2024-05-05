import { Box, Tab, Tabs, styled, Theme, useTheme } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";
import { baseGlow } from "../theme";

type TabsTypes = "login" | "signup";

const StyledLoginSignup = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.navyBlue.main,
  color: theme.palette.lightPeach.main,
  boxShadow: baseGlow,
  width: "45%",
  borderRadius: 15,
}));

const StyledTabGroup = styled(Tabs)(({ theme }) => ({
  borderBottom: `solid 0.001px ${theme.palette.pink.main}80`,
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.pink.main,
  padding: "auto 5em",
  "&.Mui-selected": {
    color: theme.palette.lightPeach.main,
  },
}));

const StyledTabContent = styled(Box)(({ theme }) => ({
  padding: "2em",
}));

const LoginSignupTabs = () => {
  const [currentTabValue, setCurrentTabValue] = useState<TabsTypes>("login");
  const theme: Theme = useTheme();

  const handleTabChange = (event: SyntheticEvent, newValue: TabsTypes) => {
    setCurrentTabValue(newValue);
  };

  return (
    <StyledLoginSignup>
      <StyledTabGroup
        value={currentTabValue}
        onChange={handleTabChange}
        TabIndicatorProps={{
          style: { backgroundColor: theme.palette.lightPeach.main },
        }}
        centered
        variant="fullWidth"
      >
        <StyledTab label="LOG IN" value="login" />
        <StyledTab label="SIGN UP" value="signup" />
      </StyledTabGroup>

      <TabContent currentTab={currentTabValue} tabValue="login">
        <LoginTab />
      </TabContent>
      <TabContent currentTab={currentTabValue} tabValue="signup">
        <SignupTab />
      </TabContent>
    </StyledLoginSignup>
  );
};

type TabContentProps = {
  currentTab: TabsTypes;
  tabValue: TabsTypes;
  children: ReactNode;
};
const TabContent = ({ currentTab, tabValue, children }: TabContentProps) =>
  currentTab === tabValue && <StyledTabContent>{children}</StyledTabContent>;
export default LoginSignupTabs;

const LoginTab = () => {
  return <>Login tab</>;
};

const SignupTab = () => {
  return <>Sign up tab</>;
};
