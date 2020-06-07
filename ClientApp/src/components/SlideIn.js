import React from 'react';
import './slide-in.scss';

const SlideIn = ({ isOpen, children, ...rest }) => {
    return (
        <div className={`slider ${isOpen ? 'slide-in' : 'slide-out'}`} {...rest}>
            {children}
        </div>
    );
}

export default SlideIn;