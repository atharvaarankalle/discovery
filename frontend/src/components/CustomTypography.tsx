import { Tooltip, Typography, TypographyProps, styled } from "@mui/material";

const TruncatableTypography = styled(Typography)(
  ({ numLines }: { numLines?: number }) => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: numLines,
    WebkitBoxOrient: "vertical",
    width: "100%",
  })
);

export interface CustomTypographyPropTypes extends TypographyProps {
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
