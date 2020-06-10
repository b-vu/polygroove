import React from "react";
import "./RatedStars.css";

const RatedStars = props => {
    const { avgRating, numRatings } = props;

    console.log(avgRating);

    return(
        <div>
            <span className="icon has-text-warning">
                <i className="fas fa-star"></i>
            </span>
                {
                    avgRating < 1.50 &&
                    <span className="icon has-text-warning">
                        <i className={"far fa-star"}></i>
                    </span>
                }
                {
                    avgRating >= 1.50 && avgRating < 2 &&
                    <span className="icon has-text-warning">
                        <i className={"fas fa-star-half-alt"}></i>
                    </span>
                }
                {
                    avgRating >= 2 &&
                    <span className="icon has-text-warning">
                        <i className={"fas fa-star"}></i>
                    </span>
                }
                {
                    avgRating < 2.50 &&
                    <span className="icon has-text-warning">
                        <i className={"far fa-star"}></i>
                    </span>
                }
                {
                    avgRating >= 2.50 && avgRating < 3 &&
                    <span className="icon has-text-warning">
                        <i className={"fas fa-star-half-alt"}></i>
                    </span>
                }
                {
                    avgRating >= 3 &&
                    <span className="icon has-text-warning">
                        <i className={"fas fa-star"}></i>
                    </span>
                }
                {
                    avgRating < 3.50 &&
                    <span className="icon has-text-warning">
                        <i className={"far fa-star"}></i>
                    </span>
                }
                {
                    avgRating >= 3.50 && avgRating < 4 &&
                    <span className="icon has-text-warning">
                        <i className={"fas fa-star-half-alt"}></i>
                    </span>
                }
                {
                    avgRating >= 4 &&
                    <span className="icon has-text-warning">
                        <i className={"fas fa-star"}></i>
                    </span>
                }
                {
                    avgRating < 4.50 &&
                    <span className="icon has-text-warning">
                        <i className={"far fa-star"}></i>
                    </span>
                }
                {
                    avgRating >= 4.50 && avgRating < 5 &&
                    <span className="icon has-text-warning">
                        <i className={"fas fa-star-half-alt"}></i>
                    </span>
                }
                {
                    avgRating >= 5 &&
                    <span className="icon has-text-warning">
                        <i className={"fas fa-star"}></i>
                    </span>
                }

            &nbsp;based on {numRatings} {numRatings > 1 ? <span>ratings</span> : <span>rating</span>}
        </div>
    );
}

export default RatedStars;