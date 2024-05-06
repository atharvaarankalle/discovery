import React, { useState } from "react";
import { Avatar, Divider, IconButton, Menu, MenuItem, Typography, styled } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import IconTextLabel from "./IconTextLabel";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

/* Custom styles applied to MUI Menu */
const StyledMenu = styled(Menu)(({ theme }) => ({
    "& .MuiPaper-root": {
        width: "12.5rem",
        backgroundColor: theme.palette.navyBlue.main,
        borderRadius: "0.7rem"
    },
    "& .MuiMenuItem-root": {
        "&:hover": {
            backgroundColor: theme.palette.greyBlue.main,
        },
        justifyContent: "flex-end"
    },
}));

/* Prop types declaration for NavBarDropdownMenu */
interface NavBarDropdownMenuPropTypes {
    username: string;
    profilePictureSrc?: string;
}

/**
 * NavBarDropdownMenu Component
 * 
 * @prop username: username of the user to display in the dropdown menu
 * @prop profilePictureSrc: optional prop for the source of the user's profile picture
 */
const NavBarDropdownMenu = ({ username, profilePictureSrc }: NavBarDropdownMenuPropTypes) => {
    const theme: Theme = useTheme();
    const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
    const navigate = useNavigate();

    const handleProfilePictureClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorElement(null);
    }

    const handleNavigation = (path: string) => {
        navigate(path);
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
                <MenuItem onClick={() => handleNavigation("/user")}>
                    <Typography>{username}</Typography>
                </MenuItem>
                <Divider sx={{ backgroundColor: `${theme.palette.pink.main}40` }} />
                <MenuItem onClick={() => handleNavigation("/")}>
                    <IconTextLabel variant="body1" icon={<LogoutIcon sx={{ color: theme.palette.pink.main, mr: 1 }} />}>Sign out</IconTextLabel>
                </MenuItem>
            </StyledMenu>
        </>
    )
}

export default NavBarDropdownMenu;
