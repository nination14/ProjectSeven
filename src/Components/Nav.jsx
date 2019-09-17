import React from "react";
import { NavLink } from 'react-router-dom';
 //linking navigation tabs
const Nav = () => {
    return (
        <nav className="main-nav">
            <ul>
           
                <li> 
                    <NavLink to="/dogs">Dogs</NavLink>
                </li>
                <li>
                    <NavLink to="/nature">Nature</NavLink>
                </li>
                <li>
                    <NavLink to="/soccer">Soccer</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;