import React, { useEffect } from "react";
import "./Forums.css";
import { Link } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";
import ForumTopicCard from "../../components/ForumTopicCard/ForumTopicCard";

const Forums = () => {
    const [state, dispatch] = useProjectContext();

    useEffect(() => {
        API.getAllForums().then(res => {
            console.log(res.data);
            dispatch({
                type: "UPDATE_FORUM_POSTS",
                forumPosts: res.data
            });
        });
    }, []);

    return(
        <Box>
            {console.log(state)}
            <Column>
                <div className="column is-2">
                    <Box>
                        <aside className="menu has-text-centered">
                            <p className="menu-label">
                                Your Account Stats
                            </p>
                            <ul className="menu-list">
                                
                            </ul>

                            <br/>

                            <p className="menu-label">
                                Your Recent Forum Topics
                            </p>
                            <ul className="menu-list">
                                
                            </ul>

                            <br/>

                            <p className="menu-label">
                                Your Recent Forum Posts
                            </p>
                            <ul className="menu-list">
                                
                            </ul>
                        </aside>
                    </Box>            
                </div>

                <div className="column is-8">
                    <Box>
                        <h1 className="title has-text-centered">Welcome to the Forums</h1>
                        <Column>
                            <div className="column is-6">
                                <h1 className="title has-text-centered">Recent Topics</h1>
                                <ForumTopicCard></ForumTopicCard>
                            </div>
                            <div className="column is-6">
                                <h1 className="title has-text-centered">Recent User Posts</h1>
                                <ForumTopicCard></ForumTopicCard>
                            </div>
                        </Column>
                    </Box>
                </div>

                <div className="column is-2">
                    <Box>
                        <aside className="menu has-text-centered">
                            <p className="menu-label">
                                Genre Discussions
                            </p>
                            <ul className="menu-list">
                                
                            </ul>

                            <br/>

                            <p className="menu-label">
                                Miscellaneous
                            </p>
                            <ul className="menu-list">
                                
                            </ul>
                        </aside>
                    </Box>            
                </div>

            </Column>
        </Box>
    );
}

export default Forums;