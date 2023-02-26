import React from 'react';

import loaderSrc from '../../assets/loader.svg';
import './Loader.scss';

export const Loader = () => {
    return (
        <img className="loader" src={ loaderSrc } alt=""/>
    );
};
