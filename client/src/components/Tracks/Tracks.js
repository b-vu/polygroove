import React from "react";
import "./Tracks.css";
import Column from "../Column/Column";
import { Link } from "react-router-dom";

const Tracks = props => {
    const { image, song, songID, album, albumID, year, artist } = props;

    const getYear = date => {
        const arr = date.split("-");

        return arr[0];
    }
    
    return(
        
            <div className="card-content">
                <Column>
                    <div className="column is-4">
                        <figure className="image track-image">
                            <a href={image}><img src={image} alt={album}/></a>
                        </figure>
                    </div>

                    <div className="column">
                        <p className="track-listing">
                            <Link to={"/track/" + song + " " + artist + "/" + songID}>{song}</Link>
                        </p>
                            
                        <p className="track-album">
                            on <Link to={"/album/" + albumID}>{album}</Link>
                        </p>

                        <p className="track-album">
                            {getYear(year)}
                        </p>
                    </div>
                </Column>
            </div>
        
    );
}

export default Tracks;