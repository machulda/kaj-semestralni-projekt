import React, { useContext } from 'react';
import { SideBarContextProvider } from '../contexts/SideBarContext';
import MenuLoader from './SideBar/MenuLoader';
import SideBarItem from './SideBar/SideBarItem';

import './side-bar.scss';
import UserContext from '../contexts/UserContext';

export const renderMenus = menus => (
    <SideBarContextProvider>
        {
            menus.sort((m1, m2) => {
                const [left, right] = [m1.fbUserMenu.blockOrder, m2.fbUserMenu.blockOrder];
                return left < right ? -1 : left > right ? 1 : 0;
            }).map(menu => (
                <SideBarItem key={menu.fbUserMenu.id} fbUserMenu={menu.fbUserMenu} childMenus={menu.childMenus}>
                    {menu.title}
                </SideBarItem>
            ))
        }
    </ SideBarContextProvider>
)

const SideBar = () => {
    const { menus } = useContext(UserContext);  
    let content = menus ? renderMenus(menus) : <MenuLoader />;

    return (
        <nav>
            <ul>
                {content}
            </ul>
        </nav>
    );
}

export default SideBar;