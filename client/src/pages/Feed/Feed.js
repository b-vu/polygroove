import React, { useEffect } from "react";
import "./Feed.css";
import { useProjectContext } from "../../utils/Store";
import { Link, useParams } from "react-router-dom";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";

const Feed = () => {
    const [state, dispatch] = useProjectContext();

    useEffect(() => {
        getList();
    }, []);

    const getList = () => {
        const id = state.user.id;

        API.checkFavorites(id).then(res => {
            dispatch({
                type: "UPDATE_FEED",
                favoriteArtists: res.data.favoriteArtists,
                favoriteAlbums: res.data.favoriteAlbums,
                favoriteTracks: res.data.favoriteTracks,
                ratedAlbums: res.data.albumRatings,
                ratedTracks: res.data.trackRatings
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
                                Your Favorites
                            </p>
                            <ul className="menu-list">
                                <a href="#"><li>Artists</li></a>
                                <a href="#"><li>Albums</li></a>
                                <a href="#"><li>Tracks</li></a>
                            </ul>
                            <br/>
                            <p className="menu-label">
                                Your Reviews
                            </p>
                            <ul className="menu-list">
                                <a href="#"><li>Albums</li></a>
                                <a href="#"><li>Tracks</li></a>
                            </ul>
                        </aside>
                    </Box>            
                </div>

                <div className="column is-8">
                    <Box>
                        <Column>
                            <div className="column is-5">
                                
                            </div>
                            <div className="column is-7">
                                {
                                    state.feed
                                }
                            </div>
                        </Column>
                    </Box>
                </div>
            </Column>
        </Box>
    );
}

export default Feed;