import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Dialog, DialogContent, DialogContentText, TextField, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editMemberService } from "../../services/members";
import { useLocalError } from "../../hooks/error";

export default function EditMember( { member, componentHandler = () => {} } ) {

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.membersReducer);
    
    const { localError, setLocalError } = useLocalError();
    const [ form, setForm ] = useState({
        _id:   member._id   || '',
        name:  member.name  || '',
        email: member.email || '',
        city:  member.city  || '',
        subscriptions: member?.subscriptions || []
    });
    
    const formHandler = ({ target: { name, value } }) => setForm({...form, [name]: value});

    const editMember = async () => {
        const { _id, name, email, city } = form;
        if( !_id || !name || !email || !city ) return setLocalError('All fields are required...');

        try
        {
            const { code } = await editMemberService(form, dispatch);
            if(code === 200) return componentHandler('All Members');
        }
        catch(err)
        {
            console.error(err.message);
            setLocalError(err.message);
        }
    };

    // TODO: Check if you can fix that.
    useEffect(() => {
        if(error) return setLocalError(error);
    }, [error]);
    
    return (
        <Box component={'div'}>
            <Dialog open fullWidth transitionDuration={2000}>
                <DialogContentText textAlign={"center"} variant="h4" mt={5}>
                    {`Edit ${member.name}`}
                </DialogContentText>
                <DialogContent>
                    <Box
                        component={"div"}
                        display={"flex"}
                        alignItems={"center"}
                        gap={2}
                        flexDirection={"column"}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            width="100%"
                            gap={2}
                        >
                            <Typography variant="body1" width="120px">
                                Name:
                            </Typography>
                            <TextField
                                fullWidth
                                defaultValue={member.name}
                                onChange={formHandler}
                                variant="outlined"
                                label="Enter name"
                                name="name"
                            />
                        </Box>

                        <Box
                            display="flex"
                            alignItems="center"
                            width="100%"
                            gap={2}
                        >
                            <Typography variant="body1" width="120px">
                                Email:
                            </Typography>
                            <TextField
                                defaultValue={member.email}
                                onChange={formHandler}
                                fullWidth
                                variant="outlined"
                                label="Enter email"
                                name="email"
                            />
                        </Box>

                        {/* City Field */}
                        <Box
                            display="flex"
                            alignItems="center"
                            width="100%"
                            gap={2}
                        >
                            <Typography variant="body1" width="120px">
                                City:
                            </Typography>
                            <TextField
                                defaultValue={member.city}
                                onChange={formHandler}
                                fullWidth
                                variant="outlined"
                                label="Enter city"
                                name="city"
                            />
                        </Box>

                        { localError ? 
                            <Alert
                                variant="standard"
                                severity="error"
                                color="error"
                            >
                                { localError }
                            </Alert>
                        : null }

                        {/* Buttons */}
                        <Box component={"div"} display={"flex"} gap={2} mt={3}>
                            <Tooltip title="Save">
                                <Button 
                                    variant="contained"
                                    onClick={editMember}
                                >
                                    Save
                                </Button>
                            </Tooltip>
                            <Tooltip title="Cancel">
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => componentHandler("All Members")}
                                >
                                    Cancel
                                </Button>
                            </Tooltip>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}