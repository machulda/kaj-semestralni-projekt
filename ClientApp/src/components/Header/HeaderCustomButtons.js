import React, { useContext } from 'react';
import { NavItem } from 'reactstrap';
import PageContext from '../../contexts/PageContext';

const HeaderCustomButtons = () => {
    const { customButtons } = useContext(PageContext);
    return (
        customButtons.map((item, i) => <NavItem key={i}>{item}</NavItem>)
    );
}

export default HeaderCustomButtons;