import React from 'react';

import SearchingParams from '../SearchingParams/SearchingParams'
import SearchingResults from './SearchingResults/SearchingResults'

import './Searching.css';

const searching = ( props ) => (
    <div>
          <SearchingParams serviceName="Найти проверки"/>
          <SearchingResults/>
    </div>
);

export default searching;
