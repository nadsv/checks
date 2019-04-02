import React, { Component } from 'react'

import './Inserting.css';
import Input from '../../../UI/Input/Input'
import Button from '../../../UI/Button/Button'
import { types } from '../../../../shared/utility';

class Inserting extends Component {
    constructor(props) {
      super(props);
      this.state = {
        type: {
            elementType: 'select',
            label: 'Вид пособия',
            elementConfig: {
                options: types
            },
            value: 'Пособие по временной нетрудоспособности (банк)',
            validation: {},
            valid: true
        }
      }
    }

    inputChangedHandler = (event) => {
      const updatedType = {
          ...this.state.type,
          value: event.target.value
      };
      this.setState({type: updatedType});
    }

    onAdd() {
      this.props.onSetBenefit(this.state.type.value)
    }

    render() {
      const id = 'type';
      const config = this.state.type
      return (<div className="inserting">
              <Input
                     key={id}
                     elementType={config.elementType}
                     elementConfig={config.elementConfig}
                     value={config.value}
                     invalid={!config.valid}
                     shouldValidate={config.validation}
                     touched={config.touched}
                     label={config.label}
                     changed={(event) => this.inputChangedHandler(event, id)}
                     />
                <Button btnType="Success" clicked={()=>this.onAdd()}>Добавить</Button>
        </div>)
    }
};

export default Inserting;
