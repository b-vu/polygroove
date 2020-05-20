import React, { useEffect } from "react";
import "./Artist.css";
import { useParams } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";
import Container from "../../components/Container/Container";

const Artist = () => {
    const [state, dispatch] = useProjectContext();

    const { id } = useParams();

    useEffect(() => {
        const artistInfo = {};

        API.getArtistInfo(id, state.token).then(res => {
            artistInfo.id = res[0].data.id;
            artistInfo.image = res[0].data.images[0].url;
            artistInfo.name = res[0].data.name;
            artistInfo.spotifyLink = res[0].data.external_urls.spotify;
            artistInfo.genres = res[0].data.genres;

            artistInfo.albums = res[1].data.items;

            artistInfo.topTracks = res[2].data.tracks;

            artistInfo.relatedArtists = res[3].data.artists;

            dispatch({
                type: "UPDATE_CURRENT_ARTIST",
                currentArtist: artistInfo
            });
        })
    }, [])

    return(
        <Box>
            <Column>
                {console.log(state.currentArtist)}
                <div className="column is-2">
                    <Box>
                        <aside className="menu">
                            <p className="menu-label">
                                Hot & Trending
                            </p>
                            <ul className="menu-list">
                                <li><a name="US Top 50" href="#">US Top 50</a></li>
                                <li><a name="Global Top 50" href="#">Global Top 50</a></li>
                            </ul>
                            <p className="menu-label">
                                By Genre
                            </p>
                            <ul className="menu-list">
                                <li><a name="Hottest Hip Hop" href="#">Hip Hop</a></li>
                                <li><a name="Top Pop" href="#">Pop</a></li>
                                <li><a name="The Best In Indie" href="#">Indie</a></li>
                                <li><a name="Top Country Songs, y'all" href="#">Country</a></li>
                                <li><a name="Rockin' and Rollin'" href="#">Rock</a></li>
                                <li><a name="Top Kpop" href="#">Kpop</a></li>
                                <li><a name="Top EDM" href="#">EDM</a></li>
                                <li><a name="The Smoothest Jazz" href="#">Jazz</a></li>
                                <li><a name="Top Latin" href="#">Latin</a></li>
                                <li><a name="Kickass Metal" href="#">Metal</a></li>
                            </ul>
                        </aside>
                    </Box>            
                </div>

                <div className="column is-8">
                    <Box>
                        <h1 className="title has-text-centered">{state.currentArtist.name}</h1>
                        <Column>
                            <div className="column is-5">
                                <figure className="image artist-image">
                                    <img src={state.currentArtist.image}/>
                                </figure>
                            </div>
                            <div className="column is-7">
                                {
                                    state.currentArtist.genres
                                    ?
                                    <div>
                                        <p>Genre:&nbsp;
                                        {state.currentArtist.genres.map((genre, index) => 
                                            <span key={index}>{ (index ? ', ' : '') + genre }</span>
                                        )}
                                        </p>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </Column>
                        <Column>
                            <div className="column is-6">
                                {
                                    state.currentArtist.topTracks
                                    ?
                                    <div>
                                        <p>Genre:&nbsp;
                                        {state.currentArtist.topTracks.map((track, index) => 
                                            <span key={index}>{ (index ? ', ' : '') + track.name }</span>
                                        )}
                                        </p>
                                    </div>
                                    :
                                    null
                                }
                            </div>

                            <div className="column is-6">
                                {
                                    state.currentArtist.albums
                                    ?
                                    <div>
                                        <p>Genre:&nbsp;
                                        {state.currentArtist.albums.map((album, index) => 
                                            <span key={index}>{ (index ? ', ' : '') + album.name }</span>
                                        )}
                                        </p>
                                    </div>
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
                                Hot & Trending
                            </p>
                            <ul className="menu-list">
                                <li><a name="US Top 50" href="#">US Top 50</a></li>
                                <li><a name="Global Top 50" href="#">Global Top 50</a></li>
                            </ul>
                            <p className="menu-label">
                                By Genre
                            </p>
                            <ul className="menu-list">
                                <li><a name="Hottest Hip Hop" href="#">Hip Hop</a></li>
                                <li><a name="Top Pop" href="#">Pop</a></li>
                                <li><a name="The Best In Indie" href="#">Indie</a></li>
                                <li><a name="Top Country Songs, y'all" href="#">Country</a></li>
                                <li><a name="Rockin' and Rollin'" href="#">Rock</a></li>
                                <li><a name="Top Kpop" href="#">Kpop</a></li>
                                <li><a name="Top EDM" href="#">EDM</a></li>
                                <li><a name="The Smoothest Jazz" href="#">Jazz</a></li>
                                <li><a name="Top Latin" href="#">Latin</a></li>
                                <li><a name="Kickass Metal" href="#">Metal</a></li>
                            </ul>
                        </aside>
                    </Box>            
                </div>
            </Column>
        </Box>
    );
}

export default Artist;