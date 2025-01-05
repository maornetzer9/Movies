import { Alert, Box, Button, Checkbox, Divider, FormControl, FormLabel, Grow, List, ListItem, ListItemButton, ListItemText, Tooltip, Typography } from "@mui/material";
import InputModel from "../UI/InputModel";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect } from "react";
import { useUsersFieldsValidation, useUsersFormHandler,  } from "../../hooks/validations";
import { useDispatch, useSelector } from 'react-redux';
import { useLocalError } from "../../hooks/error";
import { PERMISSIONS } from "../../utils/constants";
import { addNewUserService } from "../../services/users";

export default function AddUser( { selectedComponent = '', componentsHandler = () => {} } ) {

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.userReducer);
    
    const { localError, setLocalError } = useLocalError();
    const {  form, formError, formHandler, setFormError} = useUsersFormHandler({
        firstName: '',
        lastName: '',
        username: '',
        sessionTimeout: 0,
        permissions: []
    });

    const addNewUser = async () => {
        const isValid = useUsersFieldsValidation(form, setFormError);
        if(!isValid) return;
        try
        {
            const { code, message } = await addNewUserService( form, dispatch );

            if(code === 200) return componentsHandler('All Users');
            if(code !== 200) return setLocalError(message);
        }
        catch(err)
        {
            console.error(err.message);
            setLocalError(err.message);
        }
    }

    useEffect(() => {
        if (Object.keys(formError).length > 0) 
        {
            const timer = setTimeout(() => {
                setFormError({});
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [formError]);

    return (
        <Grow
            in={selectedComponent === 'Add User'}
            {...(selectedComponent === 'Add User' ? { timeout: 1000 } : {})}
            style={{ transformOrigin: "0 0 0"}}
        >
        <Box 
            mt={5}
            ml={2}
            padding={2} 
            component={'div'} 
            borderRadius={10}
            mb={{xs: 10, xl: 0}}
            width={{xs: '70%', md: '50%', xl: '37%'}} 
            boxShadow={'0px 0px 2px 2px lightgray'}
            margin={{xs: 'auto', md: 'auto', xl: 5}}
        >
            <Typography variant="h4" textAlign={'center'}> { selectedComponent } </Typography>

            <Divider sx={{ bgcolor: "white", mb: 2}} />

            <FormControl sx={{ color: "lightgray", gap: 2}}>
                
                <Box 
                    component={'div'} 
                    sx={{
                        gap: 1,
                        display:'flex', 
                        alignItems: { xs:'start', md:'start', xl:'center' }, 
                        flexDirection: { xs:'column', md:'column', xl:'row' },
                    }}
                >
                    
                    <FormLabel lang="en" sx={{color:'white'}}> First Name: </FormLabel>
                    <InputModel
                        error={!!formError.firstName}
                        helperText={formError.firstName}
                        label="Enter First Name"
                        type="text"
                        name="firstName"
                        autoComplete="firstName"
                        onChange={formHandler}
                        style={{border:'1px solid white', background:'white'}}
                    />

                    <FormLabel lang="en" sx={{color:'white'}}> Last Name: </FormLabel>
                    <InputModel
                        error={!!formError.lastName}
                        helperText={formError.lastName}
                        label="Enter Last Name"
                        type="text"
                        name="lastName"
                        autoComplete="lastName"
                        onChange={formHandler}
                        style={{border:'1px solid white', background:'white'}}
                    />
                </Box>

                <Box 
                    component={'div'} 
                    mt={2}
                    gap={1} 
                    sx={{
                        display:'flex', 
                        alignItems: { xs:'start', md:'start', xl:'center' }, 
                        flexDirection: { xs:'column', md:'column', xl:'row' },
                    }}
                >
                    <FormLabel lang="en" sx={{color:'white'}}> Username: </FormLabel>
                    <InputModel
                        error={!!formError.username}
                        helperText={formError.username}
                        label="Enter Username"
                        type="text"
                        name="username"
                        autoComplete="username"
                        onChange={formHandler}
                        style={{border:'1px solid white', background:'white'}}
                    />
                </Box>

                <FormLabel sx={{color:'white'}} lang="en"> Session Timeout ( Minutes ): </FormLabel>
                <InputModel 
                    error={!!formError.sessionTimeout}
                    helperText={formError.sessionTimeout}
                    label="Minutes" 
                    type="number" 
                    name="sessionTimeout" 
                    onChange={formHandler}
                    style={{border:'1px solid white', background:'white'}}
                />

                <FormLabel sx={{color:'white'}} lang="en"> Permissions: </FormLabel>
                {formError.permissions && 
                    <Typography variant="caption" color="error">
                        { formError.permissions }
                    </Typography>
                }
                { PERMISSIONS.map((permission, index) => {
                    const labelId = `checkbox-list-secondary-label-${index}`;

                    return (
                        <List
                            key={index}
                            dense
                            sx={{
                                width: "100%",
                                maxWidth: 360,
                                color:'black',
                                bgcolor: "lightgray",
                                borderRadius:5,
                            }}
                        >
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <Checkbox
                                        onChange={formHandler}
                                        edge="end"
                                        name="permissions"
                                        value={permission}
                                        checked={form.permissions?.includes(permission)}
                                        inputProps={{
                                            "aria-labelledby": labelId,
                                        }}
                                    />
                                }
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemText
                                        id={labelId}
                                        primary={permission}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    );
                })}
                <Box 
                    component={'div'} 
                    gap={2} 
                    display={'flex'}
                >
                    <Tooltip title={'Save'}>
                        <Button 
                            variant="contained" 
                            endIcon={<SaveAltIcon/>} onClick={() => addNewUser(form)}
                        >
                                 Save
                         </Button>
                     </Tooltip>
                     <Tooltip title={'Cancel'}>
                        <Button 
                            variant="contained" 
                            endIcon={<CancelIcon/>} onClick={() => componentsHandler('All Users')}
                        >
                             Cancel 
                        </Button>
                    </Tooltip>
                </Box>

                {localError &&
                    <Alert 
                        severity="error"
                        variant="filled"
                        color="error"
                    >
                        { localError ? localError : error }
                    </Alert>
                }

            </FormControl>
        </Box>
        </Grow>
    );
}