import React from "react";
import "./ProfileStars.css";

const ProfileStars = props => {
    const { rating } = props;

    return(
        <div>
            <span className="icon has-text-warning">
                <i className="fas fa-star"></i>
            </span>
            <span className="icon has-text-warning">
                {
                    rating >= 2
                    ?
                    <i className={"fas fa-star"}></i>
                    :
                    <i className={"far fa-star"}></i>
                }
            </span>
            <span className="icon has-text-warning">
                {
                    rating >= 3
                    ?
                    <i className={"fas fa-star"}></i>
                    :
                    <i className={"far fa-star"}></i>
                }
            </span>
            <span className="icon has-text-warning">
                {
                    rating >= 4
                    ?
                    <i className={"fas fa-star"}></i>
                    :
                    <i className={"far fa-star"}></i>
                }
            </span>
            <span className="icon has-text-warning">
                {
                    rating >= 5
                    ?
                    <i className={"fas fa-star"}></i>
                    :
                    <i className={"far fa-star"}></i>
                }
            </span>
        </div>
    );
}

export default ProfileStars;