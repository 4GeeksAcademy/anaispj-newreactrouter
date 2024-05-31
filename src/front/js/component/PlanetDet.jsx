import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const PlanetDet = () => {
    const {store, actions} = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.getPlanets()
    }, []);

    console.log('Params planetid', params.planetid);
    console.log('Store planet', store.planet);

    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <div className="card">
                    <div className="card-header">
                        <strong>Planet name:</strong> {store.planet[params.planetid].name} 
                    </div>
                    {/* <img src={} className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                        <p className="card-text">Rotation period: {store.planet[params.planetid].rotation_period}</p>
                        <p className="card-text">Orbital Period: {store.planet[params.planetid].orbital_period}</p>

                    </div>
                </div>
            </div>
        </div>

    )
};