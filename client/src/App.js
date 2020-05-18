import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { ProjectProvider } from "./utils/Store";

function App() {
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
        <Footer/>
      </Router>
    </ProjectProvider>
  );
}

export default App;
