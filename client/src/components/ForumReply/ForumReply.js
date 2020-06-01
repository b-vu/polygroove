import React from "react";
import "./ForumReply.css";
import { Link } from "react-router-dom";
import Column from "../Column/Column";

const ForumReply = props => {
    const { userID, userName, body, date } = props;

    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <p>{body}</p>
                    <br/>
                    <p className="forum-subtext">Posted by {userName} on {date}</p>
                </div>
            </div>
        </div>
    );
}

export default ForumReply;