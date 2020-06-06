import React, { useEffect } from "react";
import "./Home.css";
import API from "../../utils/API";
import { useProjectContext } from "../../utils/Store";
import Box from "../../components/Box/Box";

const Home = () => {
    const [state, dispatch] = useProjectContext();

    useEffect(() => {
        API.getToken().then(res => {
            dispatch({
                type: "UPDATE_TOKEN",
                token: res.data.access_token
            });
        })
    }, []);

    return( 
        <Box>
            <div className="tile is-ancestor">
                {console.log(state)}
                <div className="tile is-vertical is-8">
                    <div className="tile">
                    <div className="tile is-parent is-vertical">
                        <article className="tile is-child notification is-success">
                        <p className="title">Welcome!</p>
                        <p className="subtitle">The only website you need for all things Music</p>
                        </article>
                        <article className="tile is-child notification is-warning">
                        <p className="title">Recent Forum Posts</p>
                        <p className="subtitle">Bottom tile</p>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-info">
                        <p className="title">Current Top Songs</p>
                        <p className="subtitle">With an image</p>
                        <figure className="image is-4by3">
                            <img src="https://bulma.io/images/placeholders/640x480.png"/>
                        </figure>
                        </article>
                    </div>
                    </div>
                    <div className="tile is-parent">
                    <article className="tile is-child notification is-danger">
                        <p className="title">Contact Me</p>
                        <p className="subtitle">Aligned with the right tile</p>
                        <div className="content">

                        </div>
                    </article>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child notification is-primary">
                    <div className="content">
                        <p className="title">Recent Reviews</p>
                        <p className="subtitle">With even more content</p>
                        <div className="content">

                        </div>
                    </div>
                    </article>
                </div>
            </div>
        </Box>
    );
}

export default Home;