import React, {useState} from 'react';
import {useDispatch, useSelector,} from "react-redux";
import {toast} from "react-toastify";
import nextId from "react-id-generator";
import {useNavigate} from 'react-router-dom';

const AddContact = () => {
    let htmlId = nextId();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const contacts = useSelector((state) => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(contact => contact.email === email && contact)
        const checkNumber = contacts.find(contact => contact.number === parseInt(number))

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
            id: contacts[contacts.length - 1].id + 1,
            name,
            number,
            email,
        }
        dispatch({type: 'ADD_CONTACT', payload: data})
        toast.success('Student added successfully!!')
        navigate('/');
    }


    return (<div className='container'>
        <div className="row">
            <h1 className='display-3 text-center'>
                Add Contact
            </h1>
            <div className="col-md-6 shadow mx-auto p-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder='Name'
                            className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder='Email'
                            className="form-control my-3"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            placeholder='Number'
                            className="form-control"
                            value={number}
                            onChange={e => setNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value='Abb Student' className='btn btn-block btn-dark mt-3'/>
                    </div>
                </form>
            </div>
        </div>

    </div>);
};

export default AddContact;