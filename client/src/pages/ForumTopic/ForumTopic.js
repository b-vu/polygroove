import React, { useEffect } from "react";
import "./ForumTopic.css";
import { Link, useParams } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";
import ForumTopicCard from "../../components/ForumTopicCard/ForumTopicCard";
import TopicForm from "../../components/TopicForm/TopicForm";
import ReplyCard from "../../components/ReplyCard/ReplyCard";

const ForumTopic = () => {
    const [state, dispatch] = useProjectContext();
    const { id } = useParams();

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
            editTopic: false,
            editPost: false
        });

        API.getForumTopics(id).then(res => {
            const currentForumPosts = res.data.recentTopics;
            const recentReplies = res.data.recentReplies;

            if(id === "General" || id === "Hip Hop" || id === "1" || id === "Pop" || id === "Indie" || id === "Country" || id === "Rock" || id === "Kpop" || id === "EDM" || id === "Jazz" || id === "Latin" || id === "Metal"){    
                if(currentForumPosts){
                    dispatch({
                        type: "UPDATE_CURRENT_FORUM_POSTS",
                        name: id,
                        id: id,
                        image: "https://i.imgur.com/QG1EfLP.jpg",
                        topics: currentForumPosts,
                        postID: currentForumPosts.length,
                        recentReplies: recentReplies,
                        startForumTopic: false
                    });
                }
                else{
                    dispatch({
                        type: "UPDATE_CURRENT_FORUM_POSTS",
                        name: id,
                        id: id,
                        image: "https://i.imgur.com/QG1EfLP.jpg",
                        topics: [],
                        postID: 0,
                        recentReplies: recentReplies,
                        startForumTopic: false
                    });
                }
            }
            else{
                API.getArtistOnly(id, state.token).then(res => {
                    if(currentForumPosts){
                        dispatch({
                            type: "UPDATE_CURRENT_FORUM_POSTS",
                            name: res.data.name,
                            id: res.data.id,
                            image: res.data.images[0].url,
                            topics: currentForumPosts,
                            postID: currentForumPosts.length,
                            recentReplies: recentReplies,
                            startForumTopic: false
                        });
                    }
                    else{
                        dispatch({
                            type: "UPDATE_CURRENT_FORUM_POSTS",
                            name: res.data.name,
                            id: res.data.id,
                            image: res.data.images[0].url,
                            topics: [],
                            postID: 0,
                            recentReplies: recentReplies,
                            startForumTopic: false
                        });
                    }
                })
            }
        })
    }, [id, state.isAuthenticated]);

    const handleStartForumTopic = () => {
        if(state.isAuthenticated){
            dispatch({
                type: "UPDATE_START_TOPIC",
                startForumTopic: !state.startForumTopic
            });
        }
        else{
            window.location.assign("/register");
        }
    }

    return(
        <Box>
            <Column>
                <div className="column is-2">
                    <Box>
                        <aside className="menu">
                            {
                                state.currentForumPosts.topics.length !== 0 &&
                                <div className="has-text-centered">
                                    <button onClick={handleStartForumTopic} className="button is-warning is-rounded">Start new topic</button>
                                </div>
                            }

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
                        {
                            state.startForumTopic &&
                            <TopicForm></TopicForm>
                        }
                        {
                            (state.currentForumPosts.topics.length !== 0 && !state.startForumTopic) &&
                            <div>
                            <Column>
                                <div className="column is-4">
                                    <figure className="image artist-image">
                                        <img src={state.currentForumPosts.image}/>
                                    </figure>
                                </div>
                                <div className="column is-8">
                                    <br/>
                                    <br/>
                                    <br/>
                                    <h1 className="title has-text-centered">{state.currentForumPosts.name} Forums</h1>
                                    <h1 className="title">Check out the community's topics and get involved in the discussion!</h1>
                                </div>
                            </Column>

                            <Column>
                            <div className="column is-6">
                                <h1 className="title has-text-centered">Recent Topics</h1>
                                {
                                    state.currentForumPosts.topics.map((topic, index) =>
                                        <ForumTopicCard
                                            key={index}
                                            name={state.currentForumPosts.name}
                                            id={state.currentForumPosts.id}
                                            title={topic.title}
                                            date={topic.date}
                                            postID={topic.postID}
                                            userName={topic.userName}
                                            userID={topic.userID}
                                        />
                                    )
                                }
                            </div>
                            <div className="column is-6">
                                <h1 className="title has-text-centered">Recent User Posts</h1>
                                {
                                    (state.currentForumPosts.recentReplies !== undefined && state.currentForumPosts.recentReplies.length !== 0) &&

                                    state.currentForumPosts.recentReplies.map((reply, index) =>
                                        reply.posts.length !== 0 &&
                                            <ReplyCard
                                                key={index}
                                                name={reply.name}
                                                body={reply.posts.length && reply.posts[reply.posts.length - 1].body}
                                                id={reply.id}
                                                title={reply.title}
                                                date={reply.posts.length && reply.posts[reply.posts.length - 1].date}
                                                postID={reply.postID}
                                                userName={reply.posts.length && reply.posts[reply.posts.length - 1].userName}
                                                userID={reply.posts.length && reply.posts[reply.posts.length - 1].userID}
                                            />
                                    )
                                }
                            </div>
                            </Column>
                            </div>
                        }
                        {
                            (state.currentForumPosts.topics.length === 0 && !state.startForumTopic) &&
                            <div className="has-text-centered">
                                <Column>
                                    <div className="column is-3">
                                        <figure className="image artist-image">
                                            <img src={state.currentForumPosts.image}/>
                                        </figure>
                                    </div>
                                    <div className="column is-9">
                                        <h1 className="title has-text-centered">{state.currentForumPosts.name} Forums</h1>
                                        <h1 className="title">There are currently no forum discussions. Be the first to start one!</h1>
                                        <br/>
                                        <br/>
                                        <button onClick={handleStartForumTopic} className="button is-warning is-rounded">Start new topic</button>
                                    </div>
                                </Column>
                            </div>
                        }
                    </Box>
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

export default ForumTopic;