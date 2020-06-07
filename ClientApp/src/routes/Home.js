import React, { useEffect, useContext } from 'react';
import PageContext from '../contexts/PageContext';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
    const { setPageTitle } = useContext(PageContext);
    useEffect(() => {
        setPageTitle(t('DEFAULT'));
        return () => setPageTitle('')
    },[]);
    return (
        <div>
        </div>
    );
}

export default Home;