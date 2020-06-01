import React, { useEffect } from "react";
import "./ForumTopicsAndPosts.css";
import { Link, useParams } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";
import ForumReply from "../../components/ForumReply/ForumReply";

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
                postID: postID
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
        API.getSpecificTopic(id, postID).then(res => {
            console.log(res)
            if(res.data !== null){
                dispatch({
                    type: "UPDATE_CURRENT_FORUM_TOPIC",
                    title: res.data.topics[parseInt(postID)].title,
                    body: res.data.topics[parseInt(postID)].body,
                    userName: res.data.topics[parseInt(postID)].userName,
                    userID: res.data.topics[parseInt(postID)].userID,
                    date: res.data.topics[parseInt(postID)].date,
                    posts: res.data.topics[parseInt(postID)].posts,
                    id: res.data._id,
                    postID: res.data.topics[parseInt(postID)]._id
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
                API.addForumTopic(id, topic).then(res => {
                    API.getSpecificTopic(id, postID).then(res => {
                        dispatch({
                            type: "UPDATE_CURRENT_FORUM_TOPIC",
                            title: res.data.topics[parseInt(postID)].title,
                            body: res.data.topics[parseInt(postID)].body,
                            userName: res.data.topics[parseInt(postID)].userName,
                            userID: res.data.topics[parseInt(postID)].userID,
                            date: res.data.topics[parseInt(postID)].date,
                            posts: res.data.topics[parseInt(postID)].posts,
                            id: res.data._id,
                            postID: res.data.topics[parseInt(postID)]._id
                        });
                    });
                });
            }
        });
    }

    const handleReplyChange = event => {
        const { value } = event.target;

        const parsedValue = value.trim();
        
        dispatch({
            type: "UPDATE_FORUM_REPLY",
            forumReply: parsedValue
        })
    }

    const addReply = () => {
        if(state.forumReply.length){
            const reply = {
                userID: state.user.id,
                userName: state.user.name,
                body: state.forumReply
            }
            API.addReply(state.currentForumTopic.id, state.currentForumTopic.postID, reply).then(res => {
                API.getSpecificTopic(id, postID).then(res => {
                    dispatch({
                        type: "UPDATE_CURRENT_FORUM_TOPIC",
                        title: res.data.topics[parseInt(postID)].title,
                        body: res.data.topics[parseInt(postID)].body,
                        userName: res.data.topics[parseInt(postID)].userName,
                        userID: res.data.topics[parseInt(postID)].userID,
                        date: res.data.topics[parseInt(postID)].date,
                        posts: res.data.topics[parseInt(postID)].posts,
                        id: res.data._id,
                        postID: res.data.topics[parseInt(postID)]._id,
                        forumReply: ""
                    });
                });
            });
        }
        else{
            return;
        }
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
                        <h1 className="title">{state.currentForumTopic.title}</h1>
                        <p className="">{state.currentForumTopic.body}</p>
                        <br/>
                        <p className="forum-subtext">Posted by {state.currentForumTopic.userName} on {state.currentForumTopic.date}</p>
                    </Box>
                        {
                            state.currentForumTopic.posts.length === 0
                            ?
                            <Column>
                                <div className="column is-2"/>
                                <div className="column is-8">
                                    <h1 className="title has-text-centered">No replies yet. Be the first!</h1>
                                    <div className="field">
                                        <div className="control">
                                            <textarea onChange={handleReplyChange} className="textarea is-info" placeholder="Reply"></textarea>
                                        </div>
                                    </div>
                                    <button onClick={addReply} className="button is-info is-rounded">Post</button>
                                </div>
                                <div className="column is-2"/>
                            </Column>
                            :
                            null
                        }
                        {
                            state.currentForumTopic.posts.length !== 0 &&
                            <div>
                                {
                                state.currentForumTopic.posts.map((post, index) =>
                                    <ForumReply
                                        key={index}
                                        userID={post.userID}
                                        userName={post.userName}
                                        body={post.body}
                                        date={post.date}
                                    />
                                )
                                }
                                <br/>
                                <Column>
                                    <div className="column is-2"/>
                                    <div className="column is-8">
                                        <div className="field">
                                            <div className="control">
                                                <textarea onChange={handleReplyChange} className="textarea is-info" placeholder="Reply"></textarea>
                                            </div>
                                        </div>
                                        <button onClick={addReply} className="button is-info is-rounded">Post</button>
                                    </div>
                                    <div className="column is-2"/>
                                </Column>
                            </div>
                        }
                </div>
            </Column>
        </Box>
    );
}

export default ForumTopicsAndPosts;