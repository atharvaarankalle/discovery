import { Tooltip, Typography, TypographyProps, styled } from "@mui/material";

interface TruncatableTypographyPropTypes {
  numLines?: number;
}
const TruncatableTypography = styled(Typography)(
  ({ numLines }: TruncatableTypographyPropTypes) => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: numLines,
    WebkitBoxOrient: "vertical",
    width: "100%",
  })
);

interface CustomTypographyPropTypes extends TypographyProps {
  children: React.ReactNode;
  tooltip?: string;
  numLines?: number;
}
const CustomTypography = ({
  children,
  tooltip = undefined,
  numLines = 1,
  ...props
}: CustomTypographyPropTypes) => (
  <>
    {tooltip ? (
      <Tooltip title={tooltip} placement="top-start" arrow disableInteractive>
        <TruncatableTypography {...props} numLines={numLines}>
          {children}
        </TruncatableTypography>
      </Tooltip>
    ) : (
      <TruncatableTypography {...props} numLines={numLines}>
        {children}
      </TruncatableTypography>
    )}
  </>
);

export default CustomTypography;
