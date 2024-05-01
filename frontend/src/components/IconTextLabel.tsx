import { Stack } from "@mui/material";
import CustomTypography, {
  CustomTypographyPropTypes,
} from "./CustomTypography";

interface IconTextLabelPropTypes extends CustomTypographyPropTypes {
  icon: JSX.Element;
}

const IconTextLabel = ({
  tooltip,
  icon,
  children,
  ...props
}: IconTextLabelPropTypes) => (
  <Stack direction="row" gap={0.5}>
    {icon}
    <CustomTypography
      sx={{ fontWeight: "bold", color: "#F3BFBA" }}
      tooltip={tooltip}
      numLines={1}
      {...props}
    >
      {children}
    </CustomTypography>
  </Stack>
);

export default IconTextLabel;
