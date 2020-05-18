import React from "react";
import "./Banner.css";

const Banner = (props) => {
    const { title, subtitle, subtitle2 } = props;
    return(
        <section className="hero is-info is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            {title}
                        </h1>
                        <h2 className="subtitle">
                            {subtitle}
                        </h2>
                        {
                            subtitle2
                            ? <h2 className="subtitle">
                                {subtitle2}
                              </h2>
                            : null
                        }
                    </div>
                </div>
        </section>
    );
}

export default Banner;