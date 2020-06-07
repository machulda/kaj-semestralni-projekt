import React, { useContext, useState } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import ListViewContext from '../../../contexts/ListViewContext';

const ListFilter = ({ location, history }) => {
    const { data, fetchData } = useContext(ListViewContext);
    const [values, setValues] = useState(initializeValues(data.filterColumns, location.search));
    
    const submit = e => {
        e.preventDefault();
        let filterParams = '';
        if (values) {
            filterParams += "?"
            for (const filter of Object.values(values)) {
                filterParams += `filterString=${filter}&`;
            }
            filterParams = filterParams.slice(0, -1);
            history.push(`${location.pathname}${filterParams}`);
        }
        fetchData(filterParams);
    }

    return (
        <div className="filter">
            <h1>{data.listTitle}</h1>
            <form className="col-md-12" id="filter-form" onSubmit={submit}>
                {data.filterColumns
                    .map((column, i) => {
                        return (
                            <label key={column.name} className={column.width}>
                                <span>{column.title}</span>
                                <input
                                    type="text"
                                    name="filterString"
                                    value={values[i]}
                                    onChange={e => {
                                        const newValue = e.target.value;
                                        setValues(
                                            values.map((oldValue, j) => i === j ? newValue : oldValue)
                                        )
                                    }}
                                />
                            </label>
                        )})}
            </form>
        </div>
    );
}

const initializeValues = (columns, queryString) => {
    let { filterString } = qs.parse(queryString, { ignoreQueryPrefix: true });
    if (filterString) { //there is at least one filter param in url
        if (!Array.isArray(filterString)) { //if there is only one query param
            filterString = [filterString];
        }
        return [...filterString, ...Array(columns.length - filterString.length).fill('')];
    } else {
        return Array(columns.length).fill('');
    }
}

export default withRouter(ListFilter);

