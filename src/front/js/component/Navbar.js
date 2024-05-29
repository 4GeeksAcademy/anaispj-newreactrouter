import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import swlogo from "../../img/sw-logow.png";


export const Navbar = () => {
  const {store, actions} = useContext(Context);

	return (
    <nav className="navbar navbar-expand-lg navbar-warning d-flex justify-content-between">
    <div>
        <Link className="navbar-brand text-warning ms-4" to="/">
        <img className="img-fluid" src={swlogo} />
        </Link>
        <button className="navbar-toggler navbar-dark ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
    </div>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mx-4">
            <li className="nav-item active">
                <Link className="nav-link text-warning" to="/characters">Characters <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-warning" to="/planets">Planets</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-warning" to="/starships">Starships</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-warning bg-light rounded" to="#">Favorites</Link>
            </li>
        </ul>
    </div>
</nav>
	);
};