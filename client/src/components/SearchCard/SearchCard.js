import React from "react";
import "./SearchCard.css";
import { Link } from "react-router-dom";
import Column from "../Column/Column";

const SearchCard = props => {
    const { artist, artistID, genre, image } = props;

    return(
        <div className="column is-12">
            <div className="card">
                <Column>
                    <Link to={"/artist/" + artist + "/" + artistID}>
                        <figure className="column image">
                            <img src={image} alt={artist}/>
                        </figure>
                    </Link>
                    <div className="column is-10">
                        <Link to={"/artist/" + artist + "/" + artistID}>
                            <p className="title">{artist}</p>
                        </Link>
                        <br/>
                        <p className="">
                            {
                                genre.length !== 0 &&
                                <span>Genre: </span>
                            }
                            {
                                genre.length !== 0 &&
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