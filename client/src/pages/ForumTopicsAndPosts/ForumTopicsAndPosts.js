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
                const forumPosts = res.data;

                API.getAllPosts().then(res => {
                    const recentPosts = res.data;
                    dispatch({
                        type: "UPDATE_FORUM_POSTS",
                        forumPosts: forumPosts,
                        recentPosts: recentPosts,
                        startForumTopic: false
                    });
                });
            });
        }
    }, [state.forumPosts]);

    const startNewForumCollection = () => {
        const forum = {
            name: state.currentForumPosts.name,
            id: state.currentForumPosts.id,
            userID: state.user.id,
            userName: state.user.name,
            title: state.currentForumTopic.title,
            body: state.currentForumTopic.body,
            postID: postID,
            posts: []
        }

        if(state.currentForumPosts.name.length){
            API.addForum(id, forum).then(res => {
                dispatch({
                    type: "UPDATE_CURRENT_FORUM_TOPIC",
                    name: res.data.name,
                    title: res.data.title,
                    body: res.data.body,
                    userName: res.data.userName,
                    userID: res.data.userID,
                    date: res.data.date,
                    posts: res.data.posts,
                    id: res.data._id,
                    postID: res.data.postID,
                    forumReply: ""
                });
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
            if(res.data !== null){
                dispatch({
                    type: "UPDATE_CURRENT_FORUM_TOPIC",
                    name: res.data.name,
                    title: res.data.title,
                    body: res.data.body,
                    userName: res.data.userName,
                    userID: res.data.userID,
                    date: res.data.date,
                    posts: res.data.posts,
                    id: res.data._id,
                    postID: res.data.postID,
                    forumReply: ""
                });
            }
            else{
                const forum = {
                    name: state.currentForumPosts.name,
                    id: state.currentForumPosts.id,
                    userID: state.user.id,
                    userName: state.user.name,
                    title: state.currentForumTopic.title,
                    body: state.currentForumTopic.body,
                    postID: postID,
                    posts: []
                }
                API.addForum(id, forum).then(res => {
                    API.getSpecificTopic(id, postID).then(res => {
                        dispatch({
                            type: "UPDATE_CURRENT_FORUM_TOPIC",
                            name: res.data.name,
                            title: res.data.title,
                            body: res.data.body,
                            userName: res.data.userName,
                            userID: res.data.userID,
                            date: res.data.date,
                            posts: res.data.posts,
                            id: res.data._id,
                            postID: res.data.postID,
                            forumReply: ""
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
        if(state.isAuthenticated){
            if(state.forumReply.length){
                const reply = {
                    userID: state.user.id,
                    userName: state.user.name,
                    body: state.forumReply
                }

                document.getElementById("replyTextarea").value = "";

                API.addReply(state.currentForumTopic.id, state.currentForumTopic.postID, reply).then(res => {
                    API.getSpecificTopic(id, postID).then(res => {
                        dispatch({
                            type: "UPDATE_CURRENT_FORUM_TOPIC",
                            name: res.data.name,
                            title: res.data.title,
                            body: res.data.body,
                            userName: res.data.userName,
                            userID: res.data.userID,
                            date: res.data.date,
                            posts: res.data.posts,
                            id: res.data._id,
                            postID: res.data.postID,
                            forumReply: ""
                        });
                    });
                });
            }
            else{
                return;
            }
        }
        else{
            window.location.assign("/register");
        }
    }

    const formatDate = time => {
        if(time === undefined){
            return;
        }

        const arr = time.split("T");
        const dateArr = arr[0].split("-")
        
        let month = parseInt(dateArr[1]);
        let day = parseInt(dateArr[2]);

        const times = arr[1].split(":");
        const minute = times[1];

        let meridian = "AM";

        let hour = parseInt(times[0]);
        hour -=5;
        
        if(hour > 11){
            hour -= 12;
            meridian = "PM"
            if(hour === 0){
                hour = 12;
            }
        }

        else{
            switch(hour){
                case 0:
                    meridian = "AM"
                    hour = 12;
                    break;
                case -1:
                    meridian = "PM"
                    hour = 11;
                    day -= 1;
                    break;
                case -2:
                    meridian = "PM"
                    hour = 10;
                    day -= 1;
                    break;
                case -3:
                    meridian = "PM"
                    hour = 9;
                    day -= 1;
                    break;
                case -4:
                    meridian = "PM"
                    hour = 8;
                    day -= 1;
                    break;
                case -5:
                    meridian = "PM"
                    hour = 7;
                    day -= 1;
                    break;
                default:
                    break;
            }
        }

        const newDate = month + "-" + day + "-" + dateArr[0];
        return(hour + ":" + minute + " " + meridian + ", " + newDate);
    }

    return(
        <Box>
            {console.log(state)}
            <Column>
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

                <div className="column is-8">
                    <Box>
                        <h1 className="title">{state.currentForumTopic.title}</h1>
                        <p className="">{state.currentForumTopic.body}</p>
                        <br/>
                        <p className="forum-subtext">Posted by {state.currentForumTopic.userName} in <Link to={`/forums/${id}`}>{state.currentForumTopic.name}</Link> at {state.currentForumTopic.date.length !== 0 && formatDate(state.currentForumTopic.date)}</p>
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
                                            <textarea onChange={handleReplyChange} id="replyTextarea" className="textarea is-info" placeholder="Reply"></textarea>
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
                                        name={state.currentForumTopic.name}
                                        id={id}
                                        userID={post.userID}
                                        userName={post.userName}
                                        body={post.body}
                                        date={post.date}
                                        postNumber={(index + 1)}
                                    />
                                )
                                }
                                <br/>
                                <Column>
                                    <div className="column is-2"/>
                                    <div className="column is-8">
                                        <div className="field">
                                            <div className="control">
                                                <textarea onChange={handleReplyChange} id="replyTextarea" className="textarea is-info" placeholder="Reply"></textarea>
                                            </div>
                                        </div>
                                        <button onClick={addReply} className="button is-info is-rounded">Post</button>
                                    </div>
                                    <div className="column is-2"/>
                                </Column>
                            </div>
                        }
                </div>

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
            </Column>
        </Box>
    );
}

export default ForumTopicsAndPosts;