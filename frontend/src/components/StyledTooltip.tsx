import {
  Tooltip,
  TooltipProps,
  tooltipClasses,
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

export default StyledToolTip;
