import React, { useEffect } from "react";
import "./Home.css";
import API from "../../utils/API";
import { useProjectContext } from "../../utils/Store";
import { Link } from "react-router-dom";
import Box from "../../components/Box/Box";
import ProfileStars from "../../components/ProfileStars/ProfileStars";

const Home = () => {
    const [state, dispatch] = useProjectContext();

    useEffect(() => {
        API.getToken().then(res => {
            API.getUSATop50(res.data.access_token).then(res => {
                const homeCharts = [];

                for(let i = 0; i < 15; i++){
                    let songObj = {
                        artist: res.data.items[i].track.artists[0].name,
                        song: res.data.items[i].track.name,
                        artistID: res.data.items[i].track.artists[0].id,
                        trackID: res.data.items[i].track.id
                    }
                    homeCharts.push(songObj);
                }
        
                dispatch({
                    type: "UPDATE_HOME_PAGE",
                    name: "homeCharts",
                    value: homeCharts
                });
            });

            dispatch({
                type: "UPDATE_TOKEN",
                token: res.data.access_token
            });

            API.getAllForums().then(res => {
                const forumsArr = [];

                if(res.data.length > 8){
                    for(let i = 0; i < 8; i++){
                        forumsArr.push(res.data[i]);
                    }
                    dispatch({
                        type: "UPDATE_HOME_PAGE",
                        name: "homeForums",
                        value: forumsArr
                    });
                }
                else{
                    dispatch({
                        type: "UPDATE_HOME_PAGE",
                        name: "homeForums",
                        value: res.data
                    });
                }
            });

            API.getAllRatings().then(res => {
                const ratingsArr = [];

                if(res.data.length > 7){
                    for(let i = 0; i < 7; i++){
                        ratingsArr.push(res.data[i]);
                    }
                    dispatch({
                        type: "UPDATE_HOME_PAGE",
                        name: "homeRatings",
                        value: ratingsArr
                    });
                }
                else{
                    dispatch({
                        type: "UPDATE_HOME_PAGE",
                        name: "homeRatings",
                        value: res.data
                    });
                }
            });
        })
    }, []);

    return( 
        <Box>
            <div className="tile is-ancestor">
                {console.log(state)}
                <div className="tile is-vertical is-8">
                    <div className="tile">
                    <div className="tile is-parent is-vertical">
                        <article className="tile is-child notification is-success">
                        <br/>
                        <p className="title">Welcome!</p>
                        <p className="subtitle">The only website you need for all things Music</p>
                        </article>
                        <article className="tile is-child notification is-warning">
                        <p className="title">Recent Forum Posts</p>
                        {
                            state.home.homeForums.length !== 0 &&
                            state.home.homeForums.map((post, index) =>
                                <div key={index} className="column">
                                    <Link to={`/topic/${post.id}/${post.postID}`}>{post.title}</Link> in <Link to={`/forums/${post.id}`}>{post.name}</Link>
                                </div>
                            )
                        }
                        </article>
                        <article className="tile is-child notification is-danger">
                            <p className="title">Contact Me</p>
                            <p className="subtitle">Aligned with the right tile</p>
                            <div className="content">

                            </div>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-info">
                        <p className="title">Current Top Songs</p>
                        <p className="subtitle">In the US</p>
                        {
                            state.home.homeCharts.length !== 0 &&
                            state.home.homeCharts.map((song, index) =>
                                <div key={index} className="column">
                                    <Link to={`/track/${song.song}/${song.trackID}`}>{song.song}</Link> by <Link to={`/artist/${song.artist}/${song.artistID}`}>{song.artist}</Link>
                                </div>
                            )
                        }
                        </article>
                    </div>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child notification is-primary">
                    <div className="content">
                        <p className="title">Recent Ratings</p>
                        <p className="subtitle">From the community</p>
                        <div className="content">
                        {
                            state.home.homeRatings.length !== 0 &&
                            state.home.homeRatings.map((rating, index) =>
                                <div key={index} className="column">
                                    {rating.name} by {rating.artist}
                                    <span><ProfileStars rating={rating.ratings[0].rating}/> - <Link to={`/user/${rating.ratings[0].userID}`}>{rating.ratings[0].userName}</Link></span>
                                </div>
                            )
                        }
                        </div>
                    </div>
                    </article>
                </div>
            </div>
        </Box>
    );
}

export default Home;