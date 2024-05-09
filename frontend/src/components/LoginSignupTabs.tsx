import { Box, Button, styled, Tab, Tabs, Theme, useTheme } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";
import { baseGlow } from "../theme";
import LoginTab from "./LoginTab";
import SignupTab from "./SignupTab";
import { West } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledLoginSignup = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.darkGrey.main,
  color: theme.palette.lightPeach.main,
  boxShadow: baseGlow,
  width: "45%",
  borderRadius: 15,
  zIndex: 5,
  position: "relative",
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

const StyledButton = styled(Button)({
  position: "absolute",
  top: -65,
  left: 0,
});

export type TabsTypes = "login" | "signup";

type LoginSignupTabsProps = {
  initialTab?: TabsTypes;
};

const LoginSignupTabs = ({ initialTab = "login" }: LoginSignupTabsProps) => {
  const [currentTabValue, setCurrentTabValue] = useState<TabsTypes>(initialTab);
  const theme: Theme = useTheme();
  const navigate = useNavigate();

  const handleTabChange = (event: SyntheticEvent, newValue: TabsTypes) => {
    setCurrentTabValue(newValue);
    navigate(`/${newValue}`);
  };

  return (
    <StyledLoginSignup>
      <StyledButton
        variant="underlined"
        color="pink"
        startIcon={<West />}
        sx={{ paddingLeft: 1, paddingRight: 1 }}
        onClick={() => navigate("/")}
      >
        BACK TO HOME
      </StyledButton>
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
  currentTab === tabValue && <Box>{children}</Box>;
export default LoginSignupTabs;
