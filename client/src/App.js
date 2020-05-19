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
import { ProjectProvider } from "./utils/Store";


import PrivateRoute from "./components/Private-Route/PrivateRoute";
import Feed from "./pages/Feed/Feed";

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
          <PrivateRoute exact path="/feed" component={Feed} />
          <Route component={Home}/>
        </Switch>
        {/* <Switch>
          <PrivateRoute exact path="/feed" component={Feed} />
        </Switch> */}
        <Footer/>
      </Router>
    </ProjectProvider>
  );
}

export default App;
