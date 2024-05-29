import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";


export const CharacterDet = () =>{
    const {store, actions} = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.getCharacters()
    }, []);

    console.log(store.character);

    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <div className="card">
                    <div className="card-header">
                        {store.character[params.characterid].name} 
                    </div>
                    {/* <img src={} className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                        <p className="card-text">Gender: {store.character[params.characterid].gender}</p>
                        <p className="card-text">Eye color: {store.character[params.characterid].eye_color}</p>
                        <p className="card-text">Skin color: {store.character[params.characterid].skin_color}</p>
                    </div>
                </div>
            </div>
        </div>

    )
};