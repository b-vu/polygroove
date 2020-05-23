import React, { useEffect } from "react";
import "./Track.css";
import { Link, useParams } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";

const Track = () => {
    const [state, dispatch] = useProjectContext();
    const { name, id } = useParams();

    useEffect(() => {
        if(!state.token.length){
            API.getToken().then(res => {
                dispatch({
                    type: "UPDATE_TOKEN",
                    token: res.data.access_token
                });
            })
        }

        API.getTrackInfo(name, id, state.token).then(res => {
            const trackArray = [res[0].data.response.hits, res[1].data]
            dispatch({
                type: "UPDATE_CURRENT_TRACK",
                currentTrack: trackArray
            });
        })
    }, [name]);

    const msToMinutes = ms => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);

        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const formatReleaseDate = date => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const arr = date.split("-");

        return `${months[(arr[1] - 1)]} ${arr[2]}, ${arr[0]}`
    }

    const handleRating = event => {
        if(state.isAuthenticated){
            const value = parseInt(event.currentTarget.getAttribute("data-value"));
            const values = document.querySelectorAll(".user-rating");
            const state = event.currentTarget.firstElementChild.getAttribute("data-state");

            if(state === "empty"){
                for(const rating of values){
                    if(value >= parseInt(rating.getAttribute("data-value"))){
                        rating.setAttribute("class", event.currentTarget.firstElementChild.getAttribute("data-fill"));
                        rating.setAttribute("data-state", "fill");
                    }
                }
            }
            else{
                for(const rating of values){
                    if(value < parseInt(rating.getAttribute("data-value"))){
                        rating.setAttribute("class", event.currentTarget.firstElementChild.getAttribute("data-empty"));
                        rating.setAttribute("data-state", "empty");
                    }
                }
            }
        }   
        else{
            window.location.assign("/register");
        }
    }

    const handleFavorite = event => {
        if(state.isAuthenticated){
            const state = event.currentTarget.getAttribute("data-state");

            if(state === "not-favorite"){
                event.currentTarget.setAttribute("data-state", "favorite");
                event.currentTarget.setAttribute("class", event.currentTarget.getAttribute("data-is"));
                event.currentTarget.innerHTML = "Favorited&nbsp; <i class='fas fa-heart'></i>"
            }
            else{
                event.currentTarget.setAttribute("data-state", "not-favorite");
                event.currentTarget.setAttribute("class", event.currentTarget.getAttribute("data-not"));
                event.currentTarget.innerHTML = "Favorite&nbsp; <i class='fas fa-heart'></i>"
            }
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
                        <aside className="menu has-text-centered">
                            <p className="menu-label">
                                Your Track Rating
                            </p>
                            <ul className="menu-list">
                                <span onClick={handleRating} data-value="1" className="icon has-text-warning">
                                    <i className="far fa-star user-rating" data-value="1" data-fill="fas fa-star user-rating" data-empty="far fa-star user-rating" data-state="empty"></i>
                                </span>
                                <span onClick={handleRating} data-value="2" className="icon has-text-warning">
                                    <i className="far fa-star user-rating" data-value="2" data-fill="fas fa-star user-rating" data-empty="far fa-star user-rating" data-state="empty"></i>
                                </span>
                                <span onClick={handleRating} data-value="3" className="icon has-text-warning">
                                    <i className="far fa-star user-rating" data-value="3" data-fill="fas fa-star user-rating" data-empty="far fa-star user-rating" data-state="empty"></i>
                                </span>
                                <span onClick={handleRating} data-value="4" className="icon has-text-warning">
                                    <i className="far fa-star user-rating" data-value="4" data-fill="fas fa-star user-rating" data-empty="far fa-star user-rating" data-state="empty"></i>
                                </span>
                                <span onClick={handleRating} data-value="5" className="icon has-text-warning">
                                    <i className="far fa-star user-rating" data-value="5" data-fill="fas fa-star user-rating" data-empty="far fa-star user-rating" data-state="empty"></i>
                                </span>
                            </ul>
                            <br/>

                            <p className="menu-label">
                                Community Track Rating
                            </p>
                            <ul className="menu-list">
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star-half-alt"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star"></i>
                                </span>
                            </ul>
                            <br/>
                            <button onClick={handleFavorite} data-state="not-favorite" data-not="button is-danger is-outlined is-rounded" data-is="button is-danger is-rounded favorite" className="button is-danger is-outlined is-rounded">
                                <span>Favorite&nbsp; <i className="fas fa-heart"></i></span>
                            </button>
                        </aside>
                    </Box>            
                </div>
            {
                state.currentTrack.length
                ?
                <div className="column is-8">
                    <Box>
                        <Column>
                            <div className="column is-5">
                                <figure className="image artist-image">
                                    <img src={state.currentTrack[1].album.images[0].url}/>
                                </figure>
                            </div>
                            <div className="column is-7">
                                <h1 className="title">{state.currentTrack[1].name}</h1>
                                <h1 className="title">By <Link to={"/artist/" + state.currentTrack[1].artists[0].name + "/" + state.currentTrack[1].artists[0].id}>{state.currentTrack[1].artists[0].name}</Link></h1>
                                <h1 className="title">On <Link to={"/album/" + state.currentTrack[1].album.id}>{state.currentTrack[1].album.name}</Link></h1>
                                <h1 className="title">Released on {formatReleaseDate(state.currentTrack[1].album.release_date)}</h1>
                                <h1 className="title">Duration: {msToMinutes(state.currentTrack[1].duration_ms)}</h1>
                                {
                                    state.currentTrack[1].explicit
                                    ?
                                    <p className="explicit">Explicit</p>
                                    :
                                    null
                                }
                                <a href={state.currentTrack[1].external_urls.spotify}>Spotify</a>
                                <a href={state.currentTrack[0][0].result.url}> Lyrics</a>
                            </div>
                        </Column>
                    </Box>
                </div>
                :
                null
            }
            </Column>
        </Box>
    );
}

export default Track;