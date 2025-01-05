import { Alert, Box, Button, Tooltip, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { deleteUserById, loadingUsers } from "../../services/users";
import { useDispatch, useSelector } from "react-redux";
import { slideAnimation } from "../../utils/motion";
import { useLocalError } from "../../hooks/error";
import { CINEMA } from "../../App";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import EditUser from "./EditUser";
import Loader from "../UI/Loader";

// TODO: Check why don`t have a createAt Date.
export default function AllUsers() {

    const dispatch = useDispatch();
    const { localError, setLocalError } = useLocalError();
    const { error, users } = useSelector((state) => state.userReducer);

    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState(null);

    const handleEdit = (user) => {
        setUser(user);
        setEdit(!edit);
    };

    const fetchUsers = useCallback(async () => {
        try 
        {
            await loadingUsers(dispatch);
        } 
        catch(err) 
        {
            console.error(err.message);
            setLocalError(err.message);
        }
    }, [dispatch, CINEMA]);
    

    const deleteUser = useCallback(async (_id) => {
        if (!_id) return setLocalError('Id cannot be provided');
        try 
        {
            await deleteUserById(_id, dispatch)
        } 
        catch(err) 
        {
            console.error(err.message);
            setLocalError(err.message);
        }
    }, [dispatch, CINEMA]);
    

    useEffect(() => {
        if(users.length <= 0)
        {
            fetchUsers(); 
        }
    }, [users.length, fetchUsers])

    if(users.length <= 0) return <Loader color={'info'}/>

    return (
        <motion.div 
            key="users-list" 
            {...slideAnimation('left')} 
            style={{width:'80%', margin:'auto'}}
        >

            {localError &&
                <Alert
                    sx={{display:'flex', justifyContent:'center'}}
                    variant="filled"
                    severity="error"
                    color="error"
                >
                    { localError ? localError : error }
                </Alert>
            }

            <Box component={"div"} ml={{ xs: 0, xl: -20 }}>
                {!edit
                    ? users.map((user, index) => (
                          <Box
                              component={'div'}
                              key={index}
                              elevation={2}
                              borderRadius={5}
                              width={{ xs: "90%", xl: "33%" }}
                              boxShadow={"0px 0px 4px 1px lightgray"}
                              sx={{
                                  p: 2,
                                  mt: { xs: 5 },
                                  mb: { xs: 10, xl: 2 },
                                  display: "flex",
                                  flexDirection: "column",
                                  transition: "transform 0.5s ease-in-out",
                                  "&:hover": {
                                      transform: "scale(1.02)",
                                  },
                                  gap: 1,
                              }}
                          >
                              <Typography variant="h4" color="primary">
                                  {`${user.firstName} ${user.lastName}`}
                              </Typography>
                              <Typography variant="body1">
                                  <strong>Username:</strong> {user.username}
                              </Typography>
                              <Typography variant="body1">
                                  <strong>Session Timeout:</strong>{" "}
                                  {user.sessionTimeout} minutes
                              </Typography>
                              <Typography variant="body1">
                                  <strong>Created At:</strong> {user.createAt}
                              </Typography>
                              <Typography variant="body1">
                                  <strong>Permissions:</strong>{" "}
                                  {user.permissions?.join(", ")}
                              </Typography>

                              <Box component={"div"} gap={2} display={"flex"}>
                                <Tooltip title="Edit">
                                  <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={() => handleEdit(user)}
                                      sx={{ mt: 2 }}
                                      endIcon={<EditIcon />}
                                  >
                                      Edit
                                  </Button>
                                </Tooltip>

                                <Tooltip title="Delete">
                                  <Button
                                      variant="contained"
                                      color="primary"
                                      sx={{ mt: 2 }}
                                      endIcon={<DeleteForeverIcon />}
                                      onClick={() => deleteUser(user._id)}
                                  >
                                      Delete
                                  </Button>
                                </Tooltip>
                              </Box>
                          </Box>
                      ))
                    : null}
            </Box>
            
            {edit && <EditUser user={user} edit={edit} handleEdit={handleEdit} /> }

        </motion.div>
    );
}