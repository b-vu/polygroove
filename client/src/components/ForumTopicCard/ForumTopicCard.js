import React from "react";
import "./ForumTopicCard.css";
import { Link } from "react-router-dom";

const ForumTopicCard = props => {
    const { name, id, title, date, postID, userName, userID } = props;

    const formatDate = time => {
        if(time === undefined){
            return;
        }

        const arr = time.split("T");
        const dateArr = arr[0].split("-")
        
        let month = parseInt(dateArr[1]);
        let day = parseInt(dateArr[2]);

        const times = arr[1].split(":");
        const minute = times[1];

        let meridian = "AM";

        let hour = parseInt(times[0]);
        hour -=5;
        
        if(hour > 11){
            hour -= 12;
            meridian = "PM"
            if(hour === 0){
                hour = 12;
            }
        }

        else{
            switch(hour){
                case 0:
                    meridian = "AM"
                    hour = 12;
                    break;
                case -1:
                    meridian = "PM"
                    hour = 11;
                    day -= 1;
                    break;
                case -2:
                    meridian = "PM"
                    hour = 10;
                    day -= 1;
                    break;
                case -3:
                    meridian = "PM"
                    hour = 9;
                    day -= 1;
                    break;
                case -4:
                    meridian = "PM"
                    hour = 8;
                    day -= 1;
                    break;
                case -5:
                    meridian = "PM"
                    hour = 7;
                    day -= 1;
                    break;
                default:
                    break;
            }
        }

        const newDate = month + "-" + day + "-" + dateArr[0];
        return(hour + ":" + minute + " " + meridian + ", " + newDate);
    }

    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <Link to={`/topic/${id}/${postID}`}><p>{title}</p></Link>
                    <br/>
                    <p className="forum-subtext">Posted by <Link to={`/user/${userID}`}>{userName}</Link> in <Link to={`/forums/${id}`}>{name}</Link> at {formatDate(date)}</p>
                </div>
            </div>
        </div>
    );
}

export default ForumTopicCard;