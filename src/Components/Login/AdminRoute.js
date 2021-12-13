import { LinearProgress } from '@mui/material';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";
import useAuth from './useAuth';
  
const AdminRoute = ({ children, ...rest }) => {
    const {user,isLoading,admin}=useAuth()
    if(isLoading){
        return <LinearProgress />
    }
    return (
        <Route
      {...rest}
      render={({ location }) =>
        user?.email && admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default AdminRoute;