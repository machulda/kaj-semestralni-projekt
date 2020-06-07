import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firstLetterToLower, firstLetterToUpper } from '../../../utils/StringUtils';
import ListViewContext from '../../../contexts/ListViewContext';
import PaginationBar from '../../PaginationBar';
import PaginationContext from '../../../contexts/PaginationContext';

const ListGrid = () => {
    const { page, pageSize, setPage, setTotalCount } = useContext(PaginationContext);
    const { data, sortedBy, sortBy, ascending } = useContext(ListViewContext);

    useEffect(() => {
        setPage(1);
    }, [data, sortedBy])

    useEffect(() => {
        setTotalCount(data.entityList.length);
    }, [data])
    
    return (
        <table className="fbxxx-table">
            <thead>
                <tr>
                    <th colSpan={data.columns.length}>
                        <PaginationBar />
                    </th>
                </tr>
                <tr>
                    {data.columns.map(column => (
                        <th style={{ width: column.width }} key={column.name}>
                            <button className={`sort-button ${sortedBy === firstLetterToLower(column.name) ? 'selected' : ''}`} onClick={() => sortBy(firstLetterToLower(column.name))}>
                                {column.title}
                                {sortedBy === firstLetterToLower(column.name)
                                    ? <i className={ascending ? 'icon-angle-down' : 'icon-angle-up'}></i>
                                    : ''
                                }
                            </button>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.entityList
                    .slice((page-1)*pageSize,(page-1)*pageSize+pageSize) //get data from current page
                    .map(entity => ( //make row for each entity in list
                        <tr key={entity.id}>
                            {data.columns
                                .map(column => (
                                    <td key={column.name}>
                                        {column.detailUrl
                                            ? (
                                                <Link to={`/${column.detailUrl}/detail/${entity[firstLetterToLower(column.detailProperty)]}`}>
                                                    {entity[firstLetterToLower(column.name)]}
                                                </Link>
                                            )
                                            : entity[firstLetterToLower(column.name)]
                                        }
                                    </td>
                                ))}
                        </tr>
                    ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={data.columns.length}>
                        <PaginationBar />
                    </td>
                </tr>
            </tfoot>
        </table>  
    );
}

export default ListGrid;