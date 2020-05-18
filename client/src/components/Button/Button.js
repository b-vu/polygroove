import React from "react";

const Button = props => {
    return(
        <div className="container buttons column is-three-fifths">
            <button className="button is-info" {...props}>Submit</button>
        </div>
    );
}

export default Button;