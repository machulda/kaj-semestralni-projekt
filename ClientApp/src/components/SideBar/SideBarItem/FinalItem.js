import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';

const FinalItem = ({ fbUserMenu, children }) => (
    <NavLink tag={Link} to={`/${fbUserMenu.link}`}>
        <i className={fbUserMenu.icon}></i>
        {children}
    </NavLink>
)

export default FinalItem;