import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
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

    return(
        <div>
            <nav className="navbar is-info" role="navigation" aria-label="main navigation">
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
                        <Link to={"/"}>
                            <p className="navbar-item">
                                Home
                            </p>
                        </Link>
                    
                        <Link to={"/charts"}>
                            <p className="navbar-item">
                                Charts
                            </p>
                        </Link>

                        <Link to={"/feed"}>
                            <p className="navbar-item">
                                Feed
                            </p>
                        </Link>

                        <Link to={"/forums"}>
                            <p className="navbar-item">
                                Forums
                            </p>
                        </Link>

                        <Link to={"/register"}>
                            <p className="navbar-item">
                                Register
                            </p>
                        </Link>
                        <Link to={"/login"}>
                            <p className="navbar-item">
                                Login
                            </p>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Nav;