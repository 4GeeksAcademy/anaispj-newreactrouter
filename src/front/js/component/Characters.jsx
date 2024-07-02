import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context);

    const handleDetails = (character) => {
        actions.settingCharacter(character);
    }

    const isFavorite = (name) => {
        return store.favorites.includes(name);
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
                            <p className="card-text">Birth year: {item.birth_year}</p>

                            <div className="d-flex justify-content-between">
                                <Link to={'/character-details/' + index}
                                    className="btn btn-outline-secondary">Details</Link>
                                <span
                                    className={isFavorite(item.name) ? "text-danger" : "text-secondary"}
                                    onClick={() => actions.addFavorites(item.name)}>
                                    <i className={isFavorite(item.name) ? "fas fa-heart" : "far fa-heart"}></i>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
};