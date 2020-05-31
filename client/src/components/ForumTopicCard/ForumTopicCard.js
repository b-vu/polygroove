import React from "react";
import "./ForumTopicCard.css";
import { Link } from "react-router-dom";
import Column from "../Column/Column";

const ForumTopicCard = props => {
    const { name, id, title, date, postID, userName } = props;

    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <Link to={`/topic/${id}/${postID}`}><p>{title}</p></Link>
                    <p>Posted by {userName} in <Link to={`/forums/${id}`}>{name}</Link> on {date}</p>
                </div>
            </div>
        </div>
    );
}

export default ForumTopicCard;