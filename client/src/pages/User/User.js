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
        dispatch({
            type: "UPDATE_NAV",
            navState: "is-primary"
        });

        API.getUserProfile(id).then(res => {
            let profileInfo = res.data;
            profileInfo.favoriteArtistsLength = res.data.favoriteArtists.length;
            profileInfo.favoriteAlbumsLength = res.data.favoriteAlbums.length;
            profileInfo.favoriteTracksLength = res.data.favoriteTracks.length;
            profileInfo.ratedAlbumsLength = res.data.albumRatings.length;
            profileInfo.ratedTracksLength = res.data.trackRatings.length;

            res.data.favoriteArtists.reverse();
            res.data.favoriteAlbums.reverse();
            res.data.favoriteTracks.reverse();
            res.data.albumRatings.reverse();
            res.data.trackRatings.reverse();

            if(res.data !== null && res.data.favoriteArtists.length <= 14 && res.data.favoriteAlbums.length <= 14 && res.data.favoriteTracks.length <= 14){
                profileInfo.favoriteArtists = [res.data.favoriteArtists];
                profileInfo.favoriteAlbums = [res.data.favoriteAlbums];
                profileInfo.favoriteTracks = [res.data.favoriteTracks];
            }
            else{
                let favArtistsArr = [];
                let favAlbumsArr = [];
                let favTracksArr = [];

                if(res.data.favoriteArtists.length > 14){
                    for(let i = 0; i < res.data.favoriteArtists.length; i++){
                        if(!(i % 14)){
                            favArtistsArr.push(res.data.favoriteArtists.slice(i, i + 14));
                        }
                    }
                    profileInfo.favoriteArtists = favArtistsArr;
                }
                else{
                    profileInfo.favoriteArtists = [res.data.favoriteArtists];
                }

                if(res.data.favoriteAlbums.length > 14){
                    for(let i = 0; i < res.data.favoriteAlbums.length; i++){
                        if(!(i % 14)){
                            favAlbumsArr.push(res.data.favoriteAlbums.slice(i, i + 14));
                        }
                    }
                    profileInfo.favoriteAlbums = favAlbumsArr;
                }
                else{
                    profileInfo.favoriteAlbums = [res.data.favoriteAlbums];
                }

                if(res.data.favoriteTracks.length > 14){
                    for(let i = 0; i < res.data.favoriteTracks.length; i++){
                        if(!(i % 14)){
                            favTracksArr.push(res.data.favoriteTracks.slice(i, i + 14));
                        }
                    }
                    profileInfo.favoriteTracks = favTracksArr;
                }
                else{
                    profileInfo.favoriteTracks = [res.data.favoriteTracks];
                }
            }

            if(res.data !== null && res.data.albumRatings.length <= 9 && res.data.trackRatings.length <= 9){
                profileInfo.albumRatings = [res.data.albumRatings];
                profileInfo.trackRatings = [res.data.trackRatings];
            }
            else{
                let ratedAlbumsArr = [];
                let ratedTracksArr = [];

                if(res.data.albumRatings.length > 9){
                    for(let i = 0; i < res.data.albumRatings.length; i++){
                        if(!(i % 9)){
                            ratedAlbumsArr.push(res.data.albumRatings.slice(i, i + 9));
                        }
                    }
                    profileInfo.albumRatings = ratedAlbumsArr;
                }
                else{
                    profileInfo.albumRatings = [res.data.albumRatings];
                }

                if(res.data.trackRatings.length > 9){
                    for(let i = 0; i < res.data.trackRatings.length; i++){
                        if(!(i % 9)){
                            ratedTracksArr.push(res.data.trackRatings.slice(i, i + 9));
                        }
                    }
                    profileInfo.trackRatings = ratedTracksArr;
                }
                else{
                    profileInfo.trackRatings = [res.data.trackRatings];
                }
            }

            API.getUserForum(id).then(response => {
                let profileForum = response.data;
                let profileForumArr = [];
                profileInfo.forumsLength = response.data.length;

                if(profileForum.length > 11){
                    for(let i = 0; i < response.data.length; i++){
                        if(!(i % 11)){
                            profileForumArr.push(response.data.slice(i, i + 11));
                        }
                    }
                    profileForum = profileForumArr;
                }
                else{
                    profileForum = [response.data];
                }

                if(profileInfo !== null){
                    dispatch({
                        type: "UPDATE_CURRENT_PROFILE",
                        currentProfile: profileInfo,
                        currentProfileForums: profileForum
                    });
                }
                else{
                    dispatch({
                        type: "UPDATE_CURRENT_PROFILE",
                        currentProfileForums: profileForum
                    });
                    return
                }
            });
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

    const handleBioEdit = () => {
        dispatch({
            type: "UPDATE_BIO_EDIT",
            bioEdit: !state.bioEdit
        });
    }

    const bioEditChange = event => {
        const bio = event.target.value;
  
        dispatch({
            type: "UPDATE_USER_BIO",
            bio: bio
        });
    }

    const editBio = () => {
        API.editBio(id, { bio: state.currentProfile.bio }).then(res => {
            dispatch({
                type: "UPDATE_BIO_EDIT",
                bioEdit: false
            });
        });
    }

    const handleNext = event => {
        const value = event.currentTarget.getAttribute("data-value");

        dispatch({
            type: "UPDATE_PROFILE_DISPLAY",
            name: value,
            value: (state.profileDisplay[value] + 1)
        });
    }

    const handlePrevious = event => {
        const value = event.currentTarget.getAttribute("data-value");

        dispatch({
            type: "UPDATE_PROFILE_DISPLAY",
            name: value,
            value: (state.profileDisplay[value] - 1)
        });
    }

    return(
        <Box>
            <div className="tile is-ancestor">
                <div className="tile is-vertical is-8">
                    <div className="tile">
                    <div className="tile is-parent is-vertical">
                        <article className="tile is-child notification is-primary">
                        <br/>
                        <br/>
                        <p className="title">{state.currentProfile.name}</p>
                        <br/>
                        <p className="subtitle">Account created: {formatDate(state.currentProfile.date)}</p>
                        <br/>
                        <p>{state.currentProfile.bio}</p>
                        <br/>
                        {
                            id === state.user.id &&
                            <p onClick={handleBioEdit} className="profile-tabs">(edit)</p>
                        }
                        {
                            state.bioEdit &&
                            <div className="field">
                                <div className="control">
                                    <textarea onChange={bioEditChange} className="textarea is-danger" placeholder="Bio" value={state.currentProfile.bio}></textarea>
                                </div>
                                <button onClick={editBio} className="button is-danger is-inverted">Edit</button>
                            </div>
                        }
                        </article>
                        <article className="tile is-child notification is-warning">
                        <p className="title">Forum Posts({state.currentProfile.forumsLength})</p>
                        {
                            state.currentProfileForums.length !== 0 &&
                            state.currentProfileForums[state.profileDisplay.forumsPage].map((post, index) =>
                                <div key={index}>
                                    <Link to={`/topic/${post.id}/${post.postID}`}>{post.title}</Link> in <Link to={`/forums/${post.id}`}>{post.name}</Link>
                                </div>
                            )
                        }
                        {
                            (state.currentProfileForums.length > 1) &&
                            <div className="has-text-centered">
                                {
                                    state.profileDisplay.forumsPage !== 0 &&
                                    <span onClick={handlePrevious} data-value="forumsPage" className="profile-arrow">&larr;</span>
                                }
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {
                                    state.profileDisplay.forumsPage !== state.currentProfileForums.length - 1 &&
                                    <span onClick={handleNext} data-value="forumsPage" className="profile-arrow">&rarr;</span>
                                }
                            </div>
                        }
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-danger">
                        <p className="title">Favorites</p>
                        <p className="subtitle"><span onClick={handleFavDisplay} className="profile-tabs" data-value="fav-artists">Artists({state.currentProfile.favoriteArtistsLength})</span> | <span onClick={handleFavDisplay} className="profile-tabs" data-value="fav-albums">Albums({state.currentProfile.favoriteAlbumsLength})</span> | <span onClick={handleFavDisplay} className="profile-tabs" data-value="fav-tracks">Tracks({state.currentProfile.favoriteTracksLength})</span></p>
                        {
                            (state.profileDisplay.favDisplay === "fav-artists" && state.currentProfile.favoriteArtists.length !== 0) && 

                            state.currentProfile.favoriteArtists[state.profileDisplay.favArtistsPage].map((artist, index) =>
                                <Link to={`/artist/${artist.artist}/${artist.artistID}`} className="column" key={index} style={{ textDecoration: 'none' }}>{artist.artist}</Link>
                            )
                        }
                        {
                            (state.profileDisplay.favDisplay === "fav-albums" && state.currentProfile.favoriteAlbums.length !== 0) && 

                            state.currentProfile.favoriteAlbums[state.profileDisplay.favAlbumsPage].map((album, index) =>
                                <p key={index} className="column">
                                    <Link to={`/album/${album.id}`} style={{ textDecoration: 'none' }}>{album.name}</Link> by <Link to={`/artist/${album.artist}/${album.artistID}`} style={{ textDecoration: 'none' }}>{album.artist}</Link>
                                </p>
                            )
                        }
                        {
                            (state.profileDisplay.favDisplay === "fav-tracks" && state.currentProfile.favoriteTracks.length !== 0) && 

                            state.currentProfile.favoriteTracks[state.profileDisplay.favTracksPage].map((track, index) =>
                                <p key={index} className="column">
                                    <Link to={`/track/${track.name}/${track.id}`} style={{ textDecoration: 'none' }}>{track.name}</Link> by <Link to={`/artist/${track.artist}/${track.artistID}`} style={{ textDecoration: 'none' }}>{track.artist}</Link>
                                </p>
                            )
                        }
                        {
                            (state.profileDisplay.favDisplay === "fav-artists" && state.currentProfile.favoriteArtists.length > 1) &&
                            <div className="has-text-centered">
                                {
                                    state.profileDisplay.favArtistsPage !== 0 &&
                                    <span onClick={handlePrevious} data-value="favArtistsPage" className="profile-arrow">&larr;</span>
                                }
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {
                                    state.profileDisplay.favArtistsPage !== state.currentProfile.favoriteArtists.length - 1 &&
                                    <span onClick={handleNext} data-value="favArtistsPage" className="profile-arrow">&rarr;</span>
                                }
                            </div>
                        }
                        {
                            (state.profileDisplay.favDisplay === "fav-albums" && state.currentProfile.favoriteAlbums.length > 1) &&
                            <div className="has-text-centered">
                                {
                                    state.profileDisplay.favAlbumsPage !== 0 &&
                                    <span onClick={handlePrevious} data-value="favAlbumsPage" className="profile-arrow">&larr;</span>
                                }
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {
                                    state.profileDisplay.favAlbumsPage !== state.currentProfile.favoriteAlbums.length - 1 &&
                                    <span onClick={handleNext} data-value="favAlbumsPage" className="profile-arrow">&rarr;</span>
                                }
                            </div>
                        }
                        {
                            (state.profileDisplay.favDisplay === "fav-tracks" && state.currentProfile.favoriteTracks.length > 1) &&
                            <div className="has-text-centered">
                                {
                                    state.profileDisplay.favTracksPage !== 0 &&
                                    <span onClick={handlePrevious} data-value="favTracksPage" className="profile-arrow">&larr;</span>
                                }
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {
                                    state.profileDisplay.favTracksPage !== state.currentProfile.favoriteTracks.length - 1 &&
                                    <span onClick={handleNext} data-value="favTracksPage" className="profile-arrow">&rarr;</span>
                                }
                            </div>
                        }
                        </article>
                    </div>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child notification is-info">
                        <p className="title">Ratings</p>
                        <p className="subtitle"><span onClick={handleRatedDisplay} className="profile-tabs" data-value="rated-albums">Albums({state.currentProfile.ratedAlbumsLength})</span> | <span onClick={handleRatedDisplay} className="profile-tabs" data-value="rated-tracks">Tracks({state.currentProfile.ratedTracksLength})</span></p>
                            {
                                (state.profileDisplay.ratedDisplay === "rated-albums" && state.currentProfile.albumRatings.length !== 0) &&

                                state.currentProfile.albumRatings[state.profileDisplay.ratedAlbumsPage].map((album, index) =>
                                    <div key={index} className="column">
                                        <Link to={`/album/${album.id}`} style={{ textDecoration: 'none' }}>{album.name}</Link> by <Link to={`/artist/${album.artist}/${album.artistID}`} style={{ textDecoration: 'none' }}>{album.artist}</Link>
                                        <ProfileStars rating={album.rating} index={index}/>
                                    </div>
                                )
                            }
                            {
                                (state.profileDisplay.ratedDisplay === "rated-tracks" && state.currentProfile.trackRatings.length !== 0) &&

                                state.currentProfile.trackRatings[state.profileDisplay.ratedTracksPage].map((track, index) =>
                                    <div key={index} className="column">
                                        <Link to={`/track/${track.name}/${track.id}`} style={{ textDecoration: 'none' }}>{track.name}</Link> by <Link to={`/artist/${track.artist}/${track.artistID}`} style={{ textDecoration: 'none' }}>{track.artist}</Link>
                                        <ProfileStars rating={track.rating} index={index}/>
                                    </div>
                                )
                            }
                            {
                                (state.profileDisplay.ratedDisplay === "rated-albums" && state.currentProfile.albumRatings.length > 1) &&
                                <div className="has-text-centered">
                                    {
                                        state.profileDisplay.ratedAlbumsPage !== 0 &&
                                        <span onClick={handlePrevious} data-value="ratedAlbumsPage" className="profile-arrow">&larr;</span>
                                    }
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {
                                        state.profileDisplay.ratedAlbumsPage !== state.currentProfile.albumRatings.length - 1 &&
                                        <span onClick={handleNext} data-value="ratedAlbumsPage" className="profile-arrow">&rarr;</span>
                                    }
                                </div>
                            }
                            {
                                (state.profileDisplay.ratedDisplay === "rated-tracks" && state.currentProfile.trackRatings.length > 1) &&
                                <div className="has-text-centered">
                                    {
                                        state.profileDisplay.ratedTracksPage !== 0 &&
                                        <span onClick={handlePrevious} data-value="ratedTracksPage" className="profile-arrow">&larr;</span>
                                    }
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {
                                        state.profileDisplay.ratedTracksPage !== state.currentProfile.trackRatings.length - 1 &&
                                        <span onClick={handleNext} data-value="ratedTracksPage" className="profile-arrow">&rarr;</span>
                                    }
                                </div>
                            }
                    </article>
                </div>
            </div>
        </Box>
    );
}

export default User;