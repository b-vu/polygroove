import React, { useEffect } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";

import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

const Nav = () => {
    const [state, dispatch] = useProjectContext();

    document.addEventListener('DOMContentLoaded', () => {

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      
        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

          // Add a click event on each of them
          $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {
      
              // Get the target from the "data-target" attribute
              const target = el.dataset.target;
              const $target = document.getElementById(target);
      
              // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
              el.classList.toggle('is-active');
              $target.classList.toggle('is-active');
      
            });
          });
        }
    });

    const logoutUser = () => {
        // Remove token from local storage
        localStorage.removeItem("jwtToken");
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to empty object {} which will set isAuthenticated to false
        dispatch({
        type: "SET_CURRENT_USER",
        payload: {}
        });
    };

    useEffect(() => {
        // Check for token to keep user logged in
        if (localStorage.jwtToken) {
            // Set auth token header auth
            const token = localStorage.jwtToken;
            setAuthToken(token);
            // Decode token and get user info and exp
            const decoded = jwt_decode(token);
            // Set user and isAuthenticated
            dispatch({
                type: "SET_CURRENT_USER",
                payload: decoded
            });
            // Check for expired token
            const currentTime = Date.now() / 1000; // to get in milliseconds
            if (decoded.exp < currentTime) {
                // Logout user
                logoutUser();
                // Redirect to login
                window.location.href = "./login";
            }
        }
    }, []);

    const handleNavbarSearchChange = event => {
        const { name, value } = event.target;

        const parsedValue = value.trim().toLowerCase();

        dispatch({
            type: "UPDATE_NAVBAR_SEARCH",
            [name]: parsedValue
        });
    }

    const handleSearchDisplayChange = event => {
        const { name } = event.target;

        dispatch({
            type: "UPDATE_SEARCH_DISPLAY",
            searchDisplay: name
        });
    }

    return(
        <div>
            <nav className="navbar is-success" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to={"/"}>
                        <div className="navbar-item" >
                            <p id="name"><strong>Project3</strong></p>
                        </div>
                    </Link>
                
                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <p className="navbar-item">
                            <Link to={"/"}
                                className="navlink"
                            >
                                Home
                            </Link>
                        </p>
                    
                        <p className="navbar-item">
                            <Link to={"/charts"}
                                className="navlink"
                            >
                                Charts
                            </Link>
                        </p>

                        <p className="navbar-item">
                            <Link to={"/feed"}
                                className="navlink"
                            >
                                Feed
                            </Link>
                        </p>

                        <p className="navbar-item">
                            <Link to={"/forums"}
                                className="navlink"
                            >
                                Forums
                            </Link>
                        </p>

                        <form className="field navbar-item nav-search control">
                            <input name="navbarSearch" onChange={handleNavbarSearchChange} className="input is-rounded is-success" type="text" placeholder="Search for artists, albums, or tracks"/>
                            &nbsp;

                            <div className="dropdown is-hoverable">
                                <div className="dropdown-trigger">
                                    <a className="button is-rounded is-normal is-success" aria-haspopup="true" aria-controls="dropdown-menu4">
                                    <span>{state.searchDisplay}</span>
                                    <span className="icon is-small">
                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                    </a>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                                    <div className="dropdown-content">
                                        <a href="#" className="dropdown-item" onClick={handleSearchDisplayChange} name="Artist">
                                            Search Artists
                                        </a>
                                        <a href="#" className="dropdown-item" onClick={handleSearchDisplayChange} name="Album">
                                            Search Albums
                                        </a>
                                        <a href="#" className="dropdown-item" onClick={handleSearchDisplayChange} name="Track">
                                            Search Tracks
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <Link to={"/search/" + state.navbarSearch}>
                                <button className="button is-success">
                                    <i className="fas fa-search"></i>
                                </button>
                            </Link>
                        </form>
                    </div>

                    <div className="navbar-end">
                        {
                            state.isAuthenticated
                            ?
                            <p className="navbar-item">
                                Welcome, {state.user.name}! &nbsp; | &nbsp;
                                <Link to={"/"}
                                    onClick={logoutUser}
                                    className="navlink"
                                >
                                    Logout
                                </Link>
                            </p>
                            :
                            <p className="navbar-item">
                            <Link to={"/register"}
                                className="navlink"
                            >
                                Register/Login
                            </Link>
                        </p>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Nav;