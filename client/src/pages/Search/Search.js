import React, { useEffect } from "react";
import { useProjectContext } from "../../utils/Store";
import { useParams } from "react-router-dom";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";
import SearchCard from "../../components/SearchCard/SearchCard";

const Search = () => {
    const [state, dispatch] = useProjectContext();
    const { search } = useParams();

    useEffect(() => {
        dispatch({
            type: "UPDATE_NAV",
            navState: "is-success"
        });

        if(!state.token.length){
            API.getToken().then(res => {
                API.search(search, res.data.access_token).then(res => {
                    dispatch({
                        type: "UPDATE_SEARCH_RESULTS",
                        artistSearchResults: res.data.artists.items,
                        albumSearchResults: res.data.albums.items,
                        trackSearchResults: res.data.tracks.items,
                        token: res.data.access_token
                    });
                });
            });
        }
        else{
            API.search(search, state.token).then(res => {
                dispatch({
                    type: "UPDATE_SEARCH_RESULTS",
                    artistSearchResults: res.data.artists.items,
                    albumSearchResults: res.data.albums.items,
                    trackSearchResults: res.data.tracks.items
                });
            });
        }
    }, [search]);

    const handleSearchDisplayChange = event => {
        const { name } = event.target;

        dispatch({
            type: "UPDATE_SEARCH_DISPLAY",
            searchDisplay: name
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
                                Search instead for
                            </p>
                            <ul className="menu-list">
                                {
                                    state.searchDisplay === "Artist" &&
                                    <div>
                                        <li><a onClick={handleSearchDisplayChange} name="Album" href="#">Albums</a></li>
                                        <li><a onClick={handleSearchDisplayChange} name="Track" href="#">Tracks</a></li>
                                    </div>
                                }
                                {
                                    state.searchDisplay === "Album" &&
                                    <div>
                                        <li><a onClick={handleSearchDisplayChange} name="Artist" href="#">Artists</a></li>
                                        <li><a onClick={handleSearchDisplayChange} name="Track" href="#">Tracks</a></li>
                                    </div>
                                }
                                {
                                    state.searchDisplay === "Track" &&
                                    <div>
                                        <li><a onClick={handleSearchDisplayChange} name="Artist" href="#">Artists</a></li>
                                        <li><a onClick={handleSearchDisplayChange} name="Album" href="#">Albums</a></li>
                                    </div>
                                }
                            </ul>
                        </aside>
                    </Box>
                </div>
                <div className="column is-8">
                    <Box>
                        <p className="title has-text-centered">
                            {state.searchDisplay} search results for "{search}"
                        </p>
                        {
                            (state.artistSearchResults.length !==0 && state.searchDisplay === "Artist") &&
                            state.artistSearchResults.map((artist, index) =>
                                <SearchCard
                                    key={index}
                                    artist={artist.name}
                                    artistID={artist.id}
                                    genre={artist.genres}
                                    image={artist.images.length ? artist.images[0].url : "https://i.imgur.com/QbHZ4uj.png"}
                                />
                            )
                        }
                        {
                            (state.albumSearchResults.length !== 0 && state.searchDisplay === "Album") &&
                            state.albumSearchResults.map((album, index) =>
                                <SearchCard
                                    key={index}
                                    artist={album.artists[0].name}
                                    artistID={album.artists[0].id}
                                    album={album.name}
                                    albumID={album.id}
                                    image={album.images.length ? album.images[0].url : "https://i.imgur.com/QbHZ4uj.png"}
                                />
                            )
                        }
                        {
                            (state.trackSearchResults.length !==0 && state.searchDisplay === "Track") &&
                            state.trackSearchResults.map((track, index) =>
                                <SearchCard
                                    key={index}
                                    artist={track.artists[0].name}
                                    artistID={track.artists[0].id}
                                    track={track.name}
                                    trackID={track.id}
                                    image={track.album.images.length ? track.album.images[0].url : "https://i.imgur.com/QbHZ4uj.png"}
                                />
                            )
                        }
                    </Box>
                </div>
            </Column>
        </Box>
    );
}

export default Search;