import React from "react";

const ContactTextarea = props => {
    return(
        <div className="container field column is-three-fifths">
            <label className="label">Message</label>
            <div className="control">
                <textarea className="textarea is-success" placeholder="Message" {...props}></textarea>
            </div>
        </div>
    );
}

export default ContactTextarea;