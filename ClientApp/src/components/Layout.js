import React, { useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import SlideIn from './SlideIn';
import HeaderNavBar from './HeaderNavBar';
import SideBar from './SideBar';
import LayoutContext, { LayoutContextProvider } from '../contexts/LayoutContext';

import './layout.scss';


const Layout = (props) => {
    return (
        <LayoutContextProvider>
            <header id="header">
                <HeaderNavBar />
            </header>
            <AppContent {...props}/>
        </LayoutContextProvider>
    );
}

const AppContent = ({ children }) => {
    const { sideBarOpen } = useContext(LayoutContext);
    return (
        <div id="flex-layout">
            <SlideIn isOpen={sideBarOpen}>
                <div id="side-bar" className="column" >
                    <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200} autoHeight autoHeightMax="calc(100vh - 52px)">
                        <SideBar />
                    </Scrollbars>
                </div>
            </SlideIn>
            <main className="column">
                {children}
            </main>
        </div>
    );
}

export default Layout;