import React, { createContext, useState, useEffect } from 'react';
import { handleErrors, fetchFromApi } from '../utils/FetchUtils';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(null);
    const [menus, setMenus] = useState(null);

    const isMenuItem = (uri, items = menus) => {
        for (const item of items) {
            if (`/${item.fbUserMenu.link}` === uri) {
                return true;
            } else {
                if (item.childMenus.length) {
                    if (isMenuItem(uri, item.childMenus)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    useEffect(() => {
        if (authenticated) {
            fetchFromApi('account/id')
                .then(handleErrors)
                .then(r => r.text())
                .then(id => setUserId(id))
                .catch(e => {
                    //
                });

            fetchFromApi('account/username')
                .then(handleErrors)
                .then(r => r.text())
                .then(data => setUsername(data))
                .catch(e => setUsername('...'));

            fetchFromApi('account/menu')
                .then(handleErrors)
                .then(response => response.json())
                .then(menus => setMenus(menus))
                .catch(e => {
                    //
                });

        } else {
            setUserId(null);
            setUsername('');
            setMenus([]);
        }
    }, [authenticated]);

    return (
        <UserContext.Provider value={{
            authenticated, setAuthenticated,
            username, userId,
            menus, isMenuItem
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;