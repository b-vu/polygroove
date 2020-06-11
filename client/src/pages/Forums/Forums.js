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

        dispatch({
            type: "UPDATE_EDITS",
            editTopic: false,
            editPost: false
        });

        API.getAllForums().then(res => {
            const forumPosts = res.data;

            API.getAllPosts().then(response => {
                const recentPosts = response.data;
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
                            type: "UPDATE_FORUM_POSTS",
                            forumPosts: forumPosts,
                            recentPosts: recentPosts,
                            userTopics: userResponse.data.userTopics,
                            userReplies: userReplies,
                            startForumTopic: false
                        });
                    });
                }
                else{
                    dispatch({
                        type: "UPDATE_FORUM_POSTS",
                        forumPosts: forumPosts,
                        recentPosts: recentPosts,
                        startForumTopic: false
                    });
                }
            });
        });
    }, [state.isAuthenticated]);

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
                        <h1 className="title has-text-centered">Welcome to the Forums</h1>
                        <Column>
                            <div className="column is-6">
                                <h1 className="title has-text-centered">Recent Topics</h1>
                                {
                                    state.forumPosts.length !== 0 &&

                                    state.forumPosts.map((post, index) =>
                                        <ForumTopicCard
                                            key={index}
                                            name={post.name}
                                            id={post.id}
                                            title={post.title}
                                            date={post.date}
                                            postID={post.postID}
                                            userName={post.userName}
                                            userID={post.userID}
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
                                            userID={post.posts.length && post.posts[post.posts.length - 1].userID}
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

export default Forums;