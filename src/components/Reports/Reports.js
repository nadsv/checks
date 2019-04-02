import React from 'react';
import SearchingParams from '../SearchingParams/SearchingParams'
import ReportType from './ReportType/ReportType'

import './Reports.css';

const reports = ( props ) => (
    <div>
        <ReportType />
        <SearchingParams serviceName="Сформировать отчет"/>
    </div>
);

export default reports;
