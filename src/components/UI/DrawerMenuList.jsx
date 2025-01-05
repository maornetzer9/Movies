import React from 'react';
import { DRAWER_DIRECTION } from '../../utils/constants';
import { Box, List, ListItem, ListItemButton, ListItemText, Divider, Typography, Select, MenuItem } from '@mui/material';
import { disconnectUserService } from '../../services/users';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const DrawerMenuList = ({ filteredMenu, toggleDrawer, navigatorHandler, selectedAnchor, handleAnchorChange }) => {
    const { user } = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const disconnect = async () => {
        const username = JSON.parse(localStorage.getItem('username'));
        try
        {
            if(username === 'Admin')
            {
                localStorage.clear();
                navigate('/')
            }
            else 
            {
                const sessionTimeout = Math.floor(JSON.parse(localStorage.getItem('sessionTimeoutRemaining')));
                const updatedUser = {...user, sessionTimeout};
                delete updatedUser.permissions

                await disconnectUserService(updatedUser, dispatch)

                localStorage.clear();
                navigate('/')
            }
        }
        catch(err)
        {
            console.error(err.message);
        }
    };

    return (
        <Box
            role="presentation"
            onClick={toggleDrawer(selectedAnchor, false)}
            onKeyDown={toggleDrawer(selectedAnchor, false)}
            sx={{ width: selectedAnchor === 'top' || selectedAnchor === 'bottom' ? 'auto' : 300 }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" margin={2}> Choose Menu Position </Typography>
                <Select
                    fullWidth
                    value={selectedAnchor}
                    onChange={handleAnchorChange}
                    displayEmpty
                    sx={{ textAlign: 'center' }}
                >
                    {DRAWER_DIRECTION.map((option, index) => (
                        <MenuItem
                            key={index}
                            aria-hidden="false"
                            value={option.toLocaleLowerCase()}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Divider />
            <List>
                {filteredMenu.map((page, index) => (
                    <ListItem disablePadding key={index}>
                        <ListItemButton
                            onClick={() => page.label === 'Disconnect' ? disconnect() : navigatorHandler(page.path)}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <ListItemText primary={page.label} />
                            {page.icon ? <page.icon /> : null}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default DrawerMenuList;
