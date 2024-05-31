import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Contacts = () => {
    const { store, actions } = useContext(Context);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleDelete = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);
        setIsEdit(false);
    };

    const handleUpdate = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);
        setIsEdit(true);
    };

    const handleConfirmDelete = () => {
        actions.deleteContact(selectedContact.id);
        setShowModal(false);
    };

    const handleCancelDelete = () => {
        setSelectedContact(null);
        setShowModal(false);
    };

    const handleSaveEdit = () => {
        actions.updateContact(selectedContact.id, selectedContact);
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        setSelectedContact({ ...selectedContact, [e.target.name]: e.target.value });
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
            {showModal && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isEdit ? "Edit Contact" : "Confirm Delete"}</h5>
                                <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
                            </div>
                            <div className="modal-body">
                                {isEdit ? (
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={selectedContact.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={selectedContact.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="phone"
                                                value={selectedContact.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </form>
                                ) : (
                                    <p>Are you sure you want to delete {selectedContact.name}?</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Close</button>
                                {isEdit ? (
                                    <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>Save changes</button>
                                ) : (
                                    <button type="button" className="btn btn-primary" onClick={handleConfirmDelete}>Confirm</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};