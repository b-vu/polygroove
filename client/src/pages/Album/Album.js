import React, { useEffect } from "react";
import "./Album.css";
import { Link, useParams } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";

const Album = () => {
    const [state, dispatch] = useProjectContext();
    const { id } = useParams();

    useEffect(() => {
        if(!state.token.length){
            API.getToken().then(res => {
                dispatch({
                    type: "UPDATE_TOKEN",
                    token: res.data.access_token
                });

            });
        }

        API.getAlbumInfo(id, state.token).then(res => {
            dispatch({
                type: "UPDATE_CURRENT_ALBUM",
                currentAlbum: res.data
            });
            API.getAlbums(res.data.artists[0].id, state.token).then(res => {
                const albumNames = [];
                const albums = [];
                for(const album of res.data.items){
                    if(albumNames.indexOf(album.name) === -1){
                        albumNames.push(album.name)
                        albums.push(album)
                    }
                }
                res.data.items = albums;

                dispatch({
                    type: "UPDATE_CURRENT_OTHER_ALBUMS",
                    otherAlbums: res.data
                })
            })
        });

    }, [id]);

    const formatReleaseDate = date => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const arr = date.split("-");

        return `${months[(arr[1] - 1)]} ${arr[2]}, ${arr[0]}`
    }

    const getRuntime = tracks => {
        let total = 0;

        for(const track of tracks){
            total += track.duration_ms;
        }

        return Math.floor(total / 60000) + " mins";
    }

    const msToMinutes = ms => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);

        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return(
        <Box>
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
                        {
                            state.currentAlbum.images
                            ?
                            <Column>
                            <div className="column is-5">
                                <figure className="image artist-image">
                                    <img src={state.currentAlbum.images[0].url}/>
                                </figure>
                            </div>
                            <div className="column is-7">
                                <h1 className="title">{state.currentAlbum.name} by <Link to={"/artist/" + state.currentAlbum.artists[0].name + "/" + state.currentAlbum.artists[0].id}>{state.currentAlbum.artists[0].name}</Link></h1>
                                <h1 className="title">Released on {formatReleaseDate(state.currentAlbum.release_date)}</h1>
                                <h1 className="title">{state.currentAlbum.total_tracks} tracks, {getRuntime(state.currentAlbum.tracks.items)}</h1>
                                <h1 className="title">Label: {state.currentAlbum.label}</h1>
                                <h1 className="title">{state.currentAlbum.copyrights[0].text}</h1>
                            </div>
                            </Column>
                            :
                            null
                        }

                        <Column>
                            <div className="column">
                                <h1 className="title has-text-centered">Tracks</h1>
                                {
                                    state.currentAlbum.tracks
                                    ?
                                    state.currentAlbum.tracks.items.map((track, index) => 
                                        <div key={index} className="columns">
                                            <p className="title column is-9">
                                                <span>{(index + 1) + "."}&nbsp;</span>
                                                <Link to={"/track/" + track.name + " " + state.currentAlbum.artists[0].name + "/" + track.id}>
                                                    {track.name}
                                                </Link>
                                            </p>
                                                {
                                                    track.explicit
                                                    ?
                                                    <p className="column is-2 explicit">Explicit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                                    :
                                                    <p className="column is-2 explicit"></p>
                                                }
                                                <p className="column is-2 runtime">{" " + msToMinutes(track.duration_ms)}</p>
                                            <br/>
                                        </div>
                                    )
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
                                Other Albums
                            </p>
                            <ul className="menu-list">
                                {
                                    state.otherAlbums.items
                                    ?
                                    state.otherAlbums.items.filter(album => album.name !== state.currentAlbum.name).map((album, index) => 
                                        <li key={index}>
                                            <Link to={"/album/" + album.id} className="columns">
                                                <figure className="image column">
                                                    <img src={album.images[0].url} alt={album.name}/>
                                                </figure>
                                                <div className="column">
                                                    {album.name}
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                    :
                                    null
                                }
                            </ul>
                        </aside>
                    </Box>            
                </div>
            </Column>
        </Box>
    );
}

export default Album;