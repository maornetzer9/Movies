import React, { useState } from "react";
import { Box, Button, Checkbox, FormLabel, FormControl, FormControlLabel, Link, TextField, Typography, Alert, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SitemarkIcon } from "./UI/CustomIcons";
import { Card } from "../styles/cardStyles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/users";
import { useLocalError } from "../hooks/error";
import { useValidForm } from "../hooks/validations";

export default function Login() {
    const { loading, error } = useSelector((state) => state.userReducer);
    const { validForm } = useValidForm();

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ username: "", password: "" });
    const { localError, setLocalError } = useLocalError();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleForm = ({ target: { name, value } }) => setForm({ ...form, [name]: value });

   
    const login = async (event) => {
        event.preventDefault();
        if (!validForm(form, setLocalError)) return;

        try 
        {
            const { username, password } = form;
            const { code, message } = await loginService(username, password, dispatch);
            if (code !== 200) return setLocalError({general: message});

            navigate("/movies");
        } 
        catch(err) 
        {
            console.error(err.message);
            setLocalError({general: error || err.message});
        }
    };

    return (
        <Card
            variant="outlined"
            gap={2}
            sx={{ margin: "auto", mt: 30, width: { xs: "80%", xl: "30%" } }}
        >
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <SitemarkIcon />
            </Box>
            <Typography
                component="h1"
                variant="h4"
                textAlign={"center"}
                sx={{
                    width: "100%",
                    fontSize: "clamp(2rem, 10vw, 2.15rem)",
                    textDecoration: "underline",
                }}
            >
                Sign in
            </Typography>
            <Box
                component="form"
                onSubmit={(e) => login(e)}
                noValidate
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: 2,
                }}
            >
                <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <TextField
                        label="Enter username"
                        type="text"
                        name="username"
                        autoComplete="username"
                        variant="outlined"
                        onChange={handleForm}
                        error={!!localError.username}
                        helperText={localError.username}
                    />
                </FormControl>
                <FormControl>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                            component="button"
                            type="button"
                            variant="body2"
                            sx={{ alignSelf: "baseline" }}
                        >
                            Forgot your password?
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            label="******"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            fullWidth
                            variant="outlined"
                            onChange={handleForm}
                            error={!!localError.password}
                            helperText={localError.password}
                        />
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                            sx={{ position: "absolute", right: "20px", top: 10 }}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </Box>
                </FormControl>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />

                {localError.general && <Alert severity="error">{ localError.general }</Alert>}

                <Button type="submit" fullWidth variant="contained">
                    {!loading ? "Login" : "Logging..."}
                </Button>
                <Typography sx={{ textAlign: "center" }}>
                    Don&apos;t have an account?{" "}
                    <Box component={"span"}>
                        <Link href="/register" variant="body2" sx={{ alignSelf: "center" }}>
                            Sign Up
                        </Link>
                    </Box>
                </Typography>
            </Box>
        </Card>
    );
}
