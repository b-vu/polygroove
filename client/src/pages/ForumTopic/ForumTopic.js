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
            const currentForumPosts = res.data;

            API.getArtistOnly(id, state.token).then(res => {
                if(currentForumPosts){
                    dispatch({
                        type: "UPDATE_CURRENT_FORUM_POSTS",
                        name: res.data.name,
                        id: res.data.id,
                        image: res.data.images[0].url,
                        posts: res.data
                    });
                }
                else{
                    dispatch({
                        type: "UPDATE_CURRENT_FORUM_POSTS",
                        name: res.data.name,
                        id: res.data.id,
                        image: res.data.images[0].url,
                        posts: []
                    });
                }
            })
        })
    }, [id]);

    return(
        <Box>
            {console.log(state)}
            <Column>
                <div className="column is-2">
                    <Box>
                        <aside className="menu has-text-centered">
                            <button className="button is-info is-rounded">Start new topic</button>

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
                        <h1 className="title has-text-centered">{state.currentForumPosts.name} Forums</h1>
                        {
                            state.currentForumPosts.length
                            ?
                            <ForumTopicCard></ForumTopicCard>
                            :
                            <div className="has-text-centered">
                                <Column>
                                    <div className="column is-3">
                                        <figure className="image artist-image">
                                            <img src={state.currentForumPosts.image}/>
                                        </figure>
                                    </div>
                                    <div className="column is-9">
                                        <h1 className="title">There are currently no forum discussions. Be the first to start one!</h1>
                                        <br/>
                                        <br/>
                                        <button className="button is-info is-rounded">Start new topic</button>
                                    </div>
                                </Column>
                            </div>
                        }
                    </Box>
                </div>
            </Column>
        </Box>
    );
}

export default ForumTopic;