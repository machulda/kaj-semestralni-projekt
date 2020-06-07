import React, { useState, useContext } from 'react';
import PaginationContext, { PaginationContextProvider } from '../../contexts/PaginationContext';
import PaginationBar from '../PaginationBar';
import { Collapse } from 'reactstrap';
import crossSmall from '../../styles/img/cross-small.png';
import { firstLetterToLower } from '../../utils/StringUtils';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

//TODO refactor into context instead of prop passing
const Relation = ({ data, readOnly }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="relation">
            <div className="header">
                <span>
                    <i className="icon-reorder"></i>
                    {data.listTitle}
                </span>
                <div className="controls">
                    {!readOnly &&
                        <button>
                            <i className="icon-plus-sign"></i>
                        </button>
                    }
                    
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <i className="icon-angle-down"></i>
                    </button>
                </div>
            </div>

            <Collapse isOpen={isOpen}>
                <PaginationContextProvider>
                    {data.entityList.length
                        ? <RelationTable data={data} readOnly={readOnly} />
                        : <EmptyRelationTable data={data} readOnly={readOnly} />
                    }
                </PaginationContextProvider>
            </Collapse>
        </div>
    );
}

const RelationTable = ({ data, readOnly }) => {
    const { page, pageSize, setTotalCount } = useContext(PaginationContext);

    useEffect(() => {
        setTotalCount(data.entityList.length);
    },[data])

    return (
        <table className="fbxxx-table">
            <thead>
                <tr>
                    <th colSpan={data.columns.length + (readOnly ? 0 : 1)}>
                        <PaginationBar />
                    </th>
                </tr>
                <tr>
                    {data.columns.map(column => (
                        <th style={{ width: column.width }} key={column.name}>
                            {column.title}
                        </th>
                    ))}
                    {!readOnly &&
                        <th>
                            Odebrat
                        </th>
                    }
                </tr>
            </thead>
            <tbody>
                {data.entityList
                    .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize) //get data from current page
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
                            {!readOnly &&
                                <td>
                                    <button className="remove-relation">
                                        <img src={crossSmall} />
                                    </button>
                                </td>
                            }
                        </tr>
                    ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={data.columns.length + (readOnly ? 0 : 1)}>
                        <PaginationBar />
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}

const EmptyRelationTable = ({ data, readOnly }) => {
    const { t } = useTranslation();

    return (
        <table className="fbxxx-table">
            <thead>
                <tr>
                    {data.columns.map(column => (
                        <th style={{ width: column.width }} key={column.name}>
                            {column.title}
                        </th>
                    ))}
                    {!readOnly &&
                        <th>
                            Odebrat
                        </th>
                    }
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={data.columns.length + (readOnly ? 0 : 1)}>
                        {t('NO_RECORDS_FOUND')}
                    </td>
                </tr>
            </tbody>
        </table>  
    );
}

export default Relation;