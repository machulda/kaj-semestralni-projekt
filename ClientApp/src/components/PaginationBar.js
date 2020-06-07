import React, { useContext } from 'react';
import { format } from '../utils/StringUtils';
import { useTranslation } from 'react-i18next';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import PaginationContext from '../contexts/PaginationContext';
import './pagination-bar.scss';

const PaginationBar = () => {
    const { t } = useTranslation();
    const { totalCount, page, setPage, setPageSize, pageSize, pageCount } = useContext(PaginationContext);
    return (
        <div className="pagination">
            <div className="pagination-left">
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                    &lt;&lt;
                </button>

                <Select2
                    defaultValue={page}
                    data={[...Array(pageCount())].map((_, i) => i + 1)}
                    onChange={e => setPage(parseInt(e.target.value))}
                    style={{ width: "62px" }}
                />

                <span className="pagination-description">
                    {format(t('OF_Y_NUMRECORDS'), pageCount(), totalCount)}
                </span>

                <button disabled={page >= pageCount()} onClick={() => setPage(page + 1)}>
                    &gt;&gt;
                </button>
            </div>
            <div className="pagination-right">
                <Select2
                    defaultValue={pageSize}
                    data={[...Array(10)].map((_, i) => (i + 1)*10)}
                    onChange={e => setPageSize(parseInt(e.target.value))}
                    style={{ width: "76px" }}
                />
                <span className="pagination-description">
                    {t('RECORDS_PER_PAGE')}
                </span>
            </div>
        </div>
    );
}

export default PaginationBar;