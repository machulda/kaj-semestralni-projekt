import React, { useState, createContext, useEffect } from 'react';

const PageContext = createContext();

export const PageContextProvider = ({ children }) => {
    const [pageTitle, setPageTitle] = useState('ServerAdmin');
    const [customButtons, setCustomButtons] = useState([]);

    useEffect(() => {
        document.title = pageTitle ? `ServerAdmin - ${pageTitle}` : 'ServerAdmin';
    }, [pageTitle]);

    return (
        <PageContext.Provider value={{
            pageTitle, setPageTitle,
            customButtons, setCustomButtons
        }}>
            {children}
        </PageContext.Provider>    
    );
}

export default PageContext;