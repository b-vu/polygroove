import React, { useEffect } from "react";
import "./ForumTopicsAndPosts.css";
import { Link, useParams } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";

const ForumTopicsAndPosts = () => {
    const [state, dispatch] = useProjectContext();
    const { id, postID } = useParams();

    useEffect(() => {
        if(state.forumPosts.length){
            checkIfForumCollectionIsEmpty();
        }
        else{
            API.getAllForums().then(res => {
                dispatch({
                    type: "UPDATE_FORUM_POSTS",
                    forumPosts: res.data
                });
            });
        }
    }, [state.forumPosts]);

    const startNewForumCollection = () => {
        const forum = {
            name: state.currentForumPosts.name,
            id: state.currentForumPosts.id,
            topics: [{
                userID: state.user.id,
                userName: state.user.name,
                title: state.currentForumTopic.title,
                body: state.currentForumTopic.body,
                postID: parseInt(postID)
            }],
            posts: []
        }

        if(state.currentForumPosts.name.length){
            API.addForum(id, forum).then(res => {
                console.log(res);
            });
        }
        else{
            return;
        }
    }

    const checkIfForumCollectionIsEmpty = () => {
        for(const topic of state.forumPosts){
            if(id === topic.id){
                return displayTopic();
            }
        }

        return startNewForumCollection();
    }

    const displayTopic = () => {
        console.log("display forum topic");
        API.getSpecificTopic(id, postID).then(res => {
            console.log(res);
            if(res.data !== null){
                dispatch({
                    type: "UPDATE_CURRENT_FORUM_TOPIC",
                    title: res.data.topics[postID].title,
                    body: res.data.topics[postID].body
                });
            }
            else{
                const topic = {
                    userID: state.user.id,
                    userName: state.user.name,
                    title: state.currentForumTopic.title,
                    body: state.currentForumTopic.body,
                    postID: postID
                }
                API.addForumTopic(id, postID, topic).then(res => {
                    console.log(res);
                });
            }
        });
    }

    return(
        <Box>
            {console.log(state)}
            <Column>
                <div className="column is-2">
                    <Box>
                        <aside className="menu has-text-centered">


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
                        <h1 className="title has-text-centered">{state.currentForumTopic.title}</h1>
                        <p className="has-text-centered">{state.currentForumTopic.body}</p>
                    </Box>
                </div>
            </Column>
        </Box>
    );
}

export default ForumTopicsAndPosts;