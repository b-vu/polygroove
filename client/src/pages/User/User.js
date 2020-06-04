import React, { useEffect } from "react";
import "./User.css";
import { useProjectContext } from "../../utils/Store";
import { Link, useParams } from "react-router-dom";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import ProfileStars from "../../components/ProfileStars/ProfileStars";

const User = () => {
    const [state, dispatch] = useProjectContext();

    const { id } = useParams();

    useEffect(() => {
        API.getUserProfile(id).then(res => {
            if(res.data !== null){
                dispatch({
                    type: "UPDATE_CURRENT_PROFILE",
                    currentProfile: res.data
                });
            }
            else{
                return;
            }
        });
    }, [id, state.profileDisplay]);

    const formatDate = time => {
        if(time === undefined){
            return;
        }

        const arr = time.split("T");
        const dateArr = arr[0].split("-");
        
        let month = parseInt(dateArr[1]);
        let day = parseInt(dateArr[2]);


        const newDate = month + "-" + day + "-" + dateArr[0];
        return(newDate);
    }

    const handleFavDisplay = event => {
        const display = event.currentTarget.getAttribute("data-value");
        dispatch({
            type: "UPDATE_PROFILE_DISPLAY",
            name: "favDisplay",
            value: display
        });
    }

    const handleRatedDisplay = event => {
        const display = event.currentTarget.getAttribute("data-value");
        dispatch({
            type: "UPDATE_PROFILE_DISPLAY",
            name: "ratedDisplay",
            value: display
        });
    }

    return(
        <Box>
            {console.log(state)}
            <div className="tile is-ancestor">
                <div className="tile is-vertical is-8">
                    <div className="tile">
                    <div className="tile is-parent is-vertical">
                        <article className="tile is-child notification is-danger">
                        <br/>
                        <br/>
                        <p className="title">{state.currentProfile.name}</p>
                        <br/>
                        <p className="subtitle">Account created: {formatDate(state.currentProfile.date)}</p>
                        </article>
                        <article className="tile is-child notification is-warning">
                        <p className="title">Forum Stats</p>
                        <p className="subtitle">Forum Posts</p>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-info">
                        <p className="title">Favorites</p>
                        <p className="subtitle"><span onClick={handleFavDisplay} className="profile-tabs" data-value="fav-artists">Artists({state.currentProfile.favoriteArtists.length})</span> | <span onClick={handleFavDisplay} className="profile-tabs" data-value="fav-albums">Albums({state.currentProfile.favoriteAlbums.length})</span> | <span onClick={handleFavDisplay} className="profile-tabs" data-value="fav-tracks">Tracks({state.currentProfile.favoriteTracks.length})</span></p>
                        {
                            (state.profileDisplay.favDisplay === "fav-artists" && state.currentProfile.favoriteArtists.length !== 0) && 

                            state.currentProfile.favoriteArtists.map((artist, index) =>
                                <Link to={`/artist/${artist.artist}/${artist.artistID}`} className="column" key={index}>{artist.artist}</Link>
                            )
                        }
                        {
                            (state.profileDisplay.favDisplay === "fav-albums" && state.currentProfile.favoriteAlbums.length !== 0) && 

                            state.currentProfile.favoriteAlbums.map((album, index) =>
                                <p key={index} className="column">
                                    <Link to={`/album/${album.id}`}>{album.name}</Link> by <Link to={`/artist/${album.artist}/${album.artistID}`}>{album.artist}</Link>
                                </p>
                            )
                        }
                        {
                            (state.profileDisplay.favDisplay === "fav-tracks" && state.currentProfile.favoriteTracks.length !== 0) && 

                            state.currentProfile.favoriteTracks.map((track, index) =>
                                <p key={index} className="column">
                                    <Link to={`/track/${track.name}/${track.id}`}>{track.name}</Link> by <Link to={`/artist/${track.artist}/${track.artistID}`}>{track.artist}</Link>
                                </p>
                            )
                        }
                        </article>
                    </div>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child notification is-primary">
                        <p className="title">Ratings</p>
                        <p className="subtitle"><span onClick={handleRatedDisplay} className="profile-tabs" data-value="rated-albums">Albums({state.currentProfile.albumRatings.length})</span> | <span onClick={handleRatedDisplay} className="profile-tabs" data-value="rated-tracks">Tracks({state.currentProfile.trackRatings.length})</span></p>
                            {
                                (state.profileDisplay.ratedDisplay === "rated-albums" && state.currentProfile.albumRatings.length !== 0) &&

                                state.currentProfile.albumRatings.map((album, index) =>
                                    <div key={index} className="column">
                                        <Link to={`/album/${album.id}`}>{album.name}</Link> by <Link to={`/artist/${album.artist}/${album.artistID}`}>{album.artist}</Link>
                                        <ProfileStars rating={album.rating} index={index}/>
                                    </div>
                                )
                            }
                            {
                                (state.profileDisplay.ratedDisplay === "rated-tracks" && state.currentProfile.trackRatings.length !== 0) &&

                                state.currentProfile.trackRatings.map((track, index) =>
                                    <div key={index} className="column">
                                        <Link to={`/track/${track.name}/${track.id}`}>{track.name}</Link> by <Link to={`/artist/${track.artist}/${track.artistID}`}>{track.artist}</Link>
                                        <ProfileStars rating={track.rating} index={index}/>
                                    </div>
                                )
                            }
                    </article>
                </div>
            </div>
        </Box>
    );
}

export default User;