import React from "react";
import "./Card.css";
import Column from "../Column/Column";
import { Link } from "react-router-dom";

const Card = props => {
    const { image, song, artist, album, spotifySong, spotifyArtist, spotifyAlbum, rank, artistID, albumID, trackID } = props;

    return(
        <div className="card">
            <div className="card-content">
                <Column>
                    <div className="columns">
                        <div className="column">
                            <p className="title">
                                #{rank}&nbsp;
                            </p>
                        </div>

                        <div className="column">
                            <figure className="image card-image">
                                <img src={image} alt={album}/>
                            </figure>
                        </div>
                    </div>

                    <div className="column">
                        <p className="title is-3">
                            <Link to={"track/" + artist + " " + song + "/" + trackID}>{song}</Link>
                        </p>

                        <p className="title is-4">
                            by <Link to={"/artist/" + artist + "/" + artistID}>{artist}</Link>
                        </p>
                            
                        <p className="title is-4">
                            on <Link to={"/album/" + albumID}>{album}</Link>
                        </p>
                    </div>
                </Column>
            </div>
        </div>
    );
}

export default Card;