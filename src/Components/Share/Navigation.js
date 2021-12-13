import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import useAuth from '../Login/useAuth';


const Navigation = () => {
    const { user, logOut } = useAuth()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Doctors Portal
                    </Typography>
                    <Link to="/home"><Button style={{ textDecoration: 'none', color: 'white' }} color="inherit">Home</Button></Link>
                    <Link to="/appointment"><Button style={{ textDecoration: 'none', color: 'white' }} color="inherit">Appointment</Button></Link>
                    {
                        user?.email ?
                            <Box>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to="/dashbord"><Button color="inherit">Deshbord</Button></Link>
                                <Button onClick={logOut} color='inherit'>Logout</Button>
                            </Box> :
                            <Link style={{ textDecoration: 'none', color: 'white' }} to="/login"><Button color="inherit">Login</Button></Link>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;