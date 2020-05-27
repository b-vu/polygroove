import React from "react";
import "./SearchCard.css";
import { Link } from "react-router-dom";
import Column from "../Column/Column";

const SearchCard = props => {
    const { artist, artistID, genre, album, albumID, track, trackID, image } = props;

    return(
        <div className="column is-12">
            <div className="card">
                <Column>
                    {
                        artist && !album && !track &&

                        <Link to={"/artist/" + artist + "/" + artistID}>
                            <figure className="column image">
                                <img src={image} alt={artist}/>
                            </figure>
                        </Link>
                    }
                    {
                        artist && album &&

                        <Link to={"/album/" + albumID}>
                            <figure className="column image">
                                <img src={image} alt={album}/>
                            </figure>
                        </Link>
                    }
                    {
                        artist && track &&
                        
                        <Link to={"/track/" + track + "/" + trackID}>
                            <figure className="column image">
                                <img src={image} alt={track}/>
                            </figure>
                        </Link>
                    }

                    <div className="column is-10">
                        {
                            album &&

                            <div>
                                <Link to={"/album/" + albumID}>
                                    <p className="title">{album}</p>
                                </Link>
                                <br/>
                            </div>
                        }
                        {
                            track &&

                            <div>
                                <Link to={"/track/" + track + "/" + trackID}>
                                    <p className="title">{track}</p>
                                </Link>
                                <br/>
                            </div>
                        }

                        <Link to={"/artist/" + artist + "/" + artistID}>
                            <p className="title">{(album || track) && <span>by </span>}{artist}</p>
                        </Link>
                        <br/>
                        <p>
                            {
                                (genre && genre.length !== 0) &&
                                <span>Genre: </span>
                            }
                            {
                                (genre && genre.length !== 0) &&
                                genre.map((genre, index) => 
                                <span key={index}>
                                    { (index ? ", " : "") + genre}
                                </span>)
                            }
                        </p>
                    </div>
                </Column>
            </div>
        </div>
    );
}

export default SearchCard;