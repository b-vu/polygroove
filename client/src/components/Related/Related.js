import React from "react";
import "./Related.css";
import { Link } from "react-router-dom";

const Related = props => {
    const { artists } = props;
    
    return(
        <aside className="menu">
            <p className="menu-label">
                Related Artists
            </p>
            <ul className="menu-list">
                {
                    artists
                    ?
                    artists.map((artist, index) => 
                        <li key={index}>
                            <Link to={"/artist/" + artist.name + "/" + artist.id} className="columns">
                                <figure className="image column">
                                    <img src={artist.images[0].url} alt={artist.name}/>
                                </figure>
                                <div className="column">
                                    {artist.name}
                                </div>
                            </Link>
                        </li>
                    )
                    :
                    null
                }
            </ul>
        </aside>
    );
}

export default Related;