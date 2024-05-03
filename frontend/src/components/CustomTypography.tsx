import {
  Tooltip,
  TooltipProps,
  tooltipClasses,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";

const StyledToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.peach.main,
    boxShadow: theme.shadows[1],
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.dark,
  },
}));

// Adding custom styling to the MUI Typography to allow text to truncate after a specific number of lines
const TruncatableTypography = styled(Typography)(
  ({ num_lines }: { num_lines?: number }) => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: num_lines,
    WebkitBoxOrient: "vertical",
    width: "fit-content",
  })
);

/* Prop types declaration for CustomTypography */
export interface CustomTypographyPropTypes extends TypographyProps {
  children: React.ReactNode;
  tooltip?: string;
  num_lines?: number;
}

/** 
 * CustomTypography Component
 * 
@prop children: text to wrap with this CustomTypography 
@prop tooltip: optional prop that contains tooltip text if desired
@prop num_lines: optional prop indicating how many lines to truncate text after
@prop all other valid MUI Typography props...
**/
const CustomTypography = ({
  children,
  tooltip = undefined,
  num_lines = undefined,
  ...props
}: CustomTypographyPropTypes) => (
  <>
    {tooltip ? (
      <StyledToolTip title={tooltip} placement="top" arrow disableInteractive>
        <TruncatableTypography {...props} num_lines={num_lines}>
          {children}
        </TruncatableTypography>
      </StyledToolTip>
    ) : (
      <TruncatableTypography {...props} num_lines={num_lines}>
        {children}
      </TruncatableTypography>
    )}
  </>
);

export default CustomTypography;
