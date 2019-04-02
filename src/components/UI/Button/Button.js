import React from 'react';

import './Button.css';

const button = (props) => {
  const classes = 'Button ' + props.btnType + ' ' +props.size
  return (
    <button
        disabled={props.disabled}
        type = {props.type}
        className={classes}
        onClick={props.clicked}>{props.children}</button>
      )
};

export default button;
