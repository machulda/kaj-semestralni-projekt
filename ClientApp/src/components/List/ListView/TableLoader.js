import React from 'react';
import { getRandomInt } from '../../../utils/MathUtils';
import ContentLoader from "react-content-loader";

const TableLoader = () => {
    const loader = () => {
        const width = `${getRandomInt(90,35)}%`;
        return (
            <ContentLoader
                speed={getRandomInt(6,2)}
                backgroundColor="#f0eef0"
                foregroundColor="#e3e1e3"
                width="100%"
                height="24"
            >
                <rect x="5" y="7" rx="5" ry="5" width={width} height="10" />
            </ContentLoader >
        )
    }
    const loaders = [];
    const cols = 4;
    for (let i = 0; i < 15; i++) {
        const tmp = [];
        for (let j = 0; j < cols; j++) {
            tmp.push(loader());
        }
        loaders.push(tmp);
    }
    return (
        <table className="fbxxx-table">
            <tbody>
                <tr><td colSpan={cols}>{loader()}</td></tr>
                {
                    loaders.map((loaders, j) => (
                        <tr key={j}>
                            {loaders.map((loader, i) => (<td key={i}>{loader}</td>))}
                        </tr>
                    ))
                    }
                <tr><td colSpan={cols}>{loader()}</td></tr>
            </tbody>
        </table>
    );
}

export default TableLoader;