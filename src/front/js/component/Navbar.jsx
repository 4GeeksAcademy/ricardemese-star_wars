import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import starWarsImg from "../../img/star-wars-logo.png";
import { BtnFavoritos } from "./BtnFavoritos.jsx";

export const Navbar = () => {
    const { store } = useContext(Context);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src={starWarsImg} width="150" alt="Star Wars Logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
							<Link className="nav-link active" to="/characters">Characters</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/planets">Planets</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/starships">Starships</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/contacts">Contacts</Link>
                        </li>
                        <BtnFavoritos />
                    </ul>
                </div>
            </div>
        </nav>
    );
};