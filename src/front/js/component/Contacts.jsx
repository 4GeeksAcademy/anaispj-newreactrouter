import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Modal from "./Modal.jsx";

export const Contacts = () => {
    const { store, actions } = useContext(Context);

    const handleDelete = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        actions.deleteContact(selectedContact.id);
        setShowModal(false);
    };


    return (
        <>
            <h1 className="text-center text-light m-3">Contactos</h1>
            <p className="text-end">
                <Link to='/add-contact' className="btn btn-warning m-2">
                    Add contact
                </Link>
            </p>
            <ul className="list-group">
                {!store.contacts ?
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                    <>

                        {store.contacts.map((item, index) =>
                            <li key={index} className="list-group-item d-flex justify-content-between">{item.name}
                            <div className="d-flex justify-content-between">

                                <span className="text-warning ms-2">
                                    <i className="fa-solid fa-pen"
                                        onClick={() => handleUpdate(item)}></i>
                                </span>
                                <span className="text-warning ms-2">
                                    <i className="fas fa-trash"
                                        onClick={() => handleDelete(item)}></i>
                                </span>
                            </div>
                                </li>
                        )}
                    </>
                }
            </ul>
        </>
    );
};