import React from "react";
import "./ForumTopicCard.css";
import { Link } from "react-router-dom";
import Column from "../Column/Column";

const ForumTopicCard = props => {
    const {  } = props;

    return (
        <Column>
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">John Smith</p>
                            <p className="subtitle is-6">@johnsmith</p>
                        </div>
                    </div>

                    <div className="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                            <a href="#">#css</a> <a href="#">#responsive</a>
                        <br />
                    </div>
                </div>
            </div>
        </Column>
    );
}

export default ForumTopicCard;