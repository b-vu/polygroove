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

const parse = require("html-react-parser");

const Artist = () => {
    const [state, dispatch] = useProjectContext();

    const { name, id } = useParams();

    useEffect(() => {
        const artistInfo = {};
        const geniusInfo = {};

        if(!state.token.length){
            API.getToken().then(res => {
                API.getArtistInfo(id, res.data.access_token, name).then(res => {
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
        
                    if(res[3].data.artists.length){
                        const relatedArtists = [];
    
                        for(let i = 0; i < 10; i++){
                            relatedArtists.push(res[3].data.artists[i])
                        }
    
                        artistInfo.relatedArtists = relatedArtists;
                    }
        
                    dispatch({
                        type: "UPDATE_CURRENT_ARTIST",
                        currentArtist: artistInfo
                    });
                })

                dispatch({
                    type: "UPDATE_TOKEN",
                    token: res.data.access_token
                });
            })

            API.getGeniusArtistInfo(name).then(res => {
                const arr = res.data.response.artist.description.html.split("</p>");
                const newArr = [];
            
                for(let i = 0; i < arr.length - 1; i++){
                    const str = arr[i] + "</p><br/>";
                    newArr.push(str);
                }
    
                geniusInfo.desc = newArr;
                geniusInfo.fb = res.data.response.artist.facebook_name;
                geniusInfo.ig = res.data.response.artist.instagram_name;
                geniusInfo.tw = res.data.response.artist.twitter_name;
    
                dispatch({
                    type: "UPDATE_CURRENT_ARTIST_INFO",
                    currentArtistInfo: geniusInfo
                });
            });
        }

        else{
            API.getGeniusArtistInfo(name).then(res => {
                const arr = res.data.response.artist.description.html.split("</p>");
                const newArr = [];
            
                for(let i = 0; i < arr.length - 1; i++){
                    const str = arr[i] + "</p><br/>";
                    newArr.push(str);
                }

                geniusInfo.desc = newArr;
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

                if(res[3].data.artists.length){
                    const relatedArtists = [];

                    for(let i = 0; i < 10; i++){
                        relatedArtists.push(res[3].data.artists[i])
                    }

                    artistInfo.relatedArtists = relatedArtists;
                }

                dispatch({
                    type: "UPDATE_CURRENT_ARTIST",
                    currentArtist: artistInfo
                });
            });
        }

        if(state.isAuthenticated && !state.favoriteArtists.length){
            API.checkFavorites(state.user.id).then(res => {
                checkFavorites(res.data.favoriteArtists);
                dispatch({
                    type: "UPDATE_FAVORITE_ARTISTS",
                    favoriteArtists: res.data.favoriteArtists
                });
            });
        }
        else{
            checkFavorites(state.favoriteArtists);

        }
    }, [id]);

    const handleFavorite = event => {
        if(state.isAuthenticated){
            const btnState = event.currentTarget.getAttribute("data-state");
            
            if(btnState === "not-favorite"){
                API.addFavoriteArtist(state.user.id, { artist: state.currentArtist.name, artistID: state.currentArtist.id, image:state.currentArtist.image }).then(res => {
                    API.checkFavorites(state.user.id).then(res => {
                        checkFavorites(res.data.favoriteArtists);
                        dispatch({
                            type: "UPDATE_FAVORITE_ARTISTS",
                            favoriteArtists: res.data.favoriteArtists
                        });
                    });
                })
            }
            else{
                API.removeFavoriteArtist(state.user.id, { artistID: state.currentArtist.id }).then(res => {
                    API.checkFavorites(state.user.id).then(res => {
                        checkFavorites(res.data.favoriteArtists);
                        dispatch({
                            type: "UPDATE_FAVORITE_ARTISTS",
                            favoriteArtists: res.data.favoriteArtists
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
                type: "UPDATE_ISFAVORITEARTIST",
                isFavoriteArtist: false
            });
        }

        for(const artist of array){
            if(artist.artistID === id){
                return dispatch({
                    type: "UPDATE_ISFAVORITEARTIST",
                    isFavoriteArtist: true
                });
            }
            else{
                dispatch({
                    type: "UPDATE_ISFAVORITEARTIST",
                    isFavoriteArtist: false
                });
            }
        }
    }

    return(
        <Box>
            {console.log(state)}
            <Column>
                <div className="column is-2">
                    <Box>
                        <aside className="menu has-text-centered">
                            <br/>
                            {
                                state.isFavoriteArtist
                                ?
                                <button onClick={handleFavorite} data-state="favorite" data-not="button is-danger is-outlined is-rounded" data-is="button is-danger is-rounded favorite" className="button is-danger is-rounded favorite" id="fav-artist">
                                    <span>Favorited&nbsp; <i className='fas fa-heart'></i></span>
                                </button>
                                :
                                <button onClick={handleFavorite} data-state="not-favorite" data-not="button is-danger is-outlined is-rounded" data-is="button is-danger is-rounded favorite" className="button is-danger is-outlined is-rounded" id="fav-artist">
                                    <span>Favorite&nbsp; <i className="fas fa-heart"></i></span>
                                </button>
                            }
                            <br/>
                            <br/>
                            <p className="menu-label">
                                Genre&nbsp;<i className="fas fa-music"></i>
                            </p>
                            <ul className="menu-list">
                                {
                                    state.currentArtist.genres
                                    ?
                                    state.currentArtist.genres.map((genre, index) => 
                                        <div key={index}>
                                            <li>{ genre }</li>
                                            <br/>
                                        </div>
                                    )
                                    :
                                    null
                                }
                            </ul>
                            <p className="menu-label">
                                Follow Them&nbsp;<i className="fas fa-hashtag"></i>
                            </p>
                            <ul className="menu-list">
                                {
                                    state.currentArtist.spotifyLink
                                    ?
                                    <a href={state.currentArtist.spotifyLink} id="spotify">Spotify&nbsp;<i className="fab fa-spotify"></i></a>
                                    :
                                    null
                                }
                                {
                                    state.currentArtistInfo.tw
                                    ?
                                    <a href={"http://twitter.com/" + state.currentArtistInfo.tw}>Twitter&nbsp;<i className="fab fa-twitter"></i></a>
                                    :
                                    null
                                }
                                {
                                    state.currentArtistInfo.ig
                                    ?
                                    <a href={"http://instagram.com/" + state.currentArtistInfo.ig}>Instagram&nbsp;<i className="fab fa-instagram"></i></a>
                                    :
                                    null
                                }
                                {
                                    state.currentArtistInfo.fb
                                    ?
                                    <a href={"http://facebook.com/" + state.currentArtistInfo.fb}>Facebook&nbsp;<i className="fab fa-facebook-f"></i></a>
                                    :
                                    null
                                }
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
                                    state.currentArtistInfo.desc
                                    ?
                                    state.currentArtistInfo.desc.map(section => 
                                        parse(section)
                                        )
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
                                                songID={track.id}
                                                album={track.album.name}
                                                albumID={track.album.id}
                                                image={track.album.images[0].url}
                                                year={track.album.release_date}
                                                artist={state.currentArtist.name}
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