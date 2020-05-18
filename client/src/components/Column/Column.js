import React from "react";

const Column = ({ children }) => {
    return(
        <div className="columns">
            { children }
        </div>
    );
}

export default Column;