import React, { createContext, useState } from 'react';

const LayoutContext = createContext();

export const LayoutContextProvider = ({ children }) => {
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const toggleSideBar = () => setSideBarOpen(!sideBarOpen);
    return (
        <LayoutContext.Provider value={{ sideBarOpen, toggleSideBar }}>
            {children}
        </LayoutContext.Provider>  
    );
}

export default LayoutContext;