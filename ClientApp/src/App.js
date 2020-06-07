import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { FetchStatus, handleErrors, fetchFromApi } from './utils/FetchUtils';
import Layout from './components/Layout';
import Home from './routes/Home';
import List from './routes/List';
import Login from './routes/Login';
import './locales/i18n';
import './styles/font/font-awesome.min.css';
import './styles/app.scss'
import './styles/font/fonts.css'
import PrivateRouteWrapper from './utils/PrivateRouteWrapper';
import Logout from './routes/Logout';
import Detail from './routes/Detail';
import PasswordChange from './routes/PasswordChange';
import Registration from './routes/Registration';
import Unknown from './routes/Unknown';
import UserContext from './contexts/UserContext';

const App = () => {
    const { setAuthenticated } = useContext(UserContext);
    const [status, setStatus] = useState(FetchStatus.LOADING);

    useEffect(() => {
        fetchFromApi('account/isauthenticated')
            .then(handleErrors)
            .then(response => response.json())
            .then(authenticated => {
                setAuthenticated(authenticated);
                setStatus(FetchStatus.SUCCESS);
            })
            .catch(e => setStatus(FetchStatus.FAILURE));
    }, []);

    switch (status) {
        case FetchStatus.SUCCESS:
            return (
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/registration' component={Registration} />
                    <Route path='/logout' component={Logout} />
                    <PrivateRouteWrapper path='*'>
                        <Layout>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route path='/:title/list' component={List} />
                                <Route path='/:title/detail/:id?' component={Detail} />

                                <Route path='/passwordchange' component={PasswordChange} />
                                <Route path='*' component={Unknown} />
                            </Switch>
                        </Layout>
                    </PrivateRouteWrapper>
                </Switch>
            );
        default:
        case FetchStatus.FAILURE:
            return <span>Failed to communicate with backend, please try refreshing the page</span>
        case FetchStatus.LOADING:
            return <span>Authenticating...</span>
    }
}

export default withRouter(App);