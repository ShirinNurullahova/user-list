import React from 'react';
import loader from '../images/loader.svg';

const Loading = () => {
    return (
        <div className="loader">
            <img src={loader} alt="loading..." />
        </div>
    )
}

export default Loading;