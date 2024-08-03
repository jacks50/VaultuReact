import { BugReportOutlined, Logout, MoreVertOutlined, PasswordOutlined, SaveOutlined, StarOutlined } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Typography, styled } from "@mui/material";
import { useState } from "react";
import AppSearch from "./AppSearch";

interface AppToolbarProps {
    saveListHandler: () => void,
    logoutHandler: () => void,
    searchHandler: (searchTerm: string) => void,
    setOpenGenerator: (isOpen: boolean) => void,
    debugMode: boolean;
    setDebugMode: (debugMode: boolean) => void;
}

const AppToolbarStyle = styled(AppBar)({
    color: '#fff',
    backgroundColor: '#b71c1c',
});

export const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function AppToolbar({
    saveListHandler,
    logoutHandler,
    searchHandler,
    setOpenGenerator,
    debugMode,
    setDebugMode,
}: AppToolbarProps) {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(e.currentTarget);
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    }

    const handleDebugModeEnabled = () => {
        setDebugMode(true);
    }

    const renderMenu = (
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
                color="inherit"
                aria-label="save"
                onClick={saveListHandler}>
                <SaveOutlined />
            </IconButton>

            <IconButton
                size="large"
                color="inherit"
                aria-label="generate password"
                onClick={() => setOpenGenerator(true)} >
                <PasswordOutlined />
            </IconButton>

            <IconButton
                size="large"
                color="inherit"
                aria-label="debug-mode"
                onClick={() => setDebugMode(!debugMode)}>
                <Badge color="success" variant="dot" invisible={ !debugMode }>
                    <BugReportOutlined />
                </Badge>
            </IconButton>

            <IconButton
                size="large"
                color="inherit"
                aria-label="logout"
                onClick={logoutHandler} >
                <Logout />
            </IconButton>
        </Box>
    );

    const renderMobileMenu = (
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                color="inherit"
                aria-label="show more"
                aria-controls="primary-search-account-menu-mobile"
                onClick={handleMobileMenuOpen} >
                <MoreVertOutlined />
            </IconButton>

            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id={'primary-search-account-menu-mobile'}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}>
                <MenuItem
                    onClick={() => {
                        saveListHandler();
                        handleMobileMenuClose();
                    }}>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="save">
                        <SaveOutlined />
                    </IconButton>
                    <p>Save changes</p>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        setOpenGenerator(true);
                        handleMobileMenuClose();
                    }}>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="generate password" >
                        <PasswordOutlined />
                    </IconButton>
                    <p>Generate password</p>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        logoutHandler();
                        handleMobileMenuClose();
                    }}>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="logout" >
                        <Logout />
                    </IconButton>
                    <p>Log out</p>
                </MenuItem>
            </Menu>
        </Box>
    );

    return (
        <AppToolbarStyle position="fixed">
            <Toolbar variant="dense">
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Vaulture
                </Typography>

                <AppSearch
                    searchHandler={searchHandler} />

                <Box sx={{ flexGrow: 1 }} />

                {renderMenu}
                {renderMobileMenu}
            </Toolbar>
        </AppToolbarStyle>
    );
}