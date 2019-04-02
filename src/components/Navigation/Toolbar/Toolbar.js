import React from 'react';
import { NavLink } from 'react-router-dom';

import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = ( props ) => (
    <header className="toolbar">
          <div className="toolbar-wrapper">
            <div className="logo">
                <div className="icon"></div>
                <NavLink to="/" exact>
                  ПРОВЕРКИ
                </NavLink>
            </div>
            <nav>
                <NavigationItems />
            </nav>
          </div>
    </header>
);

export default toolbar;
