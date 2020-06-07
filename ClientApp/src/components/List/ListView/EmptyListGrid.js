import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ListViewContext from '../../../contexts/ListViewContext';

const EmptyListGrid = () => {
    const { t } = useTranslation();
    const { data } = useContext(ListViewContext);
    return (
        <table className="fbxxx-table">
            <thead>
                <tr>
                    {data.columns.map(column => (
                        <th style={{ width: column.width }} key={column.name}>
                            {column.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={data.columns.length}>
                        {t('NO_RECORDS_FOUND')}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default EmptyListGrid;