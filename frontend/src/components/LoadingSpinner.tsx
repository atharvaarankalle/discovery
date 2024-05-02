import { CircularProgress, Box } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { DiscoveryLogo } from "./Logos";

/* 
Styling the MUI Circular Progress to have a gradient.
(Modified from MUI Documentation: https://mui.com/material-ui/react-progress/#customization)
*/
const getStyledSpinner = (theme: Theme, size: number) => (
  <>
    <svg width={0} height={0}>
      <defs>
        <linearGradient id="theme_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={theme.palette.peach.main} />
          <stop offset="33%" stopColor={theme.palette.pink.main} />
          <stop offset="66%" stopColor={theme.palette.purplePink.main} />
          <stop offset="99%" stopColor={theme.palette.purple.main} />
        </linearGradient>
      </defs>
    </svg>
    <CircularProgress
      sx={{
        circle: { stroke: "url(#theme_gradient)" },
      }}
      size={size}
      thickness={3}
    />
  </>
);

/**
 * LoadingSpinner Component
 *
 * Renders a loading spinner with the Discovery logo and theme colours.
 * It is a fixed size, and cannot be changed.
 *
 **/
const LoadingSpinner = () => {
  const theme: Theme = useTheme();
  const size: number = 125;

  return (
    <Box sx={{ m: 1, position: "relative" }} width={size}>
      <DiscoveryLogo
        width={String(80)}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1,
          userSelect: "none",
        }}
        draggable="false"
      />
      {getStyledSpinner(theme, size)}
    </Box>
  );
};

export default LoadingSpinner;
