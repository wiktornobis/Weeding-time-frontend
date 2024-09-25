import * as React from 'react';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Brightness4, Brightness7} from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {ColorModeContext} from '@/ts/theme/ToggleColorMode';
import logo from '@/assets/logo.png';
import logoWhite from '@/assets/logo-white.png';

const pages = [
    { id: 1, name: 'Newsy', path: '/newsy' },
    { id: 2, name: 'Dane', path: '/dane' },
    { id: 3, name: 'Uczelnie', path: '/uczelnie' }
];

function Nav() {
    const colorMode = useContext(ColorModeContext);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (): void => {
        setAnchorElNav(null);
    };

    const handleNavigation = (path: string): void => {
        navigate(path);
        handleCloseNavMenu();
    };

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        src={colorMode.mode === 'light' ? logo : logoWhite}
                        alt="logo"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            width: 70,
                            height: 70
                        }}
                        loading="lazy"
                        onClick={() => handleNavigation("/")}
                    />
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.id} onClick={() => handleNavigation(page.path)}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                        component="img"
                        src={colorMode.mode === 'light' ? logo : logoWhite}
                        alt="logo"
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            width: 70,
                            height: 70
                        }}
                        loading="lazy"
                        onClick={() => handleNavigation("/")}
                    />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.id}
                                onClick={() => handleNavigation(page.path)}
                                sx={{ my: 1, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="mode"
                        onClick={colorMode.toggleColorMode}
                    >
                        {colorMode.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Nav;
