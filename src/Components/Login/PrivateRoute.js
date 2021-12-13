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
  
const PrivateRoute = ({ children, ...rest }) => {
    const {user,isLoading}=useAuth()
    if(isLoading){
        return <LinearProgress />
    }
    return (
        <Route
      {...rest}
      render={({ location }) =>
        user?.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;