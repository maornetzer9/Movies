import React, { useEffect, useState } from "react";
import { Box, FormControl, FormLabel, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { Card } from "../styles/cardStyles";
import { SitemarkIcon } from './UI/CustomIcons';
import { useDispatch, useSelector } from 'react-redux';
import { registerService } from "../services/users";
import { useLocalError } from "../hooks/error";
import { useValidForm } from "../hooks/validations";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import InputModel from "./UI/InputModel";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export default function Register() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.userReducer);   
    const { localError, setLocalError } = useLocalError();
    const { setError, validForm } = useValidForm();

    const [showPassword, setShowPassword] = useState(false);
    const [ form, setForm ] = useState({ username: "", password: "" });

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const formHandler = ({ target: { name, value } }) => setForm({...form, [name]:value });
    
    const register = async (e) => {
        e.preventDefault(); 
        
        const isValid = validForm(form, setLocalError);
        if( !isValid ) return;

        try
        {
            const { code, message } = await registerService(form, dispatch);
            if( code !== 200 ) return setError({general: message});
            
            navigate('/');
        }
        catch(err)
        {
            console.error(err.message);
            setLocalError({general: error || err.message})
        }
    }

    // Error state handler.
    useEffect(() => {
        if (error) 
            return setLocalError((prevError) => ({ ...prevError, general: error }));
    }, [error, setLocalError]);


    return (
        <Card gap={2}
            sx={{margin:'auto', mt: 30, width:{xs: '80%', md: '50%', xl:'30%'}}}
        >
            <Box 
                component={'div'}
                sx={{ display: { xs: 'flex', md: 'none' } }}
            >
                <SitemarkIcon />
            </Box>

            <Typography 
                variant="h4" 
                component={"h4"} 
                textAlign={"center"} 
                sx={{textDecoration:'underline'}}
            >
                Register
            </Typography>

            <FormControl component='form' onSubmit={(e) => register(e) } sx={{gap: 1}}>
                <FormLabel> Username </FormLabel>
                <InputModel 
                    name="username"
                    type="text"
                    label="Enter username" 
                    autoComplete="username"
                    error={!!localError.username}
                    helperText={localError.username}
                    defaultValue={form.username}
                    onChange={formHandler}
                />

                <FormLabel> Password </FormLabel>
                <TextField 
                    name="password"
                    label="Enter Password" 
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    error={!!localError.password}
                    helperText={localError.password}
                    value={form.password}
                    onChange={formHandler}
                    slotProps={{ input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    }
                />
               
                <Button 
                    type="submit"
                    disabled={loading}
                    variant="contained"
                >
                    { loading ? 'Registering...' : 'Register' }
                </Button>

                { localError.general ? 
                    <Typography color="error" textAlign="center" mt={2}>
                        {localError.general}
                    </Typography>
                : null }
            </FormControl>


            <Typography sx={{ textAlign: "center" }}>
                Already have an account?{" "}
                <Box component={'span'}>
                    <Link
                        href="/"
                        variant="body2"
                        sx={{ alignSelf: "center" }}
                    >
                        Sign In
                    </Link>
                </Box>
            </Typography>
        </Card>
    );
}