import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import API from "../../utils/API";

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
        <div>
            {console.log(state)}
            ARTIST PAGE
        </div>
    );
}

export default Artist;