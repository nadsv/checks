import React, { Component } from 'react'
import { connect } from 'react-redux'

import { checkValidity } from '../../../../shared/utility';

import Input from '../../../UI/Input/Input'

import './ExtraCosts.css'

class ExtraCosts extends Component {

  constructor(props) {
     super(props);
     this.state = {
         checkForm: {
           ndfl: {
               elementType: 'input',
               label: 'НДФЛ',
               elementConfig: {
                   type: 'number',
                   min: '0'
               },
               value: '',
               validation: {},
               valid: true,
               touched: false,
               small: '1'
           },
           post: {
               elementType: 'input',
               label: 'Почтовый сбор',
               elementConfig: {
                   type: 'number',
                   min: '0'
               },
               value: '',
               validation: {},
               valid: true,
               touched: false,
               small: '1'
           },
           nds: {
               elementType: 'input',
               label: 'НДС',
               elementConfig: {
                   type: 'number',
                   min: '0'
               },
               value: '',
               validation: {},
               valid: true,
               touched: false,
               small: '1'
           }
         },
         formIsValid: false
     }

   }

   componentDidMount() {
       let updatedcheckForm = {
           ...this.state.checkForm
       };
       if (this.props.check) {
         for (let inputIdentifier in updatedcheckForm) {
             updatedcheckForm[inputIdentifier].value = this.props.check[inputIdentifier] || ''
             updatedcheckForm[inputIdentifier].valid = true
         }
         this.setState({checkForm: updatedcheckForm, formIsValid: false})
       }
   }

   inputChangedHandler = (event, inputIdentifier) => {
       const updatedcheckForm = {
           ...this.state.checkForm
       };
       const updatedFormElement = {
           ...updatedcheckForm[inputIdentifier]
       };
       updatedFormElement.value = event.target.value;
       updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
       updatedFormElement.touched = true;
       updatedcheckForm[inputIdentifier] = updatedFormElement;

       let formIsValid = true;
       for (let inputIdentifier in updatedcheckForm) {
           formIsValid = updatedcheckForm[inputIdentifier].valid && formIsValid
       }
       this.setState({checkForm: updatedcheckForm, formIsValid: formIsValid});
   }

   inputBlurHandler = (event, inputIdentifier) => {
     let extraCost = {
       [inputIdentifier]: event.target.value
     }
     this.props.AddExtraCost(extraCost)
   }

   render () {
       const formElementsArray = [];
       for (let key in this.state.checkForm) {
           formElementsArray.push({
               id: key,
               config: this.state.checkForm[key]
           });
       }
       let form = (
           <form onSubmit={this.checkHandler}>
              <h2 className = "costs-name">Дополнительные расходы</h2>
              <div className = "data">
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
                          blur={(event) => this.inputBlurHandler(event, formElement.id)}/>

                    return (formElement.config.small === '1') ? <div className='small-block' key={formElement.id}>{elem}</div> : elem
                  }
                )}
              </div>
           </form>
       );
       return (
           <div className = 'costs-form'>
               {form}
           </div>
       );
   }

}


const mapStateToProps = state => {
    return {
        check: state.check.check
    };
}

export default connect(mapStateToProps, null)(ExtraCosts);
