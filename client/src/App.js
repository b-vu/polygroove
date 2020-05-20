import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Charts from "./pages/Charts/Charts";
import Forums from "./pages/Forums/Forums";
import Feed from "./pages/Feed/Feed";
import Artist from "./pages/Artist/Artist";
import PrivateRoute from "./components/Private-Route/PrivateRoute";
import { ProjectProvider } from "./utils/Store";

const App = () => {
  return (
    <ProjectProvider>
      <Router>
        <Nav/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/charts" component={Charts}/>
          <Route exact path="/forums" component={Forums}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <PrivateRoute exact path="/feed" component={Feed}/>
          <Route exact path="/artist/:id" component={Artist}/>
          <Route component={Home}/>
        </Switch>
        <Footer/>
      </Router>
    </ProjectProvider>
  );
}

export default App;
