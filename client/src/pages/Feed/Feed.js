import React, { useEffect } from "react";
import "./Feed.css";
import { useProjectContext } from "../../utils/Store";
import { Link, useParams } from "react-router-dom";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";
import FeedCard from "../../components/FeedCard/FeedCard";

const Feed = () => {
    const [state, dispatch] = useProjectContext();

    useEffect(() => {
        API.checkFavorites(state.user.id).then(res => {
            let favArtists;
            let favAlbums;
            let favTracks;
            let ratedAlbums;
            let ratedTracks;
            
            if(state.feedDisplay === "1" && (state.feed === "📊 Album Reviews 📊" || state.feed === "📊 Track Reviews 📊")){
                favArtists = res.data.favoriteArtists;
                favAlbums = res.data.favoriteAlbums;
                favTracks = res.data.favoriteTracks;
                ratedAlbums = res.data.albumRatings.filter(rating => rating.rating === 1);
                ratedTracks = res.data.trackRatings.filter(rating => rating.rating === 1);
            }
            else if(state.feedDisplay === "2" && (state.feed === "📊 Album Reviews 📊" || state.feed === "📊 Track Reviews 📊")){
                favArtists = res.data.favoriteArtists;
                favAlbums = res.data.favoriteAlbums;
                favTracks = res.data.favoriteTracks;
                ratedAlbums = res.data.albumRatings.filter(rating => rating.rating === 2);
                ratedTracks = res.data.trackRatings.filter(rating => rating.rating === 2);
            }
            else if(state.feedDisplay === "3" && (state.feed === "📊 Album Reviews 📊" || state.feed === "📊 Track Reviews 📊")){
                favArtists = res.data.favoriteArtists;
                favAlbums = res.data.favoriteAlbums;
                favTracks = res.data.favoriteTracks;
                ratedAlbums = res.data.albumRatings.filter(rating => rating.rating === 3);
                ratedTracks = res.data.trackRatings.filter(rating => rating.rating === 3);
            }
            else if(state.feedDisplay === "4" && (state.feed === "📊 Album Reviews 📊" || state.feed === "📊 Track Reviews 📊")){
                favArtists = res.data.favoriteArtists;
                favAlbums = res.data.favoriteAlbums;
                favTracks = res.data.favoriteTracks;
                ratedAlbums = res.data.albumRatings.filter(rating => rating.rating === 4);
                ratedTracks = res.data.trackRatings.filter(rating => rating.rating === 4);
            }
            else if(state.feedDisplay === "5" && (state.feed === "📊 Album Reviews 📊" || state.feed === "📊 Track Reviews 📊")){
                favArtists = res.data.favoriteArtists;
                favAlbums = res.data.favoriteAlbums;
                favTracks = res.data.favoriteTracks;
                ratedAlbums = res.data.albumRatings.filter(rating => rating.rating === 5);
                ratedTracks = res.data.trackRatings.filter(rating => rating.rating === 5);
            }
            else if(state.feedDisplay === "Lowest" && (state.feed === "📊 Album Reviews 📊" || state.feed === "📊 Track Reviews 📊")){
                favArtists = res.data.favoriteArtists;
                favAlbums = res.data.favoriteAlbums;
                favTracks = res.data.favoriteTracks;
                ratedAlbums = res.data.albumRatings.sort((a, b) => { return (a.rating < b.rating ? -1 : (a.rating > b.rating) ? 1 : 0) });
                ratedTracks = res.data.trackRatings.sort((a, b) => { return (a.rating < b.rating ? -1 : (a.rating > b.rating) ? 1 : 0) });
            }
            else if(state.feedDisplay === "Highest" && (state.feed === "📊 Album Reviews 📊" || state.feed === "📊 Track Reviews 📊")){
                favArtists = res.data.favoriteArtists;
                favAlbums = res.data.favoriteAlbums;
                favTracks = res.data.favoriteTracks;
                ratedAlbums = res.data.albumRatings.sort((a, b) => { return (a.rating > b.rating ? -1 : (a.rating < b.rating) ? 1 : 0) });
                ratedTracks = res.data.trackRatings.sort((a, b) => { return (a.rating > b.rating ? -1 : (a.rating < b.rating) ? 1 : 0) });
            }
            else if(state.feedDisplay === "Alphabetical"){
                favArtists = res.data.favoriteArtists.sort((a, b) => { return (a.artist.toLowerCase() < b.artist.toLowerCase() ? -1 : (a.artist.toLowerCase() > b.artist.toLowerCase()) ? 1 : 0) });
                favAlbums = res.data.favoriteAlbums.sort((a, b) => { return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0) });
                favTracks = res.data.favoriteTracks.sort((a, b) => { return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0) });
                ratedAlbums = res.data.albumRatings.sort((a, b) => { return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0) });
                ratedTracks = res.data.trackRatings.sort((a, b) => { return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0) });
            }
            else if(state.feedDisplay === "Oldest"){
                favArtists = res.data.favoriteArtists.sort((a, b) => { return (a.date.toLowerCase() < b.date.toLowerCase() ? -1 : (a.date.toLowerCase() > b.date.toLowerCase()) ? 1 : 0) });
                favAlbums = res.data.favoriteAlbums.sort((a, b) => { return (a.date.toLowerCase() < b.date.toLowerCase() ? -1 : (a.date.toLowerCase() > b.date.toLowerCase()) ? 1 : 0) });
                favTracks = res.data.favoriteTracks.sort((a, b) => { return (a.date.toLowerCase() < b.date.toLowerCase() ? -1 : (a.date.toLowerCase() > b.date.toLowerCase()) ? 1 : 0) });
                ratedAlbums = res.data.albumRatings.sort((a, b) => { return (a.date.toLowerCase() < b.date.toLowerCase() ? -1 : (a.date.toLowerCase() > b.date.toLowerCase()) ? 1 : 0) });
                ratedTracks = res.data.trackRatings.sort((a, b) => { return (a.date.toLowerCase() < b.date.toLowerCase() ? -1 : (a.date.toLowerCase() > b.date.toLowerCase()) ? 1 : 0) });
            }
            else{
                favArtists = res.data.favoriteArtists.sort((a, b) => { return (a.date.toLowerCase() > b.date.toLowerCase() ? -1 : (a.date.toLowerCase() < b.date.toLowerCase()) ? 1 : 0) });
                favAlbums = res.data.favoriteAlbums.sort((a, b) => { return (a.date.toLowerCase() > b.date.toLowerCase() ? -1 : (a.date.toLowerCase() < b.date.toLowerCase()) ? 1 : 0) });
                favTracks = res.data.favoriteTracks.sort((a, b) => { return (a.date.toLowerCase() > b.date.toLowerCase() ? -1 : (a.date.toLowerCase() < b.date.toLowerCase()) ? 1 : 0) });
                ratedAlbums = res.data.albumRatings.sort((a, b) => { return (a.date.toLowerCase() > b.date.toLowerCase() ? -1 : (a.date.toLowerCase() < b.date.toLowerCase()) ? 1 : 0) });
                ratedTracks = res.data.trackRatings.sort((a, b) => { return (a.date.toLowerCase() > b.date.toLowerCase() ? -1 : (a.date.toLowerCase() < b.date.toLowerCase()) ? 1 : 0) });
            }

            if(state.feed === "📊 Album Reviews 📊" || state.feed === "📊 Track Reviews 📊"){
                dispatch({
                    type: "UPDATE_FEED",
                    favoriteArtists: favArtists,
                    favoriteAlbums: favAlbums,
                    favoriteTracks: favTracks,
                    ratedAlbums: ratedAlbums,
                    ratedTracks: ratedTracks,
                    feedDisplay: state.feedDisplay
                 });
            }
            else{
                dispatch({
                    type: "UPDATE_FEED",
                    favoriteArtists: favArtists,
                    favoriteAlbums: favAlbums,
                    favoriteTracks: favTracks,
                    ratedAlbums: ratedAlbums,
                    ratedTracks: ratedTracks,
                    feedDisplay: state.feedDisplay
                 });
            }
         });
    }, []);

    const handleFeedChange = event => {
        const feed = event.currentTarget.getAttribute("name");

        API.checkFavorites(state.user.id).then(res => {
            if((state.feedDisplay === "Highest" || state.feedDisplay === "Lowest" || state.feedDisplay === "1" || state.feedDisplay === "2" || state.feedDisplay === "3" || state.feedDisplay === "4" || state.feedDisplay === "5") && (feed === "❤️ Favorite Artists ❤️" || feed === "❤️ Favorite Albums ❤️" || feed === "❤️ Favorite Tracks ❤️")){
                dispatch({
                    type: "UPDATE_FEED_STATE",
                    feed: feed,
                    favoriteArtists: res.data.favoriteArtists,
                    favoriteAlbums: res.data.favoriteAlbums,
                    favoriteTracks: res.data.favoriteTracks,
                    ratedAlbums: res.data.albumRatings,
                    ratedTracks: res.data.trackRatings,
                    feedDisplay: "Oldest"
                });
            }
            else{
                dispatch({
                    type: "UPDATE_FEED_STATE",
                    feed: feed,
                    feedDisplay: state.feedDisplay
                });
            }
        });
    }

    const sortFeed = event => {
        const { name } = event.currentTarget;
        let favArtists;
        let favAlbums;
        let favTracks;
        let ratedAlbums;
        let ratedTracks;

        API.checkFavorites(state.user.id).then(res => {
            switch(name){
                case "Alphabetical":
                    favArtists = res.data.favoriteArtists.sort((a, b) => { return (a.artist.toLowerCase() < b.artist.toLowerCase() ? -1 : (a.artist.toLowerCase() > b.artist.toLowerCase()) ? 1 : 0) });
                    favAlbums = res.data.favoriteAlbums.sort((a, b) => { return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0) });
                    favTracks = res.data.favoriteTracks.sort((a, b) => { return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0) });
                    ratedAlbums = res.data.albumRatings.sort((a, b) => { return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0) });
                    ratedTracks = res.data.trackRatings.sort((a, b) => { return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0) });
                    break;
                case "Oldest":
                    favArtists = res.data.favoriteArtists.sort((a, b) => { return (a.date.toLowerCase() < b.date.toLowerCase() ? -1 : (a.date.toLowerCase() > b.date.toLowerCase()) ? 1 : 0) });
                    favAlbums = res.data.favoriteAlbums.sort((a, b) => { return (a.date.toLowerCase() < b.date.toLowerCase() ? -1 : (a.date.toLowerCase() > b.date.toLowerCase()) ? 1 : 0) });
                    favTracks = res.data.favoriteTracks.sort((a, b) => { return (a.date.toLowerCase() < b.date.toLowerCase() ? -1 : (a.date.toLowerCase() > b.date.toLowerCase()) ? 1 : 0) });
                    ratedAlbums = res.data.albumRatings.sort((a, b) => { return (a.date.toLowerCase() < b.date.toLowerCase() ? -1 : (a.date.toLowerCase() > b.date.toLowerCase()) ? 1 : 0) });
                    ratedTracks = res.data.trackRatings.sort((a, b) => { return (a.date.toLowerCase() < b.date.toLowerCase() ? -1 : (a.date.toLowerCase() > b.date.toLowerCase()) ? 1 : 0) });
                    break;
                case "Newest":
                    favArtists = res.data.favoriteArtists.sort((a, b) => { return (a.date.toLowerCase() > b.date.toLowerCase() ? -1 : (a.date.toLowerCase() < b.date.toLowerCase()) ? 1 : 0) });
                    favAlbums = res.data.favoriteAlbums.sort((a, b) => { return (a.date.toLowerCase() > b.date.toLowerCase() ? -1 : (a.date.toLowerCase() < b.date.toLowerCase()) ? 1 : 0) });
                    favTracks = res.data.favoriteTracks.sort((a, b) => { return (a.date.toLowerCase() > b.date.toLowerCase() ? -1 : (a.date.toLowerCase() < b.date.toLowerCase()) ? 1 : 0) });
                    ratedAlbums = res.data.albumRatings.sort((a, b) => { return (a.date.toLowerCase() > b.date.toLowerCase() ? -1 : (a.date.toLowerCase() < b.date.toLowerCase()) ? 1 : 0) });
                    ratedTracks = res.data.trackRatings.sort((a, b) => { return (a.date.toLowerCase() > b.date.toLowerCase() ? -1 : (a.date.toLowerCase() < b.date.toLowerCase()) ? 1 : 0) });
                    break;
                case "1":
                    favArtists = res.data.favoriteArtists;
                    favAlbums = res.data.favoriteAlbums;
                    favTracks = res.data.favoriteTracks;
                    ratedAlbums = res.data.albumRatings.filter(rating => rating.rating === 1);
                    ratedTracks = res.data.trackRatings.filter(rating => rating.rating === 1);
                    break;
                case "2":
                    favArtists = res.data.favoriteArtists;
                    favAlbums = res.data.favoriteAlbums;
                    favTracks = res.data.favoriteTracks;
                    ratedAlbums = res.data.albumRatings.filter(rating => rating.rating === 2);
                    ratedTracks = res.data.trackRatings.filter(rating => rating.rating === 2);
                    break;
                case "3":
                    favArtists = res.data.favoriteArtists;
                    favAlbums = res.data.favoriteAlbums;
                    favTracks = res.data.favoriteTracks;
                    ratedAlbums = res.data.albumRatings.filter(rating => rating.rating === 3);
                    ratedTracks = res.data.trackRatings.filter(rating => rating.rating === 3);
                    break;
                case "4":
                    favArtists = res.data.favoriteArtists;
                    favAlbums = res.data.favoriteAlbums;
                    favTracks = res.data.favoriteTracks;
                    ratedAlbums = res.data.albumRatings.filter(rating => rating.rating === 4);
                    ratedTracks = res.data.trackRatings.filter(rating => rating.rating === 4);
                    break;
                case "5":
                    favArtists = res.data.favoriteArtists;
                    favAlbums = res.data.favoriteAlbums;
                    favTracks = res.data.favoriteTracks;
                    ratedAlbums = res.data.albumRatings.filter(rating => rating.rating === 5);
                    ratedTracks = res.data.trackRatings.filter(rating => rating.rating === 5);
                    break;
                case "Lowest":
                    favArtists = res.data.favoriteArtists;
                    favAlbums = res.data.favoriteAlbums;
                    favTracks = res.data.favoriteTracks;
                    ratedAlbums = res.data.albumRatings.sort((a, b) => { return (a.rating < b.rating ? -1 : (a.rating > b.rating) ? 1 : 0) });
                    ratedTracks = res.data.trackRatings.sort((a, b) => { return (a.rating < b.rating ? -1 : (a.rating > b.rating) ? 1 : 0) });
                    break;
                case "Highest":
                    favArtists = res.data.favoriteArtists;
                    favAlbums = res.data.favoriteAlbums;
                    favTracks = res.data.favoriteTracks;
                    ratedAlbums = res.data.albumRatings.sort((a, b) => { return (a.rating > b.rating ? -1 : (a.rating < b.rating) ? 1 : 0) });
                    ratedTracks = res.data.trackRatings.sort((a, b) => { return (a.rating > b.rating ? -1 : (a.rating < b.rating) ? 1 : 0) });
                    break;
                default:
                    return;
            }

            dispatch({
                type: "UPDATE_FEED",
                favoriteArtists: favArtists,
                favoriteAlbums: favAlbums,
                favoriteTracks: favTracks,
                ratedAlbums: ratedAlbums,
                ratedTracks: ratedTracks,
                feedDisplay: name
            });
        });
    }

    return(
        <Box>
            {console.log(state)}
            <Column>
                <div className="column is-2">
                    <Box>
                        <aside className="menu has-text-centered">
                            <p className="menu-label">
                                ❤️ Your Favorites ❤️
                            </p>
                            <ul className="menu-list">
                                <a href="#" onClick={handleFeedChange} name="❤️ Favorite Artists ❤️"><li>Artists</li></a>
                                <a href="#" onClick={handleFeedChange} name="❤️ Favorite Albums ❤️"><li>Albums</li></a>
                                <a href="#" onClick={handleFeedChange} name="❤️ Favorite Tracks ❤️"><li>Tracks</li></a>
                            </ul>
                            <br/>
                            <p className="menu-label">
                                📊 Your Reviews 📊
                            </p>
                            <ul className="menu-list">
                                <a href="#" onClick={handleFeedChange} name="📊 Album Reviews 📊"><li>Albums</li></a>
                                <a href="#" onClick={handleFeedChange} name="📊 Track Reviews 📊"><li>Tracks</li></a>
                            </ul>

                            <br/>

                            {
                                state.feed === "❤️ Favorite Artists ❤️" || state.feed === "❤️ Favorite Albums ❤️" || state.feed === "❤️ Favorite Tracks ❤️"
                                ?
                                <div className="dropdown is-hoverable">
                                    <div className="dropdown-trigger">
                                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                                        <span>{state.feedDisplay}</span>
                                        <span className="icon is-small">
                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                                        <div className="dropdown-content">
                                            <a href="#" className="dropdown-item" onClick={sortFeed} name="Alphabetical">
                                                Alphabetical
                                            </a>
                                            <a href="#" className="dropdown-item" onClick={sortFeed} name="Newest">
                                                Newest
                                            </a>
                                            <a href="#" className="dropdown-item" onClick={sortFeed} name="Oldest">
                                                Oldest
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="dropdown is-hoverable">
                                    <div className="dropdown-trigger">
                                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                                        <span>{state.feedDisplay}</span>
                                        <span className="icon is-small">
                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                                        <div className="dropdown-content">
                                            <a href="#" className="dropdown-item" onClick={sortFeed} name="Alphabetical">
                                                Alphabetical
                                            </a>
                                            <a href="#" className="dropdown-item" onClick={sortFeed} name="Newest">
                                                Newest
                                            </a>
                                            <a href="#" className="dropdown-item" onClick={sortFeed} name="Oldest">
                                                Oldest
                                            </a>
                                            <a href="#" className="dropdown-item" onClick={sortFeed} name="Highest">
                                                Highest
                                            </a>
                                            <a href="#" className="dropdown-item" onClick={sortFeed} name="Lowest">
                                                Lowest
                                            </a>
                                            <a href="#" className="dropdown-item" onClick={sortFeed} name="1">
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                            </a>
                                            <a href="#" className="dropdown-item" onClick={sortFeed} name="2">
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                            </a>
                                            <a href="#" className="dropdown-item" onClick={sortFeed} name="3">
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                            </a>
                                            <a href="#" className="dropdown-item" onClick={sortFeed} name="4">
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                            </a>
                                            <a href="#" className="dropdown-item" onClick={sortFeed} name="5">
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                                <span className="icon has-text-warning">
                                                    <i className="fas fa-star user-rating-feed"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            }
                        </aside>
                    </Box>            
                </div>

                <div className="column is-8">
                    <Box>
                        <h1 className="has-text-centered title">{state.feed}</h1>
                        <div className="columns is-multiline">
                            {
                                state.favoriteArtists.length && state.feed === "❤️ Favorite Artists ❤️"
                                ?
                                state.favoriteArtists.map((item, index) => 
                                    <FeedCard
                                        key={index}
                                        artist={item.artist}
                                        artistID={item.artistID}
                                        image={item.image}
                                        type={"artist"}
                                    />
                                )
                                :
                                null
                            }
                            {
                                state.favoriteAlbums.length && state.feed === "❤️ Favorite Albums ❤️"
                                ?
                                state.favoriteAlbums.map((item, index) => 
                                    <FeedCard
                                        key={index}
                                        album={item.name}
                                        albumID={item.id}
                                        artist={item.artist}
                                        artistID={item.artistID}
                                        image={item.image}
                                        type={"album"}
                                    />
                                )
                                :
                                null
                            }
                            {
                                state.favoriteTracks.length && state.feed === "❤️ Favorite Tracks ❤️"
                                ?
                                state.favoriteTracks.map((item, index) => 
                                    <FeedCard
                                        key={index}
                                        track={item.name}
                                        trackID={item.id}
                                        artist={item.artist}
                                        artistID={item.artistID}
                                        image={item.image}
                                        type={"track"}
                                    />
                                )
                                :
                                null
                            }
                            {
                                state.ratedAlbums.length && state.feed === "📊 Album Reviews 📊"
                                ?
                                state.ratedAlbums.map((item, index) => 
                                    <FeedCard
                                        key={index}
                                        album={item.name}
                                        albumID={item.id}
                                        artist={item.artist}
                                        artistID={item.artistID}
                                        image={item.image}
                                        rating={item.rating}
                                        type={"album review"}
                                    />
                                )
                                :
                                null
                            }
                            {
                                state.ratedTracks.length && state.feed === "📊 Track Reviews 📊"
                                ?
                                state.ratedTracks.map((item, index) => 
                                    <FeedCard
                                        key={index}
                                        track={item.name}
                                        trackID={item.id}
                                        artist={item.artist}
                                        artistID={item.artistID}
                                        image={item.image}
                                        rating={item.rating}
                                        type={"track review"}
                                    />
                                )
                                :
                                null
                            }
                        </div>                          
                    </Box>
                </div>
            </Column>
        </Box>
    );
}

export default Feed;