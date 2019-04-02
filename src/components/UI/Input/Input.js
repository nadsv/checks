import React from 'react';

import './Input.css';

const input = ( props ) => {
    let inputElement = null;
    let inputClasses = "InputElement";

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses = inputClasses +'  Invalid ';
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                value={(props.elementType==="file") ? '' : props.value}
                onChange={props.changed}
                onBlur={props.blur}/>;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                ref={props.elemRef}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses}
                    value={props.value}
                    ref={props.elemRef}
                    onChange={props.changed}>
                    {props.elementConfig.options.map( (option, index) => (
                        <option key={index} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                ref={props.elemRef}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;
