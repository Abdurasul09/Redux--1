import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2">
            <NavLink to='/' className="navbar-brand ml-5">
                Contact App
            </NavLink>
        </nav>
    );
};

export default Navbar;