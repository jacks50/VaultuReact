import { SaveOutlined, PasswordOutlined, Logout } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Box, IconButton, styled, InputBase, alpha } from "@mui/material";
import AppSearch from "./AppSearch";

interface AppToolbarProps {
    saveListHandler: () => void,
    logoutHandler: () => void,
    searchHandler: (searchTerm: string) => void,
    setOpenGenerator: (isOpen: boolean) => void,
}

const AppToolbarStyle = styled(AppBar)({

});

export default function AppToolbar({ 
    saveListHandler, 
    logoutHandler, 
    searchHandler,
    setOpenGenerator, 
}: AppToolbarProps) {
    return (
        <AppToolbarStyle position="static">
            <Toolbar variant="dense">
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Vaulture
                </Typography>

                <AppSearch 
                    searchHandler={ searchHandler } />

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton
                        color="inherit"
                        aria-label="save"
                        onClick={ saveListHandler }>
                        <SaveOutlined />
                    </IconButton>

                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="generate password"
                        onClick={ () => setOpenGenerator(true) } >
                        <PasswordOutlined />
                    </IconButton>

                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="logout"
                        onClick={ logoutHandler } >
                        <Logout />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppToolbarStyle>
    );
}