import React, { createContext, useState, useEffect } from 'react';

const PaginationContext = createContext();

export const PaginationContextProvider = ({ children }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [totalCount, setTotalCount] = useState(0);

    const pageCount = () => (pageSize ? (Math.floor(totalCount / pageSize)) + (totalCount % pageSize === 0 ? 0 : 1) : 0);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    return (
        <PaginationContext.Provider
            value={{
                page, setPage,
                pageSize, setPageSize,
                pageCount,
                totalCount, setTotalCount
            }}
        >
            {children}
        </PaginationContext.Provider>
    );
}

export default PaginationContext;