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
            dispatch({
                type: "UPDATE_FEED",
                favoriteArtists: res.data.favoriteArtists,
                favoriteAlbums: res.data.favoriteAlbums,
                favoriteTracks: res.data.favoriteTracks,
                ratedAlbums: res.data.albumRatings,
                ratedTracks: res.data.trackRatings
            });
        });
    }, []);

    const handleFeedChange = event => {
        const feed = event.currentTarget.getAttribute("name");

        let feedDisplayArr;

        switch(feed){
            case "❤️ Favorite Artists ❤️":
                feedDisplayArr = state.favoriteArtists;
                break;
            case "favAlbums":
                feedDisplayArr = state.favoriteAlbums;
                break;
            case "favTracks":
                feedDisplayArr = state.favoriteTracks;
                break;
            case "albumReviews":
                feedDisplayArr = state.ratedAlbums;
                break;
            default:
                feedDisplayArr = state.ratedTracks;
        }

        dispatch({
            type: "UPDATE_FEED_STATE",
            feed: feed
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
                                <a href="#" onClick={handleFeedChange} name="favAlbums"><li>Albums</li></a>
                                <a href="#" onClick={handleFeedChange} name="favTracks"><li>Tracks</li></a>
                            </ul>
                            <br/>
                            <p className="menu-label">
                                Your Reviews
                            </p>
                            <ul className="menu-list">
                                <a href="#" onClick={handleFeedChange} name="albumReviews"><li>Albums</li></a>
                                <a href="#" onClick={handleFeedChange} name="trackReviews"><li>Tracks</li></a>
                            </ul>
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
                                        name={item.name ? item.name : null}
                                        artist={item.artist}
                                        artistID={item.artistID}
                                        id={item.id ? item.id : null}
                                        image={item.image}
                                        rating={item.rating ? item.rating : null}
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