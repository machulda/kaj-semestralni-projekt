import React, { createContext, useState } from 'react';
import { handleErrors, fetchFromApi } from '../utils/FetchUtils';

const VersionContext = createContext();

export const VersionContextProvider = ({ children }) => {
    const Versions = {
        ServerAdmin: 0,
        WsCmd: 1,
        WsData: 2,
        WsScripting: 3,
        Db: 4,
        DataLib: 5,
        Client: 4
    }

    const VersionType = {
        Version: 0,
        Date: 1,
        Ip: 2
    }

    const [versions, setVersions] = useState(Array(6).fill('...'));
    const [dates, setDates] = useState(Array(6).fill('Loading...'));
    const [ips, setIps] = useState(Array(6).fill('Loading...'));
    const fetchVersionInfo = (endpoint, type, index) => {
        let setter;
        switch (type) {
            case VersionType.Version:
                setter = setVersions;
                break;
            case VersionType.Date:
                setter = setDates;
                break;
            case VersionType.Ip:
                setter = setIps;
                break;
            default:
                return;
        }

        fetchFromApi(endpoint, { cache: 'reload' })
            .then(handleErrors)
            .then(response => response.text())
            .then(data => {
                setter(oldData => oldData.map((val, i) => i === index ? data : val));
            })
            .catch(e => {
                console.log(e);
                setter(oldData => oldData.map((val, i) => i === index ? "Unable to obtain" : val));
            });
    }

    return (
        <VersionContext.Provider value={{
            Versions,
            VersionType,
            fetchVersionInfo,
            versions,
            dates,
            ips,
        }}>
            {children}
        </VersionContext.Provider>    
    );
}

export default VersionContext;