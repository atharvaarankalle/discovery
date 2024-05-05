import React, { useState } from "react";
import { Avatar, Divider, IconButton, Menu, MenuItem, styled } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import CustomTypography from "./CustomTypography";
import IconTextLabel from "./IconTextLabel";
import LogoutIcon from '@mui/icons-material/Logout';

const StyledMenu = styled(Menu)(({ theme }) => ({
    "& .MuiPaper-root": {
        backgroundColor: theme.palette.navyBlue.main,
        borderRadius: "0.7rem",
        width: "6%"
    },
    "& .MuiMenuItem-root": {
        "&:hover": {
            backgroundColor: theme.palette.greyBlue.main,
        },
    },
}));

interface NavBarDropdownMenuPropTypes {
    profilePictureSrc?: string;
    username: string;
}

const NavBarDropdownMenu = ({ profilePictureSrc, username }: NavBarDropdownMenuPropTypes) => {
    const theme: Theme = useTheme();
    const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

    const handleProfilePictureClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorElement(null);
    }

    return (
        <>
            <IconButton
                onClick={handleProfilePictureClick}
                aria-controls={anchorElement ? "profile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorElement ? "true" : undefined}
            >
                <Avatar src={profilePictureSrc ?? undefined} />
            </IconButton>
            <StyledMenu
                anchorEl={anchorElement}
                id="profile-menu"
                open={anchorElement !== null}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem>
                    <CustomTypography>{username}</CustomTypography>
                </MenuItem>
                <Divider sx={{ backgroundColor: `${theme.palette.pink.main}40` }} />
                <MenuItem>
                    <IconTextLabel variant="body1" icon={<LogoutIcon sx={{ color: theme.palette.pink.main }} />}>Sign out</IconTextLabel>
                </MenuItem>
            </StyledMenu>
        </>
    )
}

export default NavBarDropdownMenu;
