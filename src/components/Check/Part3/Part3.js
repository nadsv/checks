import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../../shared/check-axios';
import * as actionTypes from '../../../store/actions/actionTypes';
import { checkValidity } from '../../../shared/utility';

import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import Spinner from '../../UI/Spinner/Spinner'
import Modal from '../../UI/Modal/Modal'

import './Part3.css';

class Part3 extends Component {
    constructor(props) {
       super(props);
       this.state = {
           checkForm: {
             letterForJuristDate: {
                 elementType: 'input',
                 label: 'Письмо в правовой отдел. Дата*',
                 elementConfig: {
                     type: 'date'
                 },
                 value: '',
                 validation: {
                     required: true
                 },
                 valid: false,
                 touched: false
             },
             letterForJuristNum: {
                 elementType: 'input',
                 label: 'Письмо в правовой отдел. Номер*',
                 elementConfig: {
                     type: 'text'
                 },
                 value: '',
                 validation: {
                     required: true,
                     maxLength: 11
                 },
                 valid: false,
                 touched: false
             },
             lawSuitDate: {
                 elementType: 'input',
                 label: 'Исковое заявление. Дата',
                 elementConfig: {
                     type: 'date'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             lawSuitNum: {
                 elementType: 'input',
                 label: 'Исковое заявление. Номер',
                 elementConfig: {
                     type: 'text'
                 },
                 value: '',
                 validation: {
                   maxLength: 11
                 },
                 valid: true,
                 touched: false
             },
             lawSuitSum: {
                 elementType: 'input',
                 label: 'Исковое заявление. Сумма',
                 elementConfig: {
                     type: 'number',
                     min: '0.01'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             judgmentDate: {
                 elementType: 'input',
                 label: 'Определение суда. Дата',
                 elementConfig: {
                     type: 'date'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             judgmentNum: {
                 elementType: 'input',
                 label: 'Определение суда. Номер',
                 elementConfig: {
                     type: 'text'
                 },
                 value: '',
                 validation: {
                   maxLength: 11
                 },
                 valid: true,
                 touched: false
             },
             approvedSum: {
                 elementType: 'input',
                 label: 'Определение суда. Удовлетворено. Сумма',
                 elementConfig: {
                     type: 'number',
                     min: '0'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             deniedSum: {
                 elementType: 'input',
                 label: 'Определение суда. Отказано. Сумма',
                 elementConfig: {
                     type: 'number',
                     min: '0'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             judgmentNote: {
                 elementType: 'input',
                 label: 'Определение суда. Примечание',
                 elementConfig: {
                     type: 'text'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             judgmentPaymentDate: {
                 elementType: 'input',
                 label: 'Принудительное взыскание. Пл. поручение. Дата',
                 elementConfig: {
                     type: 'date'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             judgmentPaymentNum: {
                 elementType: 'input',
                 label: 'Принудительное взыскание. Пл. поручение. Номер',
                 elementConfig: {
                     type: 'text'
                 },
                 value: '',
                 validation: {
                   maxLength: 11
                 },
                 valid: true,
                 touched: false
              },
              judgmentPaymentSum: {
                  elementType: 'input',
                  label: 'Принудительное взыскание. Пл. поручение. Сумма',
                  elementConfig: {
                      type: 'number',
                      readOnly: 'readOnly',
                      min: '0'
                  },
                  value: '',
                  validation: {},
                  valid: true,
                  touched: false
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



    checkHandler = ( event ) => {
        event.preventDefault();
        const formData = { id: this.props.check.id };
      //  const formData = { id: 24 };
        for (let formElementIdentifier in this.state.checkForm) {
            formData[formElementIdentifier] = this.state.checkForm[formElementIdentifier].value;
        }
        this.props.onOperationStart()
        const data = new FormData()
        data.append('data', JSON.stringify(formData));
        axios.post('api/save_part3.php?', data)
                .then((response)=>{
                  if (response.data.error === '') {
                     const checkData = {
                                         ...this.props.check,
                                         ...formData
                                       }
                     this.props.onCheckSaveSuccess(checkData);
                   } else {
                       throw new Error(response.data.error)
                   }
                }).catch((error)=> {
                  this.props.onOperationFail('Ошибка сохранения записи ' + error.message);
                });
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

      render () {
        const formElementsArray = [];
        for (let key in this.state.checkForm) {
            formElementsArray.push({
                id: key,
                config: this.state.checkForm[key]
            });
        }
        let form = (
            <form className = 'check-form' onSubmit={this.checkHandler} noValidate>
               <div className="check-data">
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
                           blur={(event) => {}}/>

                     return (formElement.config.small === '1') ? <div className='small-block' key={formElement.id}>{elem}</div> : elem
                   }
                 )}
                  </div>
                <Button btnType="Success" disabled={!this.state.formIsValid}>Сохранить</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className="check-data">
                <Modal show={this.props.error}
                     modalClosed={()=>this.props.onOperationFail('')}>
                     { this.props.error }
                </Modal>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.check.error,
        loading: state.check.loading,
        check: state.check.check,
        path: state.check.path
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOperationStart: () => dispatch({type: actionTypes.OPERATION_START}),
        onOperationFail: (message) => dispatch({type: actionTypes.OPERATION_FAIL, message}),
        onCheckSaveSuccess: (checkData) => dispatch({type: actionTypes.SAVE_CHECK_SUCCESS, checkData}),
        onCheckDeleteSuccess: () => dispatch({type: actionTypes.DELETE_CHECK_SUCCESS}),
        onSetCheck: (checkData) => dispatch({type: actionTypes.SET_CHECK, checkData})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Part3);
