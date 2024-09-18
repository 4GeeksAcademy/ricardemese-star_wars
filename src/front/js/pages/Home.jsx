import React from "react";
import StarWarsBackground from "../../img/star-wars-background.jpg";
import StarsBackground from "../../img/stars-background.jpg";
import "../../styles/home.css";

export const Home = () => {
    return (
        <div className="container-fluid p-0 m-0">
            <div className="position-relative overflow-hidden">
                <img
                    src={StarsBackground}
                    className="background-image img-fluid"
                    alt="Stars Background"
                />
                <div className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
                    <img
                        src={StarWarsBackground}
                        className="star-wars-image img-fluid"
                        alt="Star Wars Background"
                    />
                </div>
            </div>
        </div>
    );
};