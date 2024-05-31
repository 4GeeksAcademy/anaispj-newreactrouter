import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const AddContact = () => {
    const {store, actions} = useContext(Context);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleReset = (event) => {
        event.preventDefault();
        // Resetear los valores de los inputs
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSend = {name, email, phone, address}
        console.log('to send', dataToSend);
        actions.addContact(dataToSend)
        navigate('/contacts')
    }

    return (
        <div className="container text-warning">
            <h1 className="text-center">Add Contact</h1>
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
                     value={address} onChange={(event) => setAddress(event.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="inputPhone" 
                    value={phone} onChange={(event) => setPhone(event.target.value)}/>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
                <button onClick={handleReset} type="reset" className="btn btn-danger ms-2">Reset</button>

            </form>
        </div>
    )
}