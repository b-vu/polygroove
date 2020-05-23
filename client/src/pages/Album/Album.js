import React, { useEffect } from "react";
import "./Album.css";
import { Link, useParams } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";

const Album = () => {
    const [state, dispatch] = useProjectContext();
    const { id } = useParams();

    useEffect(() => {
        if(!state.token.length){
            API.getToken().then(res => {
                dispatch({
                    type: "UPDATE_TOKEN",
                    token: res.data.access_token
                });

            });
        }

        API.getAlbumInfo(id, state.token).then(res => {
            dispatch({
                type: "UPDATE_CURRENT_ALBUM",
                currentAlbum: res.data
            });
            API.getAlbums(res.data.artists[0].id, state.token).then(res => {
                const albumNames = [];
                const albums = [];
                for(const album of res.data.items){
                    if(albumNames.indexOf(album.name) === -1){
                        albumNames.push(album.name)
                        albums.push(album)
                    }
                }
                res.data.items = albums;

                dispatch({
                    type: "UPDATE_CURRENT_OTHER_ALBUMS",
                    otherAlbums: res.data
                })
            })
        });

        if(state.isAuthenticated && !state.favoriteAlbums.length){
            API.checkFavorites(state.user.id).then(res => {
                checkFavorites(res.data.favoriteAlbums);
            });
        }
        else{
            checkFavorites(state.favoriteAlbums);
        }

        if(state.isAuthenticated && !state.ratedAlbums.length){
            API.getRatings(state.user.id).then(res => {
                console.log(res.data.albumRatings);
                checkRatings(res.data.albumRatings);
            });
        }
        else{
            checkRatings(state.ratedAlbums);
        }
    }, [id]);

    const formatReleaseDate = date => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const arr = date.split("-");

        return `${months[(arr[1] - 1)]} ${arr[2]}, ${arr[0]}`
    }

    const getRuntime = tracks => {
        let total = 0;

        for(const track of tracks){
            total += track.duration_ms;
        }

        return Math.floor(total / 60000) + " mins";
    }

    const msToMinutes = ms => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);

        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
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

            if(state.isAlbumRated){
                API.editAlbumRating(state.user.id, { id: state.currentAlbum.id, rating: value }).then(res => {
                    console.log(res);
                });
            }
            else{
                API.addAlbumRating(state.user.id, { name: state.currentAlbum.name, artist: state.currentAlbum.artists[0].name, id: state.currentAlbum.id, rating: value, image: state.currentAlbum.images[0].url }).then(res => {
                    console.log(res);
                });
            }
        }
        else{
            window.location.assign("/register");
        }
    }

    const handleFavorite = event => {
        if(state.isAuthenticated){
            const btnState = event.currentTarget.getAttribute("data-state");
            
            if(btnState === "not-favorite"){
                API.addFavoriteAlbum(state.user.id, { name: state.currentAlbum.name, artist: state.currentAlbum.artists[0].name, id: state.currentAlbum.id, image: state.currentAlbum.images[0].url }).then(res => {
                    API.checkFavorites(state.user.id).then(res => {
                        checkFavorites(res.data.favoriteAlbums);
                        dispatch({
                            type: "UPDATE_FAVORITE_ALBUMS",
                            favoriteAlbums: res.data.favoriteAlbums
                        });
                    });
                })
            }
            else{
                API.removeFavoriteAlbum(state.user.id, { id: state.currentAlbum.id }).then(res => {
                    API.checkFavorites(state.user.id).then(res => {
                        checkFavorites(res.data.favoriteAlbums);
                        dispatch({
                            type: "UPDATE_FAVORITE_ALBUMS",
                            favoriteAlbums: res.data.favoriteAlbums
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
                type: "UPDATE_ISFAVORITEALBUM",
                isFavoriteAlbum: false
            });
        }

        for(const album of array){
            if(album.id === id){
                return dispatch({
                    type: "UPDATE_ISFAVORITEALBUM",
                    isFavoriteAlbum: true
                });
            }
            else{
                dispatch({
                    type: "UPDATE_ISFAVORITEALBUM",
                    isFavoriteAlbum: false
                });
            }
        }
    }

    const checkRatings = array => {
        if(!array.length){
            updateStars(0);
            return dispatch({
                type: "UPDATE_ISALBUMRATED",
                isAlbumRated: false
            })
        }

        for(const rating of array){
            if(rating.id === id){
                updateStars(rating.rating);
                return dispatch({
                    type: "UPDATE_ISALBUMRATED",
                    isAlbumRated: true
                });
            }
        }

        updateStars(0);
        return dispatch({
            type: "UPDATE_ISALBUMRATED",
            isAlbumRated: false
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
                            <p className="menu-label">
                                Your Album Rating
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
                                Community Album Rating
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
                            {
                                state.isFavoriteAlbum
                                ?
                                <button onClick={handleFavorite} data-state="favorite" data-not="button is-danger is-outlined is-rounded" data-is="button is-danger is-rounded favorite" className="button is-danger is-rounded favorite">
                                    <span>Favorited&nbsp; <i className='fas fa-heart'></i></span>
                                </button>
                                :
                                <button onClick={handleFavorite} data-state="not-favorite" data-not="button is-danger is-outlined is-rounded" data-is="button is-danger is-rounded favorite" className="button is-danger is-outlined is-rounded">
                                    <span>Favorite&nbsp; <i className="fas fa-heart"></i></span>
                                </button>
                            }
                        </aside>
                    </Box>            
                </div>

                <div className="column is-8">
                    <Box>
                        {
                            state.currentAlbum.images
                            ?
                            <Column>
                            <div className="column is-5">
                                <figure className="image artist-image">
                                    <img src={state.currentAlbum.images[0].url}/>
                                </figure>
                            </div>
                            <div className="column is-7">
                                <h1 className="title">{state.currentAlbum.name} by <Link to={"/artist/" + state.currentAlbum.artists[0].name + "/" + state.currentAlbum.artists[0].id}>{state.currentAlbum.artists[0].name}</Link></h1>
                                <h1 className="title">Released on {formatReleaseDate(state.currentAlbum.release_date)}</h1>
                                <h1 className="title">{state.currentAlbum.total_tracks} tracks, {getRuntime(state.currentAlbum.tracks.items)}</h1>
                                <h1 className="title">Label: {state.currentAlbum.label}</h1>
                                <h1 className="title">{state.currentAlbum.copyrights[0].text}</h1>
                            </div>
                            </Column>
                            :
                            null
                        }

                        <Column>
                            <div className="column">
                                <h1 className="title has-text-centered">Tracks</h1>
                                {
                                    state.currentAlbum.tracks
                                    ?
                                    state.currentAlbum.tracks.items.map((track, index) => 
                                        <div key={index} className="columns">
                                            <p className="title column is-9">
                                                <span>{(index + 1) + "."}&nbsp;</span>
                                                <Link to={"/track/" + track.name + " " + state.currentAlbum.artists[0].name + "/" + track.id}>
                                                    {track.name}
                                                </Link>
                                            </p>
                                                {
                                                    track.explicit
                                                    ?
                                                    <p className="column is-2 explicit">Explicit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                                    :
                                                    <p className="column is-2 explicit"></p>
                                                }
                                                <p className="column is-2 runtime">{" " + msToMinutes(track.duration_ms)}</p>
                                            <br/>
                                        </div>
                                    )
                                    :
                                    null
                                }
                            </div>
                        </Column>
                    </Box>
                </div>

                <div className="column">
                    <Box>
                        <aside className="menu">
                            <p className="menu-label">
                                Other Albums
                            </p>
                            <ul className="menu-list">
                                {
                                    state.otherAlbums.items
                                    ?
                                    state.otherAlbums.items.filter(album => album.name !== state.currentAlbum.name).map((album, index) => 
                                        <li key={index}>
                                            <Link to={"/album/" + album.id} className="columns">
                                                <figure className="image column">
                                                    <img src={album.images[0].url} alt={album.name}/>
                                                </figure>
                                                <div className="column">
                                                    {album.name}
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                    :
                                    null
                                }
                            </ul>
                        </aside>
                    </Box>            
                </div>
            </Column>
        </Box>
    );
}

export default Album;