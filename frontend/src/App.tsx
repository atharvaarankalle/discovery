import { Routes, Route, useLocation } from "react-router-dom";
import AppBase from "./AppBase.tsx";
import DiscoverPage from "./pages/DiscoverPage.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import LoginSignupPage from "./pages/LoginSignupPage.tsx";
import PromptPage from "./pages/PromptPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import UserAppBase from "./pages/UserAppBase.tsx";
import { AppContextProvider } from "./AppContextProvider.tsx";

function App() {
  return (
    <AppContextProvider>
      <Routes>
        {/* the landing and login page are only accessible if not logged in */}
        <Route path="/" element={<AppBase />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginSignupPage activeTab="login" />} />
          <Route
            path="signup"
            element={<LoginSignupPage activeTab="signup" />}
          />

          {/* "user" will likely be replaced by the user ID or similar */}
          {/* the following routes are only accessible if logged in */}
          <Route path="user" element={<UserAppBase />}>
            <Route index element={<ProfilePage />} />
            <Route path="discover" element={<DiscoverPage />} />
            <Route path="prompt" element={<PromptPage />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={<p>The page {useLocation().pathname} cannot be found!</p>}
        />
      </Routes>
    </AppContextProvider>
  );
}

export default App;
