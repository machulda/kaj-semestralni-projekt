import React from 'react';
import ContentLoader from "react-content-loader";
import { getRandomInt } from '../../utils/MathUtils';
import RelationLoader from './RelationLoader';

const DetailLoader = () => {
    const loader = () => {
        const width = `${getRandomInt(90, 35)}%`;
        return (
            <ContentLoader
                speed={getRandomInt(6, 2)}
                backgroundColor="#f0eef0"
                foregroundColor="#e3e1e3"
                width="100%"
                height="60"
            >

                <rect x="0" y="5" rx="5" ry="5" width={width} height="12" />
                <rect x="0" y="28" width="100%" height="32" />
            </ContentLoader >
        )
    }
    const loaders = [];
    for (let i = 0; i < 3; i++) {
        loaders.push(loader());
    }
    return (
        <div id='detail-view'>
            <div className="entity-data">
                <form className="col-md-12" id="entity-form">
                    {
                        loaders.map((loader, i) => (
                            <label key={i} style={{ width: `${100 / loaders.length}%` }}>
                                {loader}
                            </label>
                        ))
                    }
                </form>
            </div>
            <div className="relations">
                <RelationLoader />
            </div>
        </div>
    );
}

export default DetailLoader;