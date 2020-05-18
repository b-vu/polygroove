import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { ProjectProvider } from "./utils/Store";


import PrivateRoute from "./components/Private-Route/PrivateRoute";
import Feed from "./pages/Feed/Feed";

const App = () => {
  return (
    <ProjectProvider>
      <Router>
        <Nav/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
        </Switch>
        <Switch>
          <PrivateRoute exact path="/feed" component={Feed} />
        </Switch>
        <Footer/>
      </Router>
    </ProjectProvider>
  );
}

export default App;
