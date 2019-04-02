import React, { Component } from 'react'

import './Benefit.css';
import Input from '../../../../UI/Input/Input'
import { checkValidity } from '../../../../../shared/utility';

class Benefit extends Component {
    constructor(props) {
      super(props);
      const bnft = this.props.bnft;
      this.state = {
          benefitForm: {
                needSum: {
                      elementType: 'input',
                      label: 'Начислено',
                      elementConfig: {
                          type: 'number',
                          min: '0.01'
                      },
                      value: (+bnft.needSum) ? +bnft.needSum : '',
                      validation: {
                        required: true
                      },
                      valid: false,
                      touched: false,
                      small: '1'
                  },
                  volSum: {
                      elementType: 'input',
                      label: 'Уплачено добровольно',
                      elementConfig: {
                            type: 'number',
                            min: '0.01'
                      },
                      value: (+bnft.volSum) ? bnft.volSum : '',
                      validation: {},
                      valid: true,
                      touched: false,
                      small: '1'
                    },
                 suitSum: {
                      elementType: 'input',
                      label: 'Уплачено по иску',
                      elementConfig: {
                            type: 'number',
                            min: '0.01'
                      },
                      value: (+bnft.suitSum) ? bnft.suitSum : '',
                      validation: {},
                      valid: true,
                      touched: false,
                      small: '1'
                    }
          },
          formIsValid: false
      }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedBenefitForm = {
            ...this.state.benefitForm
        };
        const updatedFormElement = {
                      ...updatedBenefitForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedBenefitForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedBenefitForm) {
            formIsValid = updatedBenefitForm[inputIdentifier].valid && formIsValid
        }
        this.setState({benefitForm: updatedBenefitForm, formIsValid: formIsValid});
    }

    inputBlurHandler = () => {
      const data = {
                    name: this.props.name,
                    needSum: this.state.benefitForm.needSum.value,
                    volSum: this.state.benefitForm.volSum.value,
                    suitSum: this.state.benefitForm.suitSum.value
                  }
      this.props.setBenefit(data)
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.benefitForm) {
            formElementsArray.push({
                id: key,
                config: this.state.benefitForm[key]
            });
        }
        let form = (
            <form className = 'benefit-form' onSubmit={this.checkHandler}>
               <h2 className="benefit-name">
                { this.props.name }
                <div className="delete" onClick = { () => this.props.remove(this.props.name) } ></div>
              </h2>
               <div className="data">
                  {formElementsArray.map(formElement => {
                     const elem =   <Input
                           key={formElement.id}
                           elementType={formElement.config.elementType}
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value}
                           invalid={!formElement.config.valid}
                           shouldValidate={formElement.config.validation}
                           touched={formElement.config.touched}
                           label={formElement.config.label}
                           changed={(event) => this.inputChangedHandler(event, formElement.id)}
                           blur={(event) => this.inputBlurHandler()}/>

                     return (formElement.config.small === '1') ? <div className='small-block' key={formElement.id}>{elem}</div> : elem
                   }
                 )}
                  </div>
            </form>
        );
        return (
            <div >
                {form}
            </div>
        );
    }
};

export default Benefit;
