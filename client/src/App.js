import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
