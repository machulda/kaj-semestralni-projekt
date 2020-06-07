import React, { useState, useContext } from 'react';
import { Alert } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import './password-change.scss';
import { handleErrors, fetchFromApi } from '../utils/FetchUtils';
import UserContext from '../contexts/UserContext';
import PageContext from '../contexts/PageContext';
import { useEffect } from 'react';

const PasswordChange = () => {
    const { t } = useTranslation();
    const { userId } = useContext(UserContext);
    const { setPageTitle } = useContext(PageContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [result, setResult] = useState({ succeeded: false, errors: [] });

    useEffect(() => {
        setPageTitle(t('PASSWORD_CHANGE'));

        return () => setPageTitle('')
    },[])

    const closeSuccessAlert = () => {
        setResult({ succeeded: false, errors: [] });
    }

    const removeError = i => {
        result.errors.splice(i, 1);
        setResult({
            succeeded: false,
            errors: result.errors
        });
    }

    const submit = e => {
        e.preventDefault();
        fetchFromApi('account/changepassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userId,
                currentPassword,
                newPassword,
                confirmPassword
            })
        }).then(handleErrors)
            .then(r => r.json())
            .then(r => setResult(r))
            .catch(e => {
                setResult({
                    succeeded: false,
                    errors: [
                        {
                            description: t('PASSWORD_CHANGE_ERROR')
                        }
                    ]
                })
            })
            .finally(() => {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            });
    }

    return (
        <div id="password-change">
            {result.succeeded
                ? (
                    <Alert
                        color='success'
                        toggle={closeSuccessAlert}
                        fade={false}
                    >
                        {t('PASSWORD_CHANGED')}
                    </Alert>
                )
                : result.errors.map((e, i) => (
                    <Alert
                        key={i}
                        color='danger'
                        toggle={() => { removeError(i) }}
                        fade={false}
                    >
                        <strong>{`${t('ERROR')}! `}</strong>
                        {e.description}
                    </Alert>
            ))}

            <form id='password-change' onSubmit={submit}>
                <div className='header'>
                    <span>
                        <i className='icon-unlock-alt'></i>
                        {t('PASSWORD_CHANGE')}
                    </span>
                    <button>
                        <i className='icon-save'></i>
                        {t('SAVE')}
                    </button>
                </div>
                <div className='body'>
                    <label>
                        <span>{t('OLD_PASSWORD')}</span>
                        <input
                            autoComplete="current-password"
                            type="password"
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>{t('NEW_PASSWORD')}</span>
                        <input
                            autoComplete="new-password"
                            type="password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>{t('CONFIRM_PASSWORD')}</span>
                        <input
                            autoComplete="new-password"
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </label>
                </div>
            </form>
        </div>
    );
}

export default PasswordChange;