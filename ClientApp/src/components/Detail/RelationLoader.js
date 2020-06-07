import React from 'react';
import TableLoader from '../List/ListView/TableLoader';
import { getRandomInt } from '../../utils/MathUtils';
import ContentLoader from 'react-content-loader';

const RelationLoader = () => {
    const width = getRandomInt(450, 100);
    return (
        <div className="relation">
            <div className="header">
                <span>
                    <i className="icon-reorder"></i>
                    <ContentLoader
                        speed={getRandomInt(6, 2)}
                        backgroundColor="#f0eef0"
                        foregroundColor="#e3e1e3"
                        width="500"
                        height="20"
                    >
                        <rect x="5" y="3" rx="10" ry="10" width={width} height="14" />
                    </ContentLoader >
                </span>
                <div className="controls">
                    <button>
                        <i className="icon-angle-down"></i>
                    </button>
                </div>
            </div>

            <TableLoader />
        </div>
    );
}

export default RelationLoader;