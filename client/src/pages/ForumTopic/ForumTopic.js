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
        API.getForumTopics(id).then(res => {
            console.log(res.data);
            const currentForumPosts = res.data.recentTopics;
            const recentReplies = res.data.recentReplies;

            if(id === "0" || id === "1" || id === "2" || id === "3" || id === "4" || id === "5" || id === "6" || id === "7" || id === "8" || id === "9" || id === "10"){
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
    }, [id]);

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
            {console.log(state)}
            <Column>
                <div className="column is-2">
                    <Box>
                        <aside className="menu has-text-centered">
                            {
                                state.currentForumPosts.topics.length !== 0 &&
                                <button onClick={handleStartForumTopic} className="button is-info is-rounded">Start new topic</button>
                            }

                            <br/>
                            <br/>

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
                                        <button onClick={handleStartForumTopic} className="button is-info is-rounded">Start new topic</button>
                                    </div>
                                </Column>
                            </div>
                        }
                    </Box>
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

export default ForumTopic;