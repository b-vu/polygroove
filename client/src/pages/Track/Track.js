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
            console.log(res[1].data);
            dispatch({
                type: "UPDATE_CURRENT_TRACK",
                currentTrack: res[0].data.response.hits
            });
        })
    }, [name])

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
                    {console.log(state.currentTrack[0].result.full_title, state.currentTrack[0])}
                    <Box>
                        <h1 className="title has-text-centered">{state.currentTrack[0].result.full_title}</h1>
                        <Column>
                            <div className="column is-5">
                                <figure className="image artist-image">
                                    <img src={state.currentTrack[0].result.header_image_url}/>
                                </figure>
                            </div>
                            <div className="column is-7">

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