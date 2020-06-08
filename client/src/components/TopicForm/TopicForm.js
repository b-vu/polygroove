import React from "react";
import "./TopicForm.css";
import { useProjectContext } from "../../utils/Store";
import { Link, useParams } from "react-router-dom";
import Column from "../Column/Column";

const TopicForm = () => {
    const [state, dispatch] = useProjectContext();
    const { id } = useParams();

    const handleCurrentForumTopic = event => {
        const { name, value } = event.target;
  
        dispatch({
            type: "UPDATE_CURRENT_FORUM_TOPIC_FORM",
            name: name,
            value: value
        });
    }

    return(
        <Column>
            <div className="column is-2"/>
            <div className="column is-8">
                <label className="label">Title</label>
                <div className="field">
                    <div className="control">
                        <input onChange={handleCurrentForumTopic} name="title" className="input is-warning" type="text" placeholder="Title"/>
                    </div>
                </div>

                <label className="label">Body</label>
                <div className="field">
                    <div className="control">
                    <textarea onChange={handleCurrentForumTopic} name="body" className="textarea is-warning" placeholder="Discuss here!"></textarea>
                    </div>
                </div>

                <Link to={`/topic/${id}/${state.currentForumPosts.postID}`}>
                    <button className="button is-warning is-rounded">Post</button>
                </Link>
            </div>
            <div className="column is-2"/>
        </Column>
    );
}

export default TopicForm;