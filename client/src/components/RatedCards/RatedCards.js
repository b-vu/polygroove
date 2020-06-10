import React from "react";
import "./RatedCards.css";
import Column from "../Column/Column";
import RatedStars from "../RatedStars/RatedStars";
import { Link } from "react-router-dom";

const RatedCards = props => {
    const { track, trackID, album, albumID, artist, artistID, avgRating, numRatings, image, rank } = props;

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
                        {
                            track
                            ?
                            <p className="title is-3">
                                <Link to={"track/" + artist + " " + track + "/" + trackID}>{track}</Link>
                            </p>
                            :
                            <p className="title is-4">
                                <Link to={"/album/" + albumID}>{album}</Link>
                            </p>
                        }

                        <p className="title is-4">
                            by <Link to={"/artist/" + artist + "/" + artistID}>{artist}</Link>
                        </p>

                        {
                            track &&
                            <p className="title is-4">
                                on <Link to={"/album/" + albumID}>{album}</Link>
                            </p>
                        }

                        <RatedStars avgRating={avgRating} numRatings={numRatings}></RatedStars>
                    </div>
                </Column>
            </div>
        </div>
    );
}

export default RatedCards;