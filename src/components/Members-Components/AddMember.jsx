import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Dialog, DialogContent, DialogContentText, TextField, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { useLocalError } from "../../hooks/error";
import { addNewMemberService } from "../../services/members";

export default function AddMember( { componentSelector = '', componentHandler= () => {} }) {

    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.membersReducer);
    const { localError, setLocalError } = useLocalError();
    const [ newMember, setNewMember ] = useState({
        name: '',
        email: '',
        city: ''
    });
    
    const newMemberHandler = ({ target: { name, value } }) => setNewMember({...newMember, [name]: value});
    
    // FIXME: Check why the localError not update after the request. 
    const addNewMember = async (newMember) => {
        const { name, email, city } = newMember;
        if(!name || !email || !city ) return setLocalError('All fields are required...');

        try
        {
            const { code, message } = await addNewMemberService(newMember, dispatch);

            if (code === 200) 
            {
                componentHandler('All Members'); 
            } 
            else
            {
                setLocalError(message);
            }
        }
        catch(err)
        {
            console.error(err.message);
            setLocalError(err.message);
        }
    };


    useEffect(() => {
        if (error) 
        {
            setLocalError(error);
        }
    }, [error, setLocalError]);
    

    return (
        <Box component={"div"}>
            <Dialog open fullWidth transitionDuration={2000}>
                <DialogContentText 
                    textAlign={"center"} 
                    variant="h4" 
                    mt={5}
                >
                    { componentSelector }
                </DialogContentText>
                <DialogContent>
                    <Box
                        component={"div"}
                        display={"flex"}
                        alignItems={"center"}
                        flexDirection={"column"}
                        gap={2}
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
                                name="name"
                                variant="outlined"
                                label="Enter name"
                                onChange={newMemberHandler}
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
                                fullWidth
                                name="email"
                                variant="outlined"
                                label="Enter email"
                                onChange={newMemberHandler}
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
                                fullWidth
                                name="city"
                                variant="outlined"
                                label="Enter city"
                                onChange={newMemberHandler}
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
                            <Tooltip title={loading ? 'Saving...' : 'Save'}> 
                                <Button 
                                    variant="contained"
                                    onClick={() => addNewMember(newMember)}
                                >
                                { loading ? 'Saving...' : 'Save' }
                                </Button>
                            </Tooltip>
                            <Tooltip title="Cancel">
                                <Button 
                                    variant="contained" 
                                    color="error"
                                    onClick={() => componentHandler('All Members')}
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
