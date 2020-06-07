import React, { createContext, useState, useEffect } from 'react';
import { FetchStatus, handleErrors, fetchFromApi } from '../utils/FetchUtils';

const ListViewContext = createContext();

export const ListViewContextProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(FetchStatus.LOADING);
    const [endpoint, setEndpoint] = useState('');
    const [sortedBy, setSortedBy] = useState(null);
    const [ascending, setAscending] = useState(true);

    const fetchData = (filterParams='') => {
        if (endpoint) {  //endpoint must be set
            fetchFromApi(`${endpoint}/list${filterParams}`, { cache: 'reload' })
                .then(handleErrors)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    setSortedBy(null);
                    setStatus(FetchStatus.SUCCESS);
                })
                .catch(e => {
                    console.log(e);
                    setStatus(FetchStatus.FAILURE);
                });
        }
    }
    const sortBy = property => {
        const asc = sortedBy !== property ? true : !ascending; //value in state is not changed immediately so we need temp storage
        setAscending(asc); 
        data.entityList.sort((a, b) => {
            const left = a[property];
            const right = b[property];

            if (left === right) {
                return 0;
            } else if (left === null) {
                return 1;
            } else if (right === null) {
                return -1;
            }

            let toRet;
            if (typeof left === 'string') {
                toRet = left.localeCompare(right);
            } else {
                toRet = left < right ? -1 : 1;
            }
            return asc ? toRet : -1*toRet;
        });
        setSortedBy(property);
    }

    return (
        <ListViewContext.Provider
            value={{
                sortBy, sortedBy, ascending,
                endpoint, setEndpoint,
                data, setData, fetchData,
                status, setStatus
            }}
        >
            {children}
        </ListViewContext.Provider>
    );
}

export default ListViewContext;