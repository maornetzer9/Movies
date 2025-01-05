import React, { useEffect } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import InputModel from "../UI/InputModel";
import { Alert, Box, Button, Card, Checkbox, Divider, FormLabel, Grow, InputLabel, List, ListItem, ListItemButton, ListItemText, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useUsersFieldsValidation, useUsersFormHandler } from "../../hooks/validations";
import { editUserService } from "../../services/users";
import { useLocalError } from "../../hooks/error";
import { PERMISSIONS } from "../../utils/constants";
import Loader from "../UI/Loader";

export default function EditUser({ user = {}, edit = false, handleEdit = () => {} }) {

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.userReducer);

    const { localError, setLocalError } = useLocalError();
    const { form, formError = {}, formHandler, setFormError} = useUsersFormHandler({
        _id: user._id || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        sessionTimeout: user.sessionTimeout || 0,
        createAt: user.createAt || new Date().toLocaleDateString(),
        permissions: user?.permissions || []
    }, setLocalError );

    const EDIT_FORM_ATTRIBUTES = [
        {
            label: "First Name:",
            name: "firstName",
            type: 'text',
            autoComplete: "First Name",
            value: user?.firstName || "",
        },
        {
            label: "Last Name:",
            name: "lastName",
            type: 'text',
            autoComplete: "First Name",
            value: user?.lastName || "",
        },
        {
            label: "Username:",
            name: "username",
            type: 'text',
            autoComplete: "username",
            value: user?.username || "",
        },
        {
            label: "Session Timeout (Minutes):",
            name: "sessionTimeout",
            type: 'number',
            autoComplete: "sessionTimeout",
            value: user?.sessionTimeout || 0,
        },
        {
            label: "Created At:",
            name: "createAt",
            type: 'text',
            autoComplete: "createAt",
            value: user?.createdAt || "12/12/2024",
        },

    ];
    
    const editUser = async ( form ) => {
        const isValid = useUsersFieldsValidation(form, setFormError);
        
        if(!isValid) return;
        if(form.permissions.length <= 0) return setLocalError('User permissions are required.');

        try
        {
            const { code } = await editUserService(form, dispatch);
            if(code === 200) return handleEdit();
        }
        catch(err)
        {
            console.error(err.message);
            setLocalError(err.message)
        }
    };

    useEffect(() => {
        if (Object.keys(formError).length > 0) 
        {
            const timer = setTimeout(() => {
                setFormError({});
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [formError]);

    if(error)   return setLocalError(error);
    if(loading) return <Loader color={'info'} />


    return (
        <Grow
            in={edit}
            {...(edit ? { timeout: 1000 } : {})}
            style={{ transformOrigin: "0 0 0", display: edit ? "flex" : "none" }}
        >
            <Box
                mt={{xs: 0, md: 0, xl: 0}}
                ml={{ xl: -25 }}
                mb={{ xs: 10, md: 0, xl: 0 }}
                width={{ xl: "37%" }}
                component={"div"}
            >
                <Card
                    component={"div"}
                    sx={{
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        background: "transparent",
                        boxShadow: "0px 0px 2px 1px lightgray",
                        borderRadius: 10,
                        color: "white",
                        gap: 2,
                        mt:5,
                        p: 4,
                    }}
                >
                    <Typography
                        variant="h4"
                        fontSize={{ xs: "16px", xl: "30px" }}
                        fontWeight={{ xs: "bold" }}
                    >
                        Edit {`- ${user.firstName} ${user.lastName}`} Account
                    </Typography>

                    <Divider sx={{ bgcolor: "lightgray" }} />

                    {EDIT_FORM_ATTRIBUTES.map((form, index) => (
                        <Box
                            key={index}
                            display={{ xs: "grid", xl: "flex" }}
                            alignItems="center"
                            sx={{
                                gap: 2,
                                width: "100%",
                                marginBottom: 1,
                                "& .MuiInputLabel-root": {
                                    flex: "0 0 200px",
                                    color: "white",
                                },
                                "& .MuiInputBase-root": {
                                    flex: 1,
                                    minWidth: "200px",
                                    color: "white",
                                },
                            }}
                        >
                            <InputLabel>{form.label}</InputLabel>
                            { form.name === "createAt" ? (
                                <Typography
                                    color="white"
                                    variant="body1"
                                >
                                    {form.value}
                                </Typography>
                            ) : (
                                <InputModel
                                    style={{ border: "1px solid white" }}
                                    name={form.name}
                                    label={form.label}
                                    type={form.type}
                                    onChange={formHandler}
                                    defaultValue={form.value}
                                    autoComplete={form.autoComplete}
                                    helperText={formError[form.name]}
                                    error={Boolean(formError[form.name])} 
                                />
                            )}
                        </Box>
                    ))}

                    <FormLabel 
                        lang="en" 
                        error={!!localError || !!formError.permissions} 
                        sx={{ color: "white" }} 
                    >
                        Permissions:
                    </FormLabel>
                    <List
                        dense
                        sx={{
                            width: "100%",
                            maxWidth: 360,
                            color: "black",
                            bgcolor: "lightgray",
                            borderRadius: 5,
                        }}
                    >
                        {PERMISSIONS.map((permission, index) => {
                            const labelId = `checkbox-list-secondary-label-${index}`;
                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemText
                                            id={labelId}
                                            primary={permission}
                                            
                                        />
                                         <Checkbox
                                            edge="end"
                                            name="permissions" 
                                            value={permission} 
                                            onChange={formHandler} 
                                            checked={form.permissions.includes(permission)}
                                            inputProps={{ "aria-labelledby": labelId }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>

                    <Box component={"div"} display={"flex"} gap={2}>
                        <Tooltip title={'Save'}>
                            <Button 
                                variant="contained" 
                                endIcon={<SaveAltIcon />}
                                onClick={() => editUser(form)}
                            >
                                Save
                            </Button>
                        </Tooltip>
                        <Tooltip title={'Cancel'}> 
                            <Button
                                variant="contained"
                                onClick={handleEdit}
                                endIcon={<CancelIcon />}
                            >
                                Cancel
                            </Button>
                        </Tooltip>
                    </Box>
                        { localError || formError.permissions&& 
                            <Alert
                                severity="error"
                                variant="filled"
                                color="error"
                            >
                                { localError ? localError : formError.permissions }
                            </Alert>
                        }
                </Card>

                       

            </Box>
        </Grow>
    );
}