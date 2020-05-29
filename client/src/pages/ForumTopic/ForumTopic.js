import React, { useEffect } from "react";
import "./ForumTopic.css";
import { Link, useParams } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";
import ForumTopicCard from "../../components/ForumTopicCard/ForumTopicCard";

const ForumTopic = () => {
    const [state, dispatch] = useProjectContext();
    const { id } = useParams();

    useEffect(() => {
        API.getForumTopics(id).then(res => {
            console.log(res);
        })
    }, [id]);

    return(
        <Box>
            <Column>
                <div className="column is-2">
                    <Box>
                        <aside className="menu has-text-centered">
                            <button className="button is-info is-rounded">Start new Topic</button>

                            <br/>
                            <br/>

                            <p className="menu-label">
                                Recent Forum Posts
                            </p>
                            <ul className="menu-list">
                                
                            </ul>

                            <br/>

                            <p className="menu-label">
                                Recent Forum Topics
                            </p>
                            <ul className="menu-list">
                                
                            </ul>
                        </aside>
                    </Box>            
                </div>

                <div className="column is-8">
                    <Box>
                        <h1 className="title has-text-centered">{id} Forums</h1>
                        <ForumTopicCard></ForumTopicCard>
                    </Box>
                </div>
            </Column>
        </Box>
    );
}

export default ForumTopic;