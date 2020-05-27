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
                                <li><a name="Album" href="#">Albums</a></li>
                                <li><a name="Track" href="#">Tracks</a></li>
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
                            (state.artistSearchResults.length && state.searchDisplay === "Artist") &&
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
                    </Box>
                </div>
            </Column>
        </Box>
    );
}

export default Search;