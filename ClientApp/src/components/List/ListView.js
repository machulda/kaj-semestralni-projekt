import React, { useEffect, useContext } from 'react';
import { FetchStatus } from '../../utils/FetchUtils';
import ListViewContext from '../../contexts/ListViewContext';
import TableLoader from './ListView/TableLoader';
import FilterLoader from './ListView/FilterLoader';
import ListGrid from './ListView/ListGrid';
import EmptyListGrid from './ListView/EmptyListGrid';
import ListFilter from './ListView/ListFilter';
import Unknown from '../../routes/Unknown';
import PageContext from '../../contexts/PageContext';
import { PaginationContextProvider } from '../../contexts/PaginationContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'reactstrap';

const ListView = ({ title, search }) => {
    const { setPageTitle, setCustomButtons } = useContext(PageContext);
    const { setStatus, status, data, fetchData, endpoint, setEndpoint } = useContext(ListViewContext);
    const { t } = useTranslation();

    useEffect(() => {
        setStatus(FetchStatus.LOADING);
        setPageTitle('Loading...');
        setEndpoint(title);
        setCustomButtons([]);
    }, [title]);

    useEffect(() => {
        fetchData(search);
    }, [endpoint]);

    useEffect(() => {
        if (data) {
            setPageTitle(data.listTitle);
            const buttons = [<button form="filter-form" className="anchor"><i className="icon-filter"></i>{t('APPLY_FILTER')}</button>];
            if (data.canCreateEntity) {
                buttons.unshift((
                    <NavLink tag={Link} to={`/${title}/detail/new`}>
                        <i className='icon-plus-sign'></i>
                        {t('NEW_ENTITY')}
                    </NavLink>
                ));
            }
            setCustomButtons(buttons);
        }
    }, [data]);

    useEffect(() => {
        return () => {
            setPageTitle('');
            setCustomButtons([]);
        }
    },[])

    switch (status) {
        case FetchStatus.SUCCESS:
            return (
                <div id='list-view'>
                    <ListFilter />
                    {data.entityList.length ? <PaginationContextProvider><ListGrid /></PaginationContextProvider> : <EmptyListGrid />}
                </div>
            );
        case FetchStatus.LOADING:
            return (
                <div id='list-view'>
                    <FilterLoader />
                    <TableLoader />
                </div>
            );
        default:
        case FetchStatus.FAILURE:
            return <Unknown />;
    }
}

export default ListView;