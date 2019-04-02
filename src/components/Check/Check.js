import React from 'react';
import { Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import Part1 from './Part1/Part1'
import Part2 from './Part2/Part2'
import Part3 from './Part3/Part3'
import Part4 from './Part4/Part4'

import './Check.css';

const check = ( props ) => (
    <div>
      <ul className="parts">
          <li className="part"><NavLink to={ props.match.url + '/part1' } activeClassName="active">Часть I</NavLink></li>
          {props.show &&  <li className="part"><NavLink to={ props.match.url + '/part2' } activeClassName="active">Часть II</NavLink></li> }
          {props.show && <li className="part"><NavLink to={ props.match.url + '/part3' } activeClassName="active">Часть III</NavLink></li> }
          {props.show &&   <li className="part"><NavLink to={ props.match.url + '/part4' } activeClassName="active">Часть IV</NavLink></li> }
      </ul>

      <Route path={ props.match.url + '/part1' } component={Part1}/>
      {props.show && <Route path={ props.match.url + '/part2' } component={Part2}/>}
      {props.show &&  <Route path={ props.match.url + '/part3' } component={Part3}/>}
      {props.show && <Route path={ props.match.url + '/part4' } component={Part4}/>}
    </div>
);

const mapStateToProps = state => {
    return {
        show : (state.check.check) ? true : false
    };
}

export default connect( mapStateToProps, null )( check );
