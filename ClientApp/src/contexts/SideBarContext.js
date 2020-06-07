import React, { createContext, useState } from 'react';

const SideBarContext = createContext();

export const SideBarContextProvider = ({ children }) => {
    const [currentlyOpen, setCurrentlyOpen] = useState(null);
    const openItem = (id) => setCurrentlyOpen(currentlyOpen === id ? null : id);
    return (
        <SideBarContext.Provider value={{ currentlyOpen, openItem }}>
            {children}
        </ SideBarContext.Provider>
    );
}

export default SideBarContext;