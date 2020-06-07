import React from 'react';
import ContentLoader from "react-content-loader"
import { getRandomInt } from '../../utils/MathUtils';

const MenuLoader = () => {
    const loader = () => {
        return (
            <ContentLoader
                speed={getRandomInt(6,1)}
                width={250}
                height={50}
                backgroundColor="#f0eef0"
                foregroundColor="#e3e1e3"
            >
                <circle cx="25" cy="25" r="7" />
                <rect x="45" y="19" rx="5" ry="5" width={getRandomInt(80, 180)} height="12" />
            </ContentLoader>
        )
    }
    const loaders = [];
    for (let i = 0; i < 10; i++) {
        loaders.push(loader());
    }
    return loaders.map((loader, i) => <li key={i}>{loader}</li>)
}

export default MenuLoader;