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
        dispatch({
            type: "UPDATE_NAV",
            navState: "is-warning"
        });

        if(!state.token.length){
            API.getToken().then(res => {
                dispatch({
                    type: "UPDATE_TOKEN",
                    token: res.data.access_token
                });
            });
        }

        if(state.isAuthenticated){
            API.getUserInfo(state.user.id).then(userResponse => {
                let userReplies = [];
                for(const reply of userResponse.data.userReplies){
                    let replyObj = {
                        body: reply.body,
                        date: reply.date,
                        id: reply.id,
                        name: reply.name,
                        postID: reply.postID,
                        title: reply.title,
                        userID: reply.userID,
                        userName: reply.userName,
                        posts: []
                    };
                    for(const post of reply.posts){
                        if(post.userID === state.user.id){
                            replyObj.posts.push(post);
                        }
                    }
                    userReplies.push(replyObj);
                }

                dispatch({
                    type: "UPDATE_USER_INFO",
                    userTopics: userResponse.data.userTopics,
                    userReplies: userReplies
                });
            });
        }

        dispatch({
            type: "UPDATE_EDITS",
            editTopic: false
        });

        dispatch({
            type: "UPDATE_FORUM_REPLY",
            forumReply: ""
        });

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
    }, [state.forumPosts, state.isAuthenticated, id, postID, state.currentForumTopic.posts.length, state.editPost]);

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
        });
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

    const deleteTopic = () => {
        API.deleteTopic(id, postID).then(res => {
            window.location.assign("/forums");
        });
    }

    const updateEditTopic = () => {
        dispatch({
            type: "UPDATE_EDIT_TOPIC",
            editTopic: !state.editTopic
        });
    }

    const handleEditTopic = event => {
        const { name, value } = event.target;
  
        dispatch({
            type: "UPDATE_CURRENT_FORUM_TOPIC_FORM",
            name: name,
            value: value
        });
    }

    const editTopic = () => {
        API.editTopic(id, postID, { body: state.currentForumTopic.body, title: state.currentForumTopic.title }).then(res => {
            dispatch({
                type: "UPDATE_CURRENT_FORUM_TOPIC_FORM",
                title: state.currentForumTopic.body,
                body: state.currentForumTopic.title
            });
            dispatch({
                type: "UPDATE_EDIT_TOPIC",
                editTopic: !state.editTopic
            });
        });
    }

    const updateEditPost = event => {
        const editPostNumber = event.currentTarget.getAttribute("data-value");

        dispatch({
            type: "UPDATE_EDIT_POST",
            editPost: !state.editPost,
            editPostNumber: editPostNumber
        });
    }

    const handleEditPost = event => {
        const { value } = event.target;
        
        dispatch({
            type: "UPDATE_FORUM_REPLY",
            forumReply: value
        });
    }

    const editReply = replyID => {
        if(state.forumReply.length){
            API.editReply(state.currentForumTopic.id, replyID, { userID: state.user.id, userName: state.user.name, body: state.forumReply }).then(res => {
                dispatch({
                    type: "UPDATE_EDIT_POST",
                    editPost: !state.editPost,
                    forumReply: ""
                });
            });
        }
        else{
            return;
        }
    }

    return(
        <Box>
            <Column>
                <div className="column is-2">
                    <Box>
                        <aside className="menu">
                            <p className="menu-label">
                                Genre Discussions
                            </p>
                            <ul className="menu-list">
                                <Link to={"/forums/Hip Hop"}>Hip Hop</Link>
                                <Link to={"/forums/Pop"}>Pop</Link>
                                <Link to={"/forums/Indie"}>Indie</Link>
                                <Link to={"/forums/Country"}>Country</Link>
                                <Link to={"/forums/Rock"}>Rock</Link>
                                <Link to={"/forums/Kpop"}>Kpop</Link>
                                <Link to={"/forums/EDM"}>EDM</Link>
                                <Link to={"/forums/Jazz"}>Jazz</Link>
                                <Link to={"/forums/Latin"}>Latin</Link>
                                <Link to={"/forums/Metal"}>Metal</Link>
                            </ul>

                            <p className="menu-label">
                                Miscellaneous
                            </p>
                            <ul className="menu-list">
                            <Link to={"/forums/General"}>General</Link>
                            </ul>
                        </aside>
                    </Box>            
                </div>

                <div className="column is-8">
                    <Box>
                        <h1 className="title">{state.currentForumTopic.title}</h1>
                        <p className="">{state.currentForumTopic.body}</p>
                        <br/>
                        <p className="forum-subtext">
                            Posted by <Link to={`/user/${state.currentForumTopic.userID}`}>{state.currentForumTopic.userName}</Link> in <Link to={`/forums/${id}`}>{state.currentForumTopic.name}</Link> at {state.currentForumTopic.date.length !== 0 && formatDate(state.currentForumTopic.date)}
                            {
                                (state.isAuthenticated && state.currentForumTopic.userID === state.user.id) &&
                                    <span><span onClick={updateEditTopic} className="forum-edit-button"> Edit </span> | <span onClick={deleteTopic} className="forum-delete-button"> Delete</span></span>
                            }
                        </p>
                    </Box>
                        {
                            state.editTopic &&

                            <div>
                                <label className="label">Title</label>
                                <div className="field">
                                    <div className="control">
                                        <input onChange={handleEditTopic} name="title" className="input is-warning" type="text" placeholder="Title" value={state.currentForumTopic.title}/>
                                    </div>
                                </div>
                
                                <label className="label">Body</label>
                                <div className="field">
                                    <div className="control">
                                    <textarea onChange={handleEditTopic} name="body" className="textarea is-warning" placeholder="Discuss here!" value={state.currentForumTopic.body}/>
                                    </div>
                                </div>

                                <button onClick={editTopic} className="button is-warning is-rounded">Edit</button>
                                <br/>
                                <br/>
                            </div>
                        }
                        {
                            state.currentForumTopic.posts.length === 0
                            ?
                            <Column>
                                <div className="column is-2"/>
                                <div className="column is-8">
                                    <h1 className="title has-text-centered">No replies yet. Be the first!</h1>
                                    <div className="field">
                                        <div className="control">
                                            <textarea onChange={handleReplyChange} id="replyTextarea" className="textarea is-warning" placeholder="Reply"></textarea>
                                        </div>
                                    </div>
                                    <button onClick={addReply} className="button is-warning is-rounded">Post</button>
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
                                        _id={post._id}
                                        postID={postID}
                                        displayTopic={displayTopic}
                                        updateEditPost={updateEditPost}
                                        handleEditPost={handleEditPost}
                                        editReply={editReply}
                                    />
                                )
                                }
                                <br/>
                                <Column>
                                    <div className="column is-2"/>
                                    <div className="column is-8">
                                        <div className="field">
                                            <div className="control">
                                                <textarea onChange={handleReplyChange} id="replyTextarea" className="textarea is-warning" placeholder="Reply"></textarea>
                                            </div>
                                        </div>
                                        <button onClick={addReply} className="button is-warning is-rounded">Post</button>
                                    </div>
                                    <div className="column is-2"/>
                                </Column>
                            </div>
                        }
                </div>

                <div className="column is-2">
                    <Box>
                        <aside className="menu">
                            <p className="menu-label has-text-centered">
                                Your Account Stats
                            </p>
                            <ul className="menu-list has-text-centered">
                                {
                                    state.isAuthenticated &&
                                    <div>
                                        {state.userInfo.userTopics.length} Topics
                                        <br/>
                                        <br/>
                                        {state.userInfo.userReplies.length} Replies
                                    </div>
                                }
                            </ul>

                            <br/>

                            <p className="menu-label has-text-centered">
                                Your Recent Forum Topics
                            </p>
                                {
                                    (state.isAuthenticated && state.userInfo.userTopics.length !== 0) &&
                                        state.userInfo.userTopics.map((topic, index) =>
                                            <div key={index}>
                                                <Link to={`/topic/${topic.id}/${topic.postID}`}>{topic.title}</Link>
                                            </div>
                                        )
                                }
                            <br/>

                            <p className="menu-label has-text-centered">
                                Your Recent Forum Posts
                            </p>
                                {
                                    (state.isAuthenticated && state.userInfo.userReplies.length !== 0) &&
                                        state.userInfo.userReplies.map((reply, index) =>
                                            <div key={index}>
                                                <Link to={`/topic/${reply.id}/${reply.postID}`}>{reply.posts[reply.posts.length - 1].body}</Link>
                                            </div>
                                        )
                                }
                        </aside>
                    </Box>            
                </div>
            </Column>
        </Box>
    );
}

export default ForumTopicsAndPosts;