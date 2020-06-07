import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Unimplemented from '../components/Unimplemented';
import NotFound from '../components/NotFound';
import UserContext from '../contexts/UserContext';

const Unknown = ({ location }) => {
    const { isMenuItem } = useContext(UserContext);

    return isMenuItem(location.pathname) ? <Unimplemented /> : <NotFound />
}

export default withRouter(Unknown);