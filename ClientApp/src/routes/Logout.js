import React, { useEffect, useContext } from "react";
import { Redirect } from 'react-router-dom';
import { handleErrors, fetchFromApi } from '../utils/FetchUtils';
import UserContext from "../contexts/UserContext";

const Logout = () => {
    const { setAuthenticated } = useContext(UserContext);
    useEffect(() => {
        setAuthenticated(false);
        fetchFromApi('account/logout')
            .then(handleErrors)
            .catch(e => console.log(e));
    },[])
    return <Redirect to='/login' />
}

export default Logout;