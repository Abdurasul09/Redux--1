import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

const EditContact = () => {
    const {id} = useParams()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const contacts = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentContact = contacts.find(contact => contact.id === parseInt(id))

    useEffect(() => {
        if (currentContact) {
            setName(currentContact.name)
            setNumber(currentContact.number)
            setEmail(currentContact.email)
        }
    }, [currentContact])


    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(contact => contact.id !== parseInt(id) && contact.email === email)
        const checkNumber = contacts.find(contact => contact.id !== parseInt(id) && contact.number === parseInt(number))

        if (!name || !email || !number) {
            return toast.warning('Please fill in oll fields')
        }
        if (checkEmail) {
            return toast.error('This email already Exists!')
        }
        if (checkNumber) {
            return toast.error('This number already Exists!')
        }
        const data = {
            id: parseInt(id),
            name,
            number,
            email,
        }
        dispatch({type: 'UPDATE_CONTACT', payload: data})
        toast.success('Student added successfully!!')
        navigate('/ ');
    }

    return (
        <div className='container'>
            {
                currentContact ? (
                    <>
                        <div className="row">
                            <h1 className='display-3 text-center'>
                                Edit Student: {id}
                            </h1>
                            <div className="col-md-6 shadow mx-auto p-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder='Name'
                                            className="form-control"
                                            value={name}
                                            onChange={event => setName(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            placeholder='Email'
                                            className="form-control my-3"
                                            value={email}
                                            onChange={event => setEmail(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            placeholder='Number'
                                            className="form-control"
                                            value={number}
                                            onChange={event => setNumber(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value='Update Student'
                                               className='btn btn-block btn-dark mt-3'/>
                                        <Link to="/" className='btn btn-danger mt-3 mx-3'>
                                            Cancel
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>OMG!</strong> Student contact with {id} not exists.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )
            }
        </div>
    );
};

export default EditContact;