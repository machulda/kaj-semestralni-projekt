import React from 'react';
import { ListViewContextProvider } from '../contexts/ListViewContext';
import ListView from '../components/List/ListView';
import './list.scss';

const List = ({ location, match }) => {
    const { title } = match.params;
    const { search } = location;
    return (
        <ListViewContextProvider>
            <ListView title={title} search={search} />
        </ListViewContextProvider>
    );
}

export default List;