import { Stack } from "@mui/material";
import CustomTypography, {
  CustomTypographyPropTypes,
} from "./CustomTypography";

/* Prop types declaration for IconTextLabel */
interface IconTextLabelPropTypes extends CustomTypographyPropTypes {
  icon: JSX.Element;
}

/** 
 * IconTextLabel Component
 * 
@prop children: text to wrap with this IconTextLabel Component 
@prop icon: icon/image component that you desire to be displayed
@prop tooltip: optional prop that contains tooltip text if desired
@prop all other valid MUI Typography props...

**/
const IconTextLabel = ({
  tooltip,
  icon,
  children,
  ...props
}: IconTextLabelPropTypes) => (
  <Stack direction="row" gap={0.5}>
    {icon}
    <CustomTypography tooltip={tooltip} num_lines={1} {...props}>
      {children}
    </CustomTypography>
  </Stack>
);

export default IconTextLabel;
