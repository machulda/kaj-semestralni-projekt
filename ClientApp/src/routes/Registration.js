import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import './registration.scss';
import logo from '../styles/img/logo.png';

const Registration = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(1);
    const submit = e => {
        e.preventDefault();
    }
    return (
        <div id='registration'>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <form onSubmit={submit}>
                <h1>{t('REGISTRATION_DATA')}</h1>

                <input type='text' className="email-input" placeholder={t('MAIL')} autoComplete='username' />

                <div className="passwords">
                    <div className="text-input">
                        <i className="icon-lock"></i>
                        <input type='password' placeholder={t('PASSWORD')} autoComplete='new-password' />
                    </div>
                    <div className="text-input">
                        <i className="icon-lock"></i>
                        <input type='password' placeholder={t('CONFIRM_PASSWORD')} autoComplete='new-password'/>
                    </div>
                </div>

                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={activeTab === 1 ? 'active' : ''}
                            onClick={() => setActiveTab(1)}
                        >
                            {t('PERSON_DATA')}
                        </NavLink>
                        <NavLink
                            className={activeTab === 2 ? 'active' : ''}
                            onClick={() => setActiveTab(2)}
                        >
                            {t('PARTNER_DATA')}
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId={1}>
                        <h2>{t('PERSON_DATA')}</h2>

                        <input type='text' placeholder={t('TITLE')} autoComplete='honorific-prefix' />
                        <input type='text' placeholder={t('FIRST_NAME')} autoComplete='given-name' />
                        <input type='text' placeholder={t('LAST_NAME')} autoComplete='family-name' />
                        <label>
                            <span>{t('BIRTH_DATE')}</span>
                            <input type='datetime-local' autoComplete='bday' />
                        </label>
                        <Select2
                            data={[]}
                            options={{ placeholder: t('CITY')} }
                        />
                        <Select2
                            data={[]}
                            options={{ placeholder: t('STREET') }}
                        />
                        <input type='text' placeholder={t('ORIENTATION_NUMBER')} autoComplete='street-address' />
                        <div id='phone-contact'>
                            <label for='phone-number'>
                                <span>{t('PHONE_CONTACT')}</span>
                            </label>
                            <div id='phone-inputs'>
                                <Select2
                                    data={[]}
                                    options={{ placeholder: 'A' }}
                                />
                                <input type='tel' id='phone-number' placeholder={t('PHONE_NUMBER')} autoComplete='tel' />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tabId={2}>
                        <h2>{t('PARTNER_DATA')}</h2>

                        <input type='text' placeholder={t('NAME')} autoComplete='organization' />
                        <Select2
                            data={[]}
                            options={{ placeholder: t('CITY') }}
                        />
                        <Select2
                            data={[]}
                            options={{ placeholder: t('STREET') }}
                        />
                        <input type='text' placeholder={t('ORIENTATION_NUMBER')} autoComplete='street-address' />
                        <input type='text' placeholder={t('MAIL')} autoComplete='email' />
                        <input type='text' placeholder={t('WWW')} autoComplete='url' />
                        <input type='text' placeholder={t('TIN')} />
                        <input type='text' placeholder={t('VATIN')} />
                    </TabPane>
                </TabContent>

                <div className='submit-buttons'>
                    <Link to='login'>{t('SIGN_IN')}</Link>
                    <input type='submit' value={t('REGISTER')} />
                </div>
            </form>
        </div>
    );
}

export default Registration;