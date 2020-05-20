import React from "react";
import "./Tracks.css";
import Column from "../Column/Column";
import { Link } from "react-router-dom";

const Tracks = props => {
    const { image, song, album, spotifySong, spotifyArtist, spotifyAlbum, artistID, duration, year } = props;

    const msToMinutes = ms => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);

        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }

    const getYear = date => {
        const arr = date.split("-");

        return arr[0];
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
                            <a href={spotifySong}>{song}</a>
                        </p>
                            
                        <p className="track-album">
                            on <a href={spotifyAlbum}>{album}</a>
                        </p>

                        <p className="track-album">
                            {msToMinutes(duration)}, {getYear(year)}
                        </p>
                    </div>
                </Column>
            </div>
        
    );
}

export default Tracks;