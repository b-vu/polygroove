import React from "react";
import "./FavoritesCard.css";
import { Link } from "react-router-dom";

const FavoritesCard = props => {
    const { artist, artistID, image, type, album, albumID, track, trackID, rating } = props;

    return(
        <div className="column is-one-quarter has-text-centered">
            {
                type === "artist"
                ?
                <div>
                    <Link to={"/artist/" + artist + "/" + artistID}>
                        <figure className="image artist-feed-card">
                            <img src={image} alt={artist}/>
                        </figure>
                    </Link>
                    <Link className="artist-card-title" to={"/artist/" + artist + "/" + artistID}>{artist}</Link>
                </div>
                :
                null
            }
            {
                type === "album"
                ?
                <div>
                    <Link to={"/album/" + albumID}>
                        <figure className="image artist-feed-card">
                            <img src={image} alt={album}/>
                        </figure>
                    </Link>
                    <Link className="artist-card-title" to={"/album/" + albumID}>{album}</Link> by <Link className="artist-card-title" to={"/artist/" + artist + "/" + artistID}>{artist}</Link>
                </div>
                :
                null
            }
            {
                type === "track"
                ?
                <div>
                    <Link to={"/track/" + track + "/" + trackID}>
                        <figure className="image artist-feed-card">
                            <img src={image} alt={track}/>
                        </figure>
                    </Link>
                    <Link className="artist-card-title" to={"/track/" + track + "/" + trackID}>{track}</Link> by <Link className="artist-card-title" to={"/artist/" + artist + "/" + artistID}>{artist}</Link>
                </div>
                :
                null
            }
            {
                type === "album review"
                ?
                <div>
                    <Link to={"/album/" + albumID}>
                        <figure className="image artist-feed-card">
                            <img src={image} alt={album}/>
                        </figure>
                    </Link>
                        {
                            rating === 5
                            ?
                            <div>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                            </div>
                            :
                            null
                        }
                        {
                            rating === 4
                            ?
                            <div>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                            </div>
                            :
                            null
                        }
                        {
                            rating === 3
                            ?
                            <div>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                            </div>
                            :
                            null
                        }
                        {
                            rating === 2
                            ?
                            <div>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                            </div>
                            :
                            null
                        }
                        {
                            rating === 1
                            ?
                            <div>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                            </div>
                            :
                            null
                        }
                    <Link className="artist-card-title" to={"/album/" + albumID}>{album}</Link> by <Link className="artist-card-title" to={"/artist/" + artist + "/" + artistID}>{artist}</Link>
                </div>
                :
                null
            }
            {
                type === "track review"
                ?
                <div>
                    <Link to={"/track/" + track + "/" + trackID}>
                        <figure className="image artist-feed-card">
                            <img src={image} alt={track}/>
                        </figure>
                    </Link>
                        {
                            rating === 5
                            ?
                            <div>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                            </div>
                            :
                            null
                        }
                        {
                            rating === 4
                            ?
                            <div>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                            </div>
                            :
                            null
                        }
                        {
                            rating === 3
                            ?
                            <div>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                            </div>
                            :
                            null
                        }
                        {
                            rating === 2
                            ?
                            <div>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                            </div>
                            :
                            null
                        }
                        {
                            rating === 1
                            ?
                            <div>
                                <span className="icon has-text-warning">
                                    <i className="fas fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                                <span className="icon has-text-warning">
                                    <i className="far fa-star user-rating-feed"></i>
                                </span>
                            </div>
                            :
                            null
                        }
                    <Link className="artist-card-title" to={"/track/" + track + "/" + trackID}>{track}</Link> by <Link className="artist-card-title" to={"/artist/" + artist + "/" + artistID}>{artist}</Link>
                </div>
                :
                null
            }
        </div>
    );
}

export default FavoritesCard;