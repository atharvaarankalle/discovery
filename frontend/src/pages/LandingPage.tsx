import {styled} from "@mui/material";
import starsBackground from '../assets/stars_background.jpg';

const LandingPage = () => {
  return (
    <LandingPageBackground>
      <StarsBackground>
        Landing Page
      </StarsBackground>
    </LandingPageBackground>);
};

const LandingPageBackground = styled('div')({
  background: 'linear-gradient(116.82deg, #272747 0%, #7E4DCD 100%)',
  backgroundColor: '#272747',
  height: '100vh',
  width: '100%',
});

const StarsBackground = styled('div')({
  backgroundImage: `url(${starsBackground})`,
  mixBlendMode: "color-dodge",
  height: '100vh',
  width: '100%',
  backgroundSize: "cover",
});

export default LandingPage;
