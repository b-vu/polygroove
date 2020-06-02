import React, { useEffect } from "react";
import "./Forums.css";
import { Link } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";
import ForumTopicCard from "../../components/ForumTopicCard/ForumTopicCard";
import ReplyCard from "../../components/ReplyCard/ReplyCard";

const Forums = () => {
    const [state, dispatch] = useProjectContext();

    useEffect(() => {
        API.getAllForums().then(res => {
            const forumPosts = res.data;

            API.getAllPosts().then(response => {
                const recentPosts = response.data;
                dispatch({
                    type: "UPDATE_FORUM_POSTS",
                    forumPosts: forumPosts,
                    recentPosts: recentPosts,
                    startForumTopic: false
                });
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
                        <h1 className="title has-text-centered">Welcome to the Forums</h1>
                        <Column>
                            <div className="column is-6">
                                <h1 className="title has-text-centered">Recent Topics</h1>
                                {
                                    state.forumPosts.length &&

                                    state.forumPosts.map((post, index) =>
                                        <ForumTopicCard
                                            key={index}
                                            name={post.name}
                                            id={post.id}
                                            title={post.title}
                                            date={post.date}
                                            postID={post.postID}
                                            userName={post.userName}
                                        />
                                    )
                                }
                            </div>
                            <div className="column is-6">
                                <h1 className="title has-text-centered">Recent User Posts</h1>
                                {
                                    state.recentPosts.length !== 0
                                    ?
                                    state.recentPosts.map((post, index) =>
                                        post.posts.length !== 0 &&
                                        <ReplyCard
                                            key={index}
                                            name={post.name}
                                            body={post.posts.length && post.posts[post.posts.length - 1].body}
                                            id={post.id}
                                            title={post.title}
                                            date={post.posts.length && post.posts[post.posts.length - 1].date}
                                            postID={post.postID}
                                            userName={post.posts.length && post.posts[post.posts.length - 1].userName}
                                        />
                                    )
                                    :
                                    null
                                }
                            </div>
                        </Column>
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

export default Forums;