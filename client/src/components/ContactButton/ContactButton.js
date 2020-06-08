import React from "react";

const ContactButton = props => {
    return(
        <div className="container buttons column is-three-fifths">
            <button className="button is-success" {...props}>Submit</button>
        </div>
    );
}

export default ContactButton;