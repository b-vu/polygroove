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
import Favorites from "./pages/Favorites/Favorites";
import Artist from "./pages/Artist/Artist";
import Album from "./pages/Album/Album";
import Track from "./pages/Track/Track";
import Search from "./pages/Search/Search";
import ForumTopic from "./pages/ForumTopic/ForumTopic";
import ForumTopicsAndPosts from "./pages/ForumTopicsAndPosts/ForumTopicsAndPosts";
import User from "./pages/User/User";
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
          <PrivateRoute exact path="/favorites" component={Favorites}/>
          <Route exact path="/artist/:name/:id" component={Artist}/>
          <Route exact path="/album/:id" component={Album}/>
          <Route exact path="/track/:name/:id" component={Track}/>
          <Route exact path="/search/:search" component={Search}/>
          <Route exact path="/forums/:id" component={ForumTopic}/>
          <Route exact path="/topic/:id/:postID" component={ForumTopicsAndPosts}/>
          <Route exact path="/user/:id" component={User}/>
          <Route component={Home}/>
        </Switch>
        <Footer/>
      </Router>
    </ProjectProvider>
  );
}

export default App;
