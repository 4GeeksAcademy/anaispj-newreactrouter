import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

export const EditContact = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const contact = store.contacts.find(contact => contact.id === id);
        if (contact) {
            setName(contact.full_name);
            setEmail(contact.email);
            setPhone(contact.phone);
            setAddress(contact.address);
        }
    }, [store.contacts, id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSend = { full_name: name, email, phone, address };
        actions.updateContact(id, dataToSend);
        navigate('/contacts');
    };

    return (
        <div className="container text-warning">
            <h1 className="text-center">Edit Contact</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"
                        value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress"
                        value={address} onChange={(event) => setAddress(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="inputPhone"
                        value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
                <button type="reset" className="btn btn-danger ms-2">Cancel</button>
            </form>
        </div>
    );
};