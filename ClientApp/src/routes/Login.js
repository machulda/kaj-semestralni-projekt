import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { handleErrors, fetchFromApi } from '../utils/FetchUtils';
import { format } from '../utils/StringUtils';
import logo from '../styles/img/logo.png';
import './login.scss';
import UserContext from '../contexts/UserContext';
import PageContext from '../contexts/PageContext';
import VersionContext from '../contexts/VersionContext';

const Login = ({ location }) => {
    const { from } = location.state || { from: '/' };
    const { authenticated, setAuthenticated } = useContext(UserContext);
    const { setPageTitle } = useContext(PageContext);
    const { versions, VersionType, Versions, fetchVersionInfo } = useContext(VersionContext);
    const { t } = useTranslation();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchVersionInfo('serveradmin/version', VersionType.Version, Versions.ServerAdmin);
        fetchVersionInfo('dataservice/version', VersionType.Version, Versions.WsData);
        setPageTitle(t('LOGIN_TITLE'));
        return () => setPageTitle('');
    },[])

    const submit = e => {
        e.preventDefault();

        fetchFromApi('account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                password,
                rememberMe
            })
        }).then(handleErrors)
            .then(r => r.json())
            .then(r => {
                if (r.succeeded) {
                    setAuthenticated(true);
                } else {
                    setPassword('');
                    if (r.isLockedOut) {
                        setErrorMessage("Account is locked out");
                    } else {
                        setErrorMessage(t('INVALID_USERNAME_PASSWORD'));
                    }
                }
            })
            .catch(e => {
                //once backend stops throwing on wrong username, this should be changed to some other type of error
                setErrorMessage(t('INVALID_USERNAME_PASSWORD'));
                setPassword('');
            })
    }

    return (
        authenticated
            ? <Redirect to={from} />
            : (
                <div id="login">
                    <div className="top">
                        <img src={logo} alt="logo" />
   
                        <form onSubmit={submit}>
                            <h1>
                                {t('SING_IN_TO_ACCOUNT')}
                            </h1>
                            <Alert color="danger" isOpen={errorMessage.length != false} toggle={() => setErrorMessage('')} fade={false}>
                                {errorMessage}
                            </Alert>

                            <div className="text-input">
                                <i className="icon-user"></i>
                                <input type="text" autoComplete="username" value={userName} onChange={e => setUserName(e.target.value)} placeholder="E-mail" />
                            </div>

                            <div className="text-input">
                                <i className="icon-lock"></i>
                                <input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder={t('PASSWORD')}/>
                            </div>

                            <label>
                                <input type="checkbox" value={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                                {t('REMEMBER_ME')}
                            </label>

                            <div className="submit-buttons">
                                <Link to="/registration">{t('REGISTER')}</Link>
                                <input type="submit" value={t('SIGN_IN')} />
                            </div>

                            <div className="account-navlinks">
                                <Link to="/activation">{t('ACTIVATION')}</Link>
                                <Link to="/forgotten-password">{t('FORGOTTEN_PASSWORD')}</Link>
                            </div>
                        </form>
                    </div>

                    <div className="version">
                        <p>{format(t('APP_VERSION'), versions[Versions.ServerAdmin])}</p>
                        <p>{format(t('WS_DATA_VERSION'), versions[Versions.WsData])}</p>
                    </div>
                </div>
            )
    );
}

export default Login;