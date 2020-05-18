import React from "react";

const Textarea = props => {
    return(
        <div className="container field column is-three-fifths">
            <label className="label">Message</label>
            <div className="control">
                <textarea className="textarea is-info" placeholder="Message" {...props}></textarea>
            </div>
        </div>
    );
}

export default Textarea;