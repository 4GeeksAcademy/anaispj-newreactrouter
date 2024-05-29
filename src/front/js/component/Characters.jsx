import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context);

    const handleDetails = (user) => {
        actions.settingCharacter(user);
    }


    return (
        <>
            <h1 className="text-center text-light">CHARACTERS</h1>
            <div className="row justify-content-center">
                {store.character.map((item, index) =>
                    <div key={index} className="card m-3" style={{ width: '18rem' }}>
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">Birth year:{item.birth_year}</p>
                            <Link to={'/character-details/' + index} 
                            // onClick={() => handleDetails(item)}
                                className="btn btn-outline-secondary">Details</Link>
                        </div>
                    </div>



                )}
            </div>
        </>
    )};