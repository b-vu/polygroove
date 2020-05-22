import React, { useEffect } from "react";
import "./Track.css";
import { Link, useParams } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";

const Track = () => {
    const [state, dispatch] = useProjectContext();
    const { name, id } = useParams();

    useEffect(() => {
        if(!state.token.length){
            API.getToken().then(res => {
                dispatch({
                    type: "UPDATE_TOKEN",
                    token: res.data.access_token
                });
            })
        }

        API.getTrackInfo(name, id, state.token).then(res => {
            const trackArray = [res[0].data.response.hits, res[1].data]
            dispatch({
                type: "UPDATE_CURRENT_TRACK",
                currentTrack: trackArray
            });
        })
    }, [name]);

    const msToMinutes = ms => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);

        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const formatReleaseDate = date => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const arr = date.split("-");

        return `${months[(arr[1] - 1)]} ${arr[2]}, ${arr[0]}`
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
            {
                state.currentTrack.length
                ?
                <div className="column is-8">
                    <Box>
                        <Column>
                            <div className="column is-5">
                                <figure className="image artist-image">
                                    <img src={state.currentTrack[1].album.images[0].url}/>
                                </figure>
                            </div>
                            <div className="column is-7">
                                <h1 className="title">{state.currentTrack[1].name}</h1>
                                <h1 className="title">By <Link to={"/artist/" + state.currentTrack[1].artists[0].name + "/" + state.currentTrack[1].artists[0].id}>{state.currentTrack[1].artists[0].name}</Link></h1>
                                <h1 className="title">On <Link to={"/album/" + state.currentTrack[1].album.id}>{state.currentTrack[1].album.name}</Link></h1>
                                <h1 className="title">Released on {formatReleaseDate(state.currentTrack[1].album.release_date)}</h1>
                                <h1 className="title">Duration: {msToMinutes(state.currentTrack[1].duration_ms)}</h1>
                                {
                                    state.currentTrack[1].explicit
                                    ?
                                    <p className="explicit">Explicit</p>
                                    :
                                    null
                                }
                                <a href={state.currentTrack[1].external_urls.spotify}>Spotify</a>
                                <a href={state.currentTrack[0][0].result.url}> Lyrics</a>
                            </div>
                        </Column>
                    </Box>
                </div>
                :
                null
            }
            </Column>
        </Box>
    );
}

export default Track;