import React from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

import * as actionTypes from '../../../../store/actions/actionTypes';

import './NavigationItem.css';

const navigationItem = ( props ) => (


    <li className="NavigationItem">
        <div onClick={() =>  { props.onSetCheck(false)} }>
          <NavLink
              to={props.link}
              exact={props.exact}
              >{props.children}</NavLink>
        </div>
    </li>
);

const mapStateToProps = state => {
    return {
        check: state.check.check
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetCheck: (available) => dispatch({type: actionTypes.SET_CHECK, available})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(navigationItem);
