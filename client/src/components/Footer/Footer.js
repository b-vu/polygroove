import React from "react";
import "./Footer.css";

const Footer = () => {
    return(
        <footer className="footer level">
            <div className="has-text-centered level-item">
                <a className="link level-item" href="https://github.com/b-vu">
                    <i className="fab fa-github"></i>
                </a>
                    &nbsp;
                    &nbsp;
                <a className="link level-item" href="/">
                    <i className="fab fa-linkedin"></i>
                </a>
                    &nbsp;
                    &nbsp;
                <a className="link level-item" href="mailto:brianvu7@gmail.com">
                    <i className="fas fa-envelope level-item"></i>
                    <p className="small-text level-item">&nbsp;brianvu7@gmail.com</p>
                </a>
                    {/* &nbsp; */}
                {/* <span className="small-text level-item">&copy; Brian Vu &nbsp;</span> */}
            </div>
        </footer>
    );
}

export default Footer;