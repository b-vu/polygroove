import React from "react";
import "./Card.css";
import Column from "../Column/Column";

const Card = props => {
    const { image, song, artist, album, spotifySong, spotifyArtist, spotifyAlbum, rank } = props;
    
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
                            <figure className="image">
                                <img src={image} alt={album}/>
                            </figure>
                        </div>
                    </div>

                    <div className="column">
                        <p className="title is-3">
                            <a href={spotifySong}>{song}</a>
                        </p>

                        <p className="title is-4">
                            by <a href={spotifyArtist}>{artist}</a>
                        </p>
                            
                        <p className="title is-4">
                            on <a href={spotifyAlbum}>{album}</a>
                        </p>
                    </div>
                </Column>
            </div>
        </div>
    );
}

export default Card;