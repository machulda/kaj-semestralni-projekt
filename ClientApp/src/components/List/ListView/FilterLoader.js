import React from 'react';
import { getRandomInt } from '../../../utils/MathUtils';
import ContentLoader from "react-content-loader";

const FilterLoader = () => {
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
    const width = getRandomInt(500,250);
    return (
        <div className="filter">
            <h1>
                <ContentLoader
                    speed={getRandomInt(6, 2)}
                    backgroundColor="#f0eef0"
                    foregroundColor="#e3e1e3"
                    width="500"
                    height="25"
                >
                    <rect x={250-width/2} y="6" rx="10" ry="10" width={width} height="18" />
                </ContentLoader >
            </h1>
            <form className="col-md-12">
                {
                    loaders.map((loader, i) => (
                        <label key={i} style={{ width: `${100 / loaders.length}%` }}>
                            {loader}
                        </label>
                    ))
                }
            </form>
        </div>
    );
}

export default FilterLoader;