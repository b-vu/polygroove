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
        dispatch({
            type: "UPDATE_NAV",
            navState: "is-info"
        });

        if(!state.token.length){
            API.getToken().then(res => {
                API.getTrackInfo(name, id, res.data.access_token).then(res => {
                    const trackArray = [res[0].data.response.hits, res[1].data]
                    dispatch({
                        type: "UPDATE_CURRENT_TRACK",
                        currentTrack: trackArray
                    });
                });

                dispatch({
                    type: "UPDATE_TOKEN",
                    token: res.data.access_token
                });
            })
        }
        else{
            API.getTrackInfo(name, id, state.token).then(res => {
                const trackArray = [res[0].data.response.hits, res[1].data]
                dispatch({
                    type: "UPDATE_CURRENT_TRACK",
                    currentTrack: trackArray
                });
            });
        }

        getCommunityRatings(id);

        if(state.isAuthenticated && !state.favoriteTracks.length){
            API.checkFavorites(state.user.id).then(res => {
                checkFavorites(res.data.favoriteTracks);
                dispatch({
                    type: "UPDATE_FAVORITE_TRACKS",
                    favoriteTracks: res.data.favoriteTracks
                });
            });
        }
        else{
            checkFavorites(state.favoriteTracks);
        }

        if(state.isAuthenticated && !state.ratedTracks.length){
            getUserRatings(state.user.id);
        }
        else{
            checkRatings(state.ratedTracks);
        }

        API.getItunesTrack(name).then(res => {
            if(res.data.results.length){
                dispatch({
                    type: "UPDATE_APPLE",
                    name: "trackLink",
                    value: res.data.results[0].collectionViewUrl
                });
            }
            else{
                dispatch({
                    type: "UPDATE_APPLE",
                    name: "trackLink",
                    value: ""
                });
            }
        });
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
            const starState = event.currentTarget.firstElementChild.getAttribute("data-state");

            if(starState === "empty"){
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
            getCommunityRatings(id);

            if(state.isTrackRated){
                API.editTrackRating(state.user.id, { id: state.currentTrack[1].id, rating: value }).then(res => {
                    getUserRatings(state.user.id);
                });
            }
            else if(state.communityRatings.length){
                API.addToExistingDBTrack(id, { userID: state.user.id, userName: state.user.name, rating: value, name: state.currentTrack[1].name, id: state.currentTrack[1].id, artist: state.currentTrack[1].artists[0].name, artistID: state.currentTrack[1].artists[0].id, image: state.currentTrack[1].album.images[0].url }).then(res => {
                    getUserRatings(state.user.id);
                });
            }
            else{
                API.addTrackRating(state.user.id, { userName: state.user.name, name: state.currentTrack[1].name, id: state.currentTrack[1].id, artist: state.currentTrack[1].artists[0].name, artistID: state.currentTrack[1].artists[0].id, album: state.currentTrack[1].album.name, albumID: state.currentTrack[1].album.id, rating: value, image: state.currentTrack[1].album.images[0].url, type: "track" }).then(res => {
                    getUserRatings(state.user.id);
                });
            }
            getCommunityRatings(id);
        }   
        else{
            window.location.assign("/register");
        }
    }

    const handleFavorite = event => {
        if(state.isAuthenticated){
            const btnState = event.currentTarget.getAttribute("data-state");
            
            if(btnState === "not-favorite"){
                API.addFavoriteTrack(state.user.id, { name: state.currentTrack[1].name, id: state.currentTrack[1].id, artist: state.currentTrack[1].artists[0].name, artistID: state.currentTrack[1].artists[0].id, image: state.currentTrack[1].album.images[0].url }).then(res => {
                    API.checkFavorites(state.user.id).then(res => {
                        checkFavorites(res.data.favoriteTracks);
                        dispatch({
                            type: "UPDATE_FAVORITE_TRACKS",
                            favoriteTracks: res.data.favoriteTracks
                        });
                    });
                })
            }
            else{
                API.removeFavoriteTrack(state.user.id, { id: state.currentTrack[1].id }).then(res => {
                    API.checkFavorites(state.user.id).then(res => {
                        checkFavorites(res.data.favoriteTracks);
                        dispatch({
                            type: "UPDATE_FAVORITE_TRACKS",
                            favoriteTracks: res.data.favoriteTracks
                        });
                    });
                })
            }
        }
        else{
            window.location.assign("/register");
        }
    }

    const checkFavorites = array => {
        if(!array.length){
            dispatch({
                type: "UPDATE_ISFAVORITETRACK",
                isFavoriteTrack: false
            });
        }

        for(const track of array){
            if(track.id === id){
                return dispatch({
                    type: "UPDATE_ISFAVORITETRACK",
                    isFavoriteTrack: true
                });
            }
            else{
                dispatch({
                    type: "UPDATE_ISFAVORITETRACK",
                    isFavoriteTrack: false
                });
            }
        }
    }

    const checkRatings = userRatingsArray => {
        if(!userRatingsArray.length){
            updateStars(0);
            return dispatch({
                type: "UPDATE_ISTRACKRATED",
                isTrackRated: false
            })
        }

        for(const rating of userRatingsArray){
            if(rating.id === id){
                updateStars(rating.rating);
                return dispatch({
                    type: "UPDATE_ISTRACKRATED",
                    isTrackRated: true
                });
            }
        }

        updateStars(0);
        return dispatch({
            type: "UPDATE_ISTRACKRATED",
            isTrackRated: false
        });
    }

    const getUserRatings = userID => {
        API.getRatings(userID).then(res => {
            checkRatings(res.data.trackRatings);
            dispatch({
                type: "UPDATE_RATED_TRACKS",
                ratedTracks: res.data.trackRatings
            })
        });
    }

    const updateCommunityStars = communityRatingsArray => {
        const stars = document.querySelectorAll(".community-rating");
        let average = 0;

        if(!communityRatingsArray.length){
            for(let i = 0; i < 5; i++){
                stars[i].setAttribute("class", "far fa-star community-rating");
                stars[i].setAttribute("data-state", "empty");
            }
            return;
        }

        for(const rating of communityRatingsArray){
            average += rating.rating
        }

        average = parseInt(average.toFixed(2)) / communityRatingsArray.length;

        for(let i = 0; i < 5; i++){
            if(average < parseInt(stars[i].getAttribute("data-value")) && average >= parseInt(stars[i].getAttribute("data-decimal")) + 0.50){
                stars[i].setAttribute("class", "fas fa-star-half-alt community-rating");
                stars[i].setAttribute("data-state", "half");
            }
            else if(average >= parseInt(stars[i].getAttribute("data-value"))){
                stars[i].setAttribute("class", "fas fa-star community-rating");
                stars[i].setAttribute("data-state", "fill");
            }
            else{
                stars[i].setAttribute("class", "far fa-star community-rating");
                stars[i].setAttribute("data-state", "empty");
            }
        }
    }

    const getCommunityRatings = id => {
        API.getCommunityRatings(id).then(res => {
            if(res.data !== null){
                updateCommunityStars(res.data.ratings);
                
                dispatch({
                    type: "UPDATE_COMMUNITY_RATINGS",
                    communityRatings: res.data.ratings
                });
            }
            else{
                updateCommunityStars([]);

                dispatch({
                    type: "UPDATE_COMMUNITY_RATINGS",
                    communityRatings: []
                });
            }
        });
    }

    const updateStars = number => {
        const value = document.querySelectorAll(".user-rating");
        
        if(!number){
            for(const star of value){
                star.setAttribute("class", "far fa-star user-rating");
                star.setAttribute("data-state", "empty");
            }
        }

        for(const star of value){
            if(number >= parseInt(star.getAttribute("data-value"))){
                star.setAttribute("class", "fas fa-star user-rating");
                star.setAttribute("data-state", "fill");
            }
            else{
                star.setAttribute("class", "far fa-star user-rating");
                star.setAttribute("data-state", "empty");
            }
        }
    }

    return(
        <Box>
            <Column>
                <div className="column is-2">
                    <Box>
                        <aside className="menu has-text-centered">
                            <br/>
                            {
                                state.isFavoriteTrack
                                ?
                                <button onClick={handleFavorite} data-state="favorite" data-not="button is-danger is-outlined is-rounded" data-is="button is-danger is-rounded favorite" className="button is-danger is-rounded favorite">
                                    <span>Favorited&nbsp; <i className='fas fa-heart'></i></span>
                                </button>
                                :
                                <button onClick={handleFavorite} data-state="not-favorite" data-not="button is-danger is-outlined is-rounded" data-is="button is-danger is-rounded favorite" className="button is-danger is-outlined is-rounded">
                                    <span>Favorite&nbsp; <i className="fas fa-heart"></i></span>
                                </button>
                            }
                            <br/>
                            <br/>
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
                                    <i className="far fa-star community-rating" data-value="1" data-decimal="0" data-fill="fas fa-star community-rating" data-empty="far fa-star community-rating" data-half="fas fa-star-half-alt community-rating" data-state="empty"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star community-rating" data-value="2" data-decimal="1" data-fill="fas fa-star community-rating" data-empty="far fa-star community-rating" data-half="fas fa-star-half-alt community-rating" data-state="empty"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star community-rating" data-value="3" data-decimal="2" data-fill="fas fa-star community-rating" data-empty="far fa-star community-rating" data-half="fas fa-star-half-alt community-rating" data-state="empty"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star community-rating" data-value="4" data-decimal="3" data-fill="fas fa-star community-rating" data-empty="far fa-star community-rating" data-half="fas fa-star-half-alt community-rating" data-state="empty"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star community-rating" data-value="5" data-decimal="4" data-fill="fas fa-star community-rating" data-empty="far fa-star community-rating" data-half="fas fa-star-half-alt community-rating" data-state="empty"></i>
                                </span>
                            </ul>
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
                                <br/>
                                <a href={state.currentTrack[1].external_urls.spotify} className="track-links"><i className="fab fa-spotify"></i></a>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href={state.appleMusic.trackLink} className="track-links"><i className="fab fa-itunes-note"></i></a>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href={state.currentTrack[0][0].result.url} className="track-links"><i className="fas fa-comment-dots"></i></a>
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