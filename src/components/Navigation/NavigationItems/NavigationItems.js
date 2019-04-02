import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className="navigation-items">
        <NavigationItem link="/" exact>Найти</NavigationItem>
        <NavigationItem link="/check/part1">Добавить</NavigationItem>
        <NavigationItem link="/reports">Отчеты</NavigationItem>
    </ul>
);

export default navigationItems;
