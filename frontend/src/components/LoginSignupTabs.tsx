import { Box, Tab, Tabs, styled, Theme, useTheme, Button } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";
import { baseGlow } from "../theme";
import CustomTextField from "./CustomTextField";

const StyledLoginSignup = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.darkGrey.main,
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

const StyledTabContent = styled(Box)({
  padding: "3.5em",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: "2em",
});

const StyledButton = styled(Button)({
  fontWeight: "bold",
});

type TabsTypes = "login" | "signup";

type LoginSignupTabsProps = {
  initialTab?: TabsTypes;
};

const LoginSignupTabs = ({ initialTab = "login" }: LoginSignupTabsProps) => {
  const [currentTabValue, setCurrentTabValue] = useState<TabsTypes>(initialTab);
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
  return (
    <>
      <CustomTextField label="Email" />
      <CustomTextField label="Password" type="password" />
      <StyledButton variant="contained" color="lightPeach" fullWidth={false}>
        LOG IN
      </StyledButton>
    </>
  );
};

const SignupTab = () => {
  return <>Sign up tab</>;
};
