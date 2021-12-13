import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Alert } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { Grid } from '@mui/material';
import login from '../../img/login.png'
import { NavLink, useHistory, useLocation, } from 'react-router-dom';
import useAuth from './useAuth';

const Register = () => {
    const { user, registerUser, isLoading, error } = useAuth()
    const [loginData, setLoginData] = useState({})
    const location = useLocation()
    const history = useHistory()
    const handleOnBlur = e => {
        const field = e.target.name
        const value = e.target.value
        const newLoginData = { ...loginData }
        newLoginData[field] = value
        setLoginData(newLoginData)
    }
    const handleLoginSubmit = e => {
        e.preventDefault()
        if (loginData.password !== loginData.password2) {
            alert('not Match')
            return
        }
        registerUser(loginData.email, loginData.password,loginData.name,location,history)
    }



    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>Register</Typography>
                    {!isLoading && <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your name"
                            name='name'
                           
                            onBlur={handleOnBlur}

                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name='email'
                            onBlur={handleOnBlur}

                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name='password'
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Re Your Password"
                            type="password"
                            name='password2'
                            onBlur={handleOnBlur}
                            variant="standard" />

                        <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained">Login</Button>
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/register">
                            <Button variant="text">New User? Please Register</Button>
                        </NavLink>

                    </form>}
                    {isLoading && <LinearProgress />}
                    {user.email && <Alert severity="success">User Crreated SuccesFully</Alert>
                    }
                    {
                        error && <Alert severity="error">{error}</Alert>
                    }
                    <p>------------------------</p>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={login} alt="" />
                </Grid>
            </Grid>
        </Container>

    );
};

export default Register;