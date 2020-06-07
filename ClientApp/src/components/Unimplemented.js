import React, { useContext, useEffect } from 'react';
import './unimplemented.scss';
import PageContext from '../contexts/PageContext';

const Unimplemented = () => {
    const { setPageTitle } = useContext(PageContext);
    useEffect(() => {
        setPageTitle('Neimplementováno');
        return () => setPageTitle('');
    }, [])
    return (
        <div id="unimplemented">
            <h1>Neimplementováno</h1>

            <table>
                <thead>
                    <tr>
                        <th>
                            Tato funkcionalita nebo požadovaný formulář momentálně není k dispozici
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <button onClick={() => window.history.back()}>
                                <span>
                                    <i className='icon-question'></i>
                                    Vrátit se zpět
                                </span>

                                <i className='icon-angle-right'></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Unimplemented;