import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Alert } from '@mui/material';


import LinearProgress from '@mui/material/LinearProgress';
import { Grid } from '@mui/material';
import login from '../../img/login.png'
import { NavLink, useHistory, useLocation, } from 'react-router-dom';
import useAuth from './useAuth';


const Login = () => {
    const [loginData, setLoginData] = useState({})
    const { user, loginUser, isLoading, error, signInGoogle } = useAuth()
    const location = useLocation()
    const history = useHistory()
    const handleOnChange = e => {
        const field = e.target.name
        const value = e.target.value
        const newLoginData = { ...loginData }
        newLoginData[field] = value
        setLoginData(newLoginData)
        console.log(field, value, newLoginData);
    }
    const handleLoginSubmit = e => {
        e.preventDefault()
        loginUser(loginData.email, loginData.password, location, history)
    }
    const handleGoogleSignIn = () => {
        signInGoogle(location, history)
    }


    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>Login</Typography>
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name='email'
                            onChange={handleOnChange}

                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name='password'
                            onChange={handleOnChange}
                            variant="standard" />

                        <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained">Login</Button>
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/register">
                            <Button variant="text">New User? Please Register</Button>
                        </NavLink>
                        {isLoading && <LinearProgress />}
                        {user.email && <Alert severity="success">User Crreated SuccesFully</Alert>
                        }
                        {
                            error && <Alert severity="error">{error}</Alert>

                        }
                    </form>
                    <Button onClick={handleGoogleSignIn} variant='contained'>Google Sign In</Button>
                    <p>------------------------</p>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={login} alt="" />
                </Grid>
            </Grid>
        </Container>

    );
};

export default Login;