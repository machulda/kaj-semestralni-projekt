import React, { useContext } from 'react';
import PageContext from '../../contexts/PageContext';

const PageTitle = () => {
    const { pageTitle } = useContext(PageContext);
    return (
        <div className="title">{pageTitle}</div>
    );
}

export default PageTitle;