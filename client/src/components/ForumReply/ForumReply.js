import React from "react";
import "./ForumReply.css";
import { Link } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import API from "../../utils/API";

const ForumReply = props => {
    const { userID, userName, body, date, postNumber, name, id, _id, postID, displayTopic, updateEditPost, handleEditPost, editReply } = props;
    const [state, dispatch] = useProjectContext();

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

    const handleDelete = () => {
        API.deleteReply(id, postID, { replyID: _id }).then(res => {
            displayTopic();
        });
    }

    return (
        <div>
        <div className="card">
            <div className="card-content">
                <p className="forum-subtext">#{postNumber}</p>
                <div className="content">
                    <p>{body}</p>
                    <br/>
                    <p className="forum-subtext">
                        Posted by <Link to={`/user/${userID}`}>{userName}</Link> in <Link to={`/forums/${id}`}>{name}</Link> at {formatDate(date)}
                        {
                            (state.isAuthenticated && userID === state.user.id) &&
                            <span><span onClick={updateEditPost} className="forum-edit-button" data-value={_id}> Edit </span> | <span onClick={handleDelete} className="forum-delete-button"> Delete</span></span>
                        }
                    </p>
                </div>
            </div>
        </div>
        <br/>
        {
            state.editPost && state.editPostNumber === _id &&
            <div className="field">
                <div className="control">
                    <textarea onChange={handleEditPost} id="replyTextarea" className="textarea is-warning" placeholder="Reply" value={state.forumReply}></textarea>
                </div>
                <br/>
                <button onClick={() => editReply(_id)} className="button is-warning is-rounded">Edit</button>
                <br/>
                <br/>
            </div>
        }
        </div>
    );
}

export default ForumReply;