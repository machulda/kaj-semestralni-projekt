import React, { useContext } from 'react';
import { Collapse } from 'reactstrap';
import { renderMenus } from '../../SideBar';
import SideBarContext from '../../../contexts/SideBarContext';

const CollapsableItem = ({ fbUserMenu, childMenus, children }) => {
    const { currentlyOpen, openItem } = useContext(SideBarContext);
    const { id } = fbUserMenu;
    const isOpen = currentlyOpen === id;
    return (
        <div>
            <button className={`anchor ${isOpen ? 'open' : ''}`} onClick={() => openItem(id)}>
                <i className={fbUserMenu.icon}></i>
                {children}
                <i className={`arrow ${isOpen ? 'icon-angle-down' : 'icon-angle-left'}`}></i>
            </button>
            <Collapse isOpen={isOpen}>
                <ul className="sub-menu">
                    {renderMenus(childMenus)}
                </ul>
            </Collapse>
        </div>
    );
}

export default CollapsableItem;