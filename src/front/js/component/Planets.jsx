import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Planets = () => {
    const { store, actions } = useContext(Context);



    return (
        <>
            <h1 className="text-center text-light">PLANETS</h1>
            <div className="row justify-content-center">
                {store.planet.map((item, index) =>
                    <div key={index} className="card m-3" style={{ width: '18rem' }}>
                        <img src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`} className="card-img-top" alt={item.name} />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">Clima: {item.climate}</p>
                            <Link to={'/planet-details/' + index} 
                            // onClick={() => handleDetails(item)}
                                className="btn btn-outline-secondary">Details</Link>
                        </div>
                    </div>



                )}
            </div>
        </>
    )};

