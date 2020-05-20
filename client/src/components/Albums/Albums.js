import React from "react";
import "./Albums.css";
import Column from "../Column/Column";
import { Link } from "react-router-dom";

const Albums = props => {
    const { image, album, spotifySong, spotifyArtist, spotifyAlbum, artistID, releaseDate, tracks } = props;

    const formatReleaseDate = date => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const arr = date.split("-");

        return `${months[(arr[1] - 1)]} ${arr[2]}, ${arr[0]}`
    }
    
    return(
            <div className="card-content">
                <Column>
                    <div className="column is-4">
                        <figure className="image track-image">
                            <img src={image} alt={album}/>
                        </figure>
                    </div>

                    <div className="column">
                        <p className="track-listing">
                            <a href={"#"}>{album}</a>
                        </p>

                        <p className="track-album">
                            {tracks} tracks
                        </p>

                        <p className="track-album">
                            Release date: {formatReleaseDate(releaseDate)}
                        </p>
                    </div>
                </Column>
            </div>
        
    );
}

export default Albums;