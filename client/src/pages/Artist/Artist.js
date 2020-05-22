import React, { useEffect } from "react";
import "./Artist.css";
import { useParams } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";
import Tracks from "../../components/Tracks/Tracks";
import Albums from "../../components/Albums/Albums";
import Related from "../../components/Related/Related";

const Artist = () => {
    const [state, dispatch] = useProjectContext();

    const { name, id } = useParams();

    useEffect(() => {
        const artistInfo = {};
        const geniusInfo = {};

        if(!state.token.length){
            API.getToken().then(res => {
                dispatch({
                    type: "UPDATE_TOKEN",
                    token: res.data.access_token
                });
            })
        }

        API.getGeniusArtistInfo(name).then(res => {
            geniusInfo.desc = res.data.response.artist.description.plain;
            geniusInfo.fb = res.data.response.artist.facebook_name;
            geniusInfo.ig = res.data.response.artist.instagram_name;
            geniusInfo.tw = res.data.response.artist.twitter_name;

            dispatch({
                type: "UPDATE_CURRENT_ARTIST_INFO",
                currentArtistInfo: geniusInfo
            });
        });

        API.getArtistInfo(id, state.token, name).then(res => {
            artistInfo.id = res[0].data.id;
            artistInfo.image = res[0].data.images[0].url;
            artistInfo.name = res[0].data.name;
            artistInfo.spotifyLink = res[0].data.external_urls.spotify;
            artistInfo.genres = res[0].data.genres;
            
            const albums = [];
            const albumNames = [];
            for(const album of res[1].data.items){
                if(albumNames.indexOf(album.name) === -1){
                    albums.push(album);
                    albumNames.push(album.name)
                }
            }

            artistInfo.albums = albums;

            artistInfo.topTracks = res[2].data.tracks;

            const relatedArtists = [];
            for(let i = 0; i < 10; i++){
                relatedArtists.push(res[3].data.artists[i])
            }
            artistInfo.relatedArtists = relatedArtists;

            dispatch({
                type: "UPDATE_CURRENT_ARTIST",
                currentArtist: artistInfo
            });
        })
    }, [id])

    return(
        <Box>
            {console.log(state)}
            <Column>
                <div className="column is-2">
                    <Box>
                        <aside className="menu">
                            <p className="menu-label">
                                Hot & Trending
                            </p>
                            <ul className="menu-list">
                                <li><a name="US Top 50" href="#">US Top 50</a></li>
                            </ul>
                            <p className="menu-label">
                                By Genre
                            </p>
                            <ul className="menu-list">

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
                                    state.currentArtistInfo
                                    ?
                                    <p>
                                        {state.currentArtistInfo.desc}
                                    </p>
                                    :
                                    null
                                }
                                {
                                    state.currentArtist.genres
                                    ?
                                    <div>
                                        <br/>
                                        <p><strong>Genre:</strong>&nbsp;
                                        {state.currentArtist.genres.map((genre, index) => 
                                            <span key={index}>{ (index ? ', ' : '') + genre }</span>
                                        )}
                                        </p>
                                    </div>
                                    :
                                    null
                                }
                                {
                                    state.currentArtist.spotifyLink
                                    ?
                                    <span>
                                        <a href={state.currentArtist.spotifyLink}>Spotify</a>
                                    </span>
                                    :
                                    null
                                }
                                {
                                    state.currentArtistInfo.tw
                                    ?
                                    <span>
                                    <a href={"http://twitter.com/" + state.currentArtistInfo.tw}>&nbsp;Twitter</a>
                                    </span>
                                    :
                                    null
                                }
                                {
                                    state.currentArtistInfo.ig
                                    ?
                                    <span>
                                    <a href={"http://instagram.com/" + state.currentArtistInfo.ig}>&nbsp;Instagram</a>
                                    </span>
                                    :
                                    null
                                }
                                {
                                    state.currentArtistInfo.fb
                                    ?
                                    <span>
                                    <a href={"http://facebook.com/" + state.currentArtistInfo.fb}>&nbsp;Facebook</a>
                                    </span>
                                    :
                                    null
                                }
                            </div>
                        </Column>
                        <Column>
                            <div className="column is-6">
                                <h1 className="title has-text-centered">Top Tracks</h1>
                                {
                                    state.currentArtist.topTracks
                                    ?
                                    <div>
                                        {state.currentArtist.topTracks.map((track, index) => 
                                            <Tracks
                                                key={index}
                                                song={track.name}
                                                album={track.album.name}
                                                image={track.album.images[0].url}
                                                year={track.album.release_date}
                                                duration={track.duration_ms}
                                            />
                                        )}
                                    </div>
                                    :
                                    null
                                }
                            </div>

                            <div className="column is-6">
                                <h1 className="title has-text-centered">Albums</h1>
                                {
                                    state.currentArtist.albums
                                    ?
                                    <div>
                                        {state.currentArtist.albums.map((album, index) => 
                                            <Albums
                                                key={index}
                                                album={album.name}
                                                image={album.images[0].url}
                                                releaseDate={album.release_date}
                                                tracks={album.total_tracks}
                                                albumID={album.id}
                                            />
                                        )}
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
                        <Related
                            artists={state.currentArtist.relatedArtists}
                        />
                    </Box>            
                </div>
            </Column>
        </Box>
    );
}

export default Artist;