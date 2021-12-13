import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home';
import Appointement from './Components/Appointement/Appointement';
import Login from '../../my-app/src/Components/Login/Login'
import Register from './Components/Login/Register';
import AuthProvider from './Components/Login/AuthProvider';
import PrivateRoute from './Components/Login/PrivateRoute';
import Deshbord from './Components/Appointement/Deshbord';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute path="/appointment">
              <Appointement />
            </PrivateRoute>
            <PrivateRoute path="/dashbord">
              <Deshbord />
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
          </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
