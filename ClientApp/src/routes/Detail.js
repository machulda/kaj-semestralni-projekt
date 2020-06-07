import React from 'react';
import DetailView from '../components/Detail/DetailView';
import './detail.scss';

const Detail = ({ location, match }) => {
    const { title, id } = match.params;
    const { search } = location;
    return (
        <DetailView title={title} id={id} search={search} />
    );
}

export default Detail;