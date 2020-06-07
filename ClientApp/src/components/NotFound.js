import React, { useContext, useEffect } from 'react';
import { Button } from 'reactstrap';
import './not-found.scss';
import PageContext from '../contexts/PageContext';

const NotFound = () => {
    const { setPageTitle } = useContext(PageContext);
    useEffect(() => {
        setPageTitle('Page not found');
        return () => setPageTitle('');
    }, []);
    return (
        <div id="not-found">
            <div>
                <h1>Oops!</h1>
                <h2>The page you were looking for is not available.</h2>
                <p>Please check that you typed in the address correctly</p>
                <p className="error">Error code: 404</p>
                <p>Try <Button color="link" onClick={() => window.history.back()}>going back</Button></p>
            </div>
        </div>
    );
}

export default NotFound;