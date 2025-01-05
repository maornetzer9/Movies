import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Avatar, Tooltip, Typography, Box, Button, SwipeableDrawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deepOrange } from '@mui/material/colors';
import { usePermissions } from '../../hooks/permissions';
import DrawerMenuList from './DrawerMenuList';
import MenuIcon from '@mui/icons-material/Menu';
import Loader from './Loader';

export default function DrawerModel() {
    const { getUserPermissions, getFilteredMenu } = usePermissions();

    const username = JSON.parse(localStorage.getItem('username'));

    const [ selectedAnchor, setSelectedAnchor ] = useState(JSON.parse(localStorage.getItem('menu-position')) || 'left');
    const [ menuPosition, setMenuPosition ]     = useState({ top: false, left: false, bottom: false, right: false });
    const [ isAuthorize, setIsAuthorize ]       = useState(null); 
    const [ isRedirected, setIsRedirected ]     = useState(false);

    const navigate = useNavigate();
    const navigatorHandler = useCallback((path) => { navigate(path); }, [navigate]);


    const initials = useMemo(() => {
        return username
            .split(' ')
            .map((name) => name[0].toUpperCase())
            .join('');
    }, [username]);

    const toggleDrawer = useCallback(
        (anchor, open) => (event) => {
            if (
                event &&
                event.type === 'keydown' &&
                (event.key === 'Tab' || event.key === 'Shift')
            ) return;

            setMenuPosition((prev) => ({ ...prev, [anchor]: open }));
        },
        []
    );

    const handleAnchorChange = useCallback(({ target: { value } }) => {
        const anchor = value;
        setMenuPosition((prev) => ({ ...prev, [selectedAnchor]: false }));
        setSelectedAnchor(anchor);
        setMenuPosition((prev) => ({ ...prev, [anchor]: true }));
        localStorage.setItem('menu-position', JSON.stringify(anchor));
    }, [selectedAnchor]);

    useEffect(() => {
        const fetchAuthorizationStatus = async () => {
            const authorizationStatus = await getUserPermissions(username);
            setIsAuthorize(authorizationStatus);
        };

        fetchAuthorizationStatus();
    }, [getUserPermissions, username]);

    useEffect(() => {
        if (isAuthorize && !isRedirected) 
        {
            // Check if the user is already on an authorized page
            const currentPath = window.location.pathname;
    
            // Define valid pages based on permissions
            const validPages = [];
            if (isAuthorize.movies) validPages.push('/movies');
            if (isAuthorize.subscription) validPages.push('/subscriptions');
            if (isAuthorize.admin) validPages.push('/users');
    
            // Redirect only if the current path is not in the list of valid pages
            if (!validPages.includes(currentPath)) 
            {
                const targetPage = isAuthorize.movies
                    ? '/movies'
                    : isAuthorize.subscription
                    ? '/subscriptions'
                    : '/'; // Fallback page if no valid permissions
    
                navigate(targetPage);
            }
    
            setIsRedirected(true);
        }
    }, [isAuthorize, isRedirected, navigate]);
    

    const filteredMenu = useMemo(() => (isAuthorize ? getFilteredMenu(isAuthorize) : []), [isAuthorize, getFilteredMenu]);

    if (isAuthorize === null) return <Loader/>

    return (
        <Box component={'main'}>
            <Button
                onClick={toggleDrawer(selectedAnchor, true)}
                sx={{
                    position: 'absolute',
                    left: selectedAnchor === 'left' ? 0 : 'none',
                    right: selectedAnchor === 'right' ? 0 : 'none',
                    top: 0
                }}
                size='large'
            >
                <Tooltip title="Menu">
                    <MenuIcon 
                        sx={{ 
                            top: '5px', 
                            color: 'white', 
                            position: 'fixed', 
                            fontSize: '40px', 
                            zIndex: 1000 
                        }} />
                </Tooltip>
            </Button>

            <SwipeableDrawer
                anchor={selectedAnchor}
                open={menuPosition[selectedAnchor]}
                onClose={toggleDrawer(selectedAnchor, false)}
                onOpen={toggleDrawer(selectedAnchor, true)}
            >
                <DrawerMenuList
                    selectedAnchor={selectedAnchor}
                    filteredMenu={filteredMenu}
                    toggleDrawer={toggleDrawer}
                    navigatorHandler={navigatorHandler}
                    handleAnchorChange={handleAnchorChange}
                />
            </SwipeableDrawer>

            <Box
                component={'div'}
                display={'flex'}
                alignItems={'center'}
                position={'fixed'}
                bottom={20}
                left={20}
                gap={1}
            >
                <Tooltip title={username}>
                    <Avatar sx={{ bgcolor: deepOrange[500], cursor: 'pointer' }}>
                        {initials}
                    </Avatar>
                </Tooltip>
                <Typography variant='body1'> {username} </Typography>
            </Box>
        </Box>
    );
}