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
        dispatch({
            type: "UPDATE_NAV",
            navState: "is-success"
        });

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

                if(res.data.length > 10){
                    for(let i = 0; i < 10; i++){
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

                if(res.data.length > 10){
                    for(let i = 0; i < 10; i++){
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
                <div className="tile is-vertical is-8">
                    <div className="tile">
                    <div className="tile is-parent is-vertical">
                        <article className="tile is-child notification is-success">
                        <p className="title">Welcome to PolyGroove!</p>
                        <p className="subtitle">The only website you need for all things Music</p>
                        </article>
                        <article className="tile is-child notification is-warning">
                        <p className="title">Recent Forum Posts</p>
                        {
                            state.home.homeForums.length !== 0 &&
                            state.home.homeForums.map((post, index) =>
                                <div key={index} className="column">
                                    <Link to={`/topic/${post.id}/${post.postID}`}>{post.title}</Link> by <Link to={`/user/${post.userID}`}>{post.userName}</Link> in <Link to={`/forums/${post.id}`}>{post.name}</Link>
                                </div>
                            )
                        }
                        </article>

                        <article className="tile is-child notification is-danger">
                            <p className="subtitle">
                                Hey, my name is Brian Vu, and this my final project for UT's coding bootcamp. 
                                Hope you enjoy your time here and if you dig the webstie, feel free to contact me!
                            </p>

                            <div className="has-text-centered level-item home-contact">
                                <a className="link level-item" href="https://github.com/b-vu">
                                    <i className="fab fa-github"></i>
                                </a>
                                &nbsp;
                                &nbsp;
                                <a className="link level-item" href="/">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                &nbsp;
                                &nbsp;
                                <a className="link level-item" href="mailto:brianvu7@gmail.com" style={{ textDecoration: 'none' }}>
                                    <i className="fas fa-envelope level-item"></i>
                                    <p className="small-text level-item">&nbsp;brianvu7@gmail.com</p>
                                </a>
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
                                    #{index + 1} <Link to={`/track/${song.song}/${song.trackID}`} style={{ textDecoration: 'none' }}>{song.song}</Link> by <Link to={`/artist/${song.artist}/${song.artistID}`} style={{ textDecoration: 'none' }}>{song.artist}</Link>
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
                                    rating.type === "album"
                                    ?
                                    <div key={index} className="column">
                                        <Link to={`/album/${rating.id}`} style={{ textDecoration: 'none' }}>{rating.name}</Link> by <Link to={`/artist/${rating.artist}/${rating.artistID}`} style={{ textDecoration: 'none' }}>{rating.artist}</Link>
                                        <ProfileStars rating={rating.ratings[rating.ratings.length - 1].rating} userName={rating.ratings[rating.ratings.length - 1].userName} userID={rating.ratings[rating.ratings.length - 1].userID}/>
                                    </div>
                                    :
                                    <div key={index} className="column">
                                        <Link to={`/track/${rating.name}/${rating.id}`} style={{ textDecoration: 'none' }}>{rating.name}</Link> by <Link to={`/artist/${rating.artist}/${rating.artistID}`} style={{ textDecoration: 'none' }}>{rating.artist}</Link>
                                        <ProfileStars rating={rating.ratings[rating.ratings.length - 1].rating} userName={rating.ratings[rating.ratings.length - 1].userName} userID={rating.ratings[rating.ratings.length - 1].userID}/>
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