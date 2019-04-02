import React from 'react';

import './Benefits.css';
import Benefit from './Benefit/Benefit.js';

const Benefits = ( props ) => {
      let benefits = null

      if (props.benefits) {
        benefits = <div className="wrapper">
           {props.benefitNames.map(element => {
             const record = props.benefits.filter(el => el.name === element)
             return   <Benefit key={element}
                            name = {element}
                            bnft = {record[0]}
                            remove={props.onRemoveBenefit}
                            setBenefit={props.onSetBenefit}
                            />
           }
         )}
        </div>
      }

      return benefits
}

export default Benefits;
