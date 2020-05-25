import React from "react";
import "./FeedCard.css";
import { Link } from "react-router-dom";

const FeedCard = props => {
    const { artist, artistID, image } = props;
    console.log(props);
    return(
        <div className="column is-one-quarter has-text-centered">
            <Link to={"/artist/" + artist + "/" + artistID}>
                <figure className="image artist-feed-card">
                    <img src={image} alt={artist}/>
                </figure>
            </Link>
            <Link className="artist-card-title" to={"/artist/" + artist + "/" + artistID}>{artist}</Link>
        </div>
    );
}

export default FeedCard;