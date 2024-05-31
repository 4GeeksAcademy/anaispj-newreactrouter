import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Starships = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getStarships();
    }, []);

    return (
        <div>
            <h1 className="text-center text-light">STARSHIPS</h1>
            <div className="row justify-content-center">
                {store.starships.map((starship, index) => (
                    <div key={index} className="card m-3" style={{ width: '18rem' }}>
                        <img src={`https://starwars-visualguide.com/assets/img/starships/${starship.uid}.jpg`} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{starship.name}</h5>
                            <p className="card-text">Model: {starship.model}</p>
                            <p className="card-text">Manufacturer: {starship.manufacturer}</p>
                            <Link to={`/starship-details/${index}`} className="btn btn-outline-secondary">Details</Link>
                            <div className="d-flex justify-content-between">
                            <span className="text-danger me-2" onClick={() => actions.addFavorites(starship.name)}>
                                        <i className="far fa-heart"></i>
                                    </span>
                                </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};