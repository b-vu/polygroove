import React from "react";

const Input = props => {
    const { label, fa, icon, type} = props;

    return(
        <div className="container field column is-three-fifths">
            <label className="label">{label}</label>
            <div className={`control ${fa}`}>
                <input className="input is-success" type={type} {...props}/>
                <span className="icon is-small is-left">
                    <i className={`fas fa-${icon}`}></i>
                </span>
            </div>
        </div>
    );
}

export default Input;