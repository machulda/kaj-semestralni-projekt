import React, { useContext } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import IdleTimer from 'react-idle-timer';

const PrivateRouteWrapper = ({ children, location, ...rest }) => {
    const { authenticated } = useContext(UserContext);
    const history = useHistory();
    const idleTimeout = 15*60*1000; //number of mins * 60sec * 1000ms
    const idleAction = () => {
        history.push('/logout');
    }

    return (
        <Route {...rest}>
            {
                authenticated
                    ? (
                        <IdleTimer
                            timeout={idleTimeout}
                            onIdle={idleAction}
                        >
                            {children}
                        </IdleTimer>    
                    )
                    : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: location.pathname+location.search }
                        }} />    
                    )
            }
        </Route>
    );
}

export default PrivateRouteWrapper;