import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const StarshipDet = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.getStarships();
        actions.getStarshipDetails(params.starshipid); // Obtener detalles específicos
    }, []);

    console.log('Detalles de la nave espacial:', store.starshipDetails[params.starshipid]);

    const starship = store.starshipDetails[params.starshipid];

    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <div className="card">
                    <div className="card-header">
                        {store.starships.length > 0 && store.starships[params.starshipid] ? (
                            store.starships[params.starshipid].name
                        ) : (
                            "Starship Not Found"
                        )}
                    </div>
                    {starship ? (
                        <div className="card-body">
                            <p className="card-text">Modelo: {starship.model}</p>
                            <p className="card-text">Fabricante: {starship.manufacturer}</p>
                        </div>
                    ) : (
                        <div className="card-body">
                            <p className="card-text">Loading details...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};