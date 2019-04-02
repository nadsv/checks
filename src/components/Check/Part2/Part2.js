import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../../shared/check-axios';
import * as actionTypes from '../../../store/actions/actionTypes';
import { checkValidity } from '../../../shared/utility';

import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import Spinner from '../../UI/Spinner/Spinner'
import Modal from '../../UI/Modal/Modal'

import './Part2.css';

class Part2 extends Component {
    constructor(props) {
       super(props);
       this.state = {
           checkForm: {

             decisionDate: {
                 elementType: 'input',
                 label: 'Решение о проведении проверки. Дата*',
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
             decisionNum: {
                 elementType: 'input',
                 label: 'Решение о проведении проверки. Номер*',
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
             claimDate: {
                 elementType: 'input',
                 label: 'Требование о предоставлении документов. Дата',
                 elementConfig: {
                     type: 'date'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             claimNum: {
                 elementType: 'input',
                 label: 'Требование о предоставлении документов. Номер',
                 elementConfig: {
                     type: 'text'
                 },
                 value: '',
                 validation: {
                   maxLength: 255
                 },
                 valid: true,
                 touched: false
             },
             inquiryDate: {
                 elementType: 'input',
                 label: 'Справка о проведенной проверке. Дата',
                 elementConfig: {
                     type: 'date'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             inquiryNum: {
                 elementType: 'input',
                 label: 'Справка о проведенной проверке. Номер',
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
             actDate: {
                 elementType: 'input',
                 label: 'Акт. Дата',
                 elementConfig: {
                     type: 'date'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             actNum: {
                 elementType: 'input',
                 label: 'Акт. Номер',
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
             signingDate: {
                 elementType: 'input',
                 label: 'Подписание (получение) акта. Дата',
                 elementConfig: {
                     type: 'date'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             considerationDate: {
                 elementType: 'input',
                 label: 'Рассмотрение материалов проверки. Дата',
                 elementConfig: {
                     type: 'date'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
           },
           redressDecisionDate: {
               elementType: 'input',
               label: 'Решение о возмещении. Дата',
               elementConfig: {
                   type: 'date'
               },
               value: '',
               validation: {},
               valid: true,
               touched: false
           },
           redressDecisionNum: {
               elementType: 'input',
               label: 'Решение о возмещении. Номер',
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
            redressDecisionSum: {
                elementType: 'input',
                label: 'Решение о возмещении. Сумма',
                elementConfig: {
                    type: 'number',
                    readOnly: 'readOnly'
                },
                value: '',
                validation: {},
                valid: true,
                touched: false
             },
             redressDecisionDeliveryDate: {
                 elementType: 'input',
                 label: 'Вручение решения о возмещении. Дата',
                 elementConfig: {
                     type: 'date'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             redressDecisionStartDate: {
                 elementType: 'input',
                 label: 'Вступление в силу решения о возмещении. Дата',
                 elementConfig: {
                     type: 'date'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             redressClaimDate: {
                 elementType: 'input',
                 label: 'Требование о возмещении. Дата',
                 elementConfig: {
                     type: 'date'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             redressClaimNum: {
                 elementType: 'input',
                 label: 'Требование о возмещении. Номер',
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
             redressClaimSum: {
                 elementType: 'input',
                 label: 'Требование о возмещении. Сумма',
                 elementConfig: {
                     type: 'number'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             redressClaimEndDate: {
                 elementType: 'input',
                 label: 'Срок исполнения требования о возмещении. Дата',
                 elementConfig: {
                     type: 'date'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             paymentDate: {
                 elementType: 'input',
                 label: 'Возмещены расходы. Пл. поручение. Дата',
                 elementConfig: {
                     type: 'date'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
             },
             paymentNum: {
                 elementType: 'input',
                 label: 'Возмещены расходы. Пл. поручение. Номер',
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
             paymentSum: {
                 elementType: 'input',
                 label: 'Возмещены расходы. Пл. поручение. Сумма',
                 elementConfig: {
                     type: 'number',
                     readOnly: 'readonly'
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
        for (let formElementIdentifier in this.state.checkForm) {
            formData[formElementIdentifier] = this.state.checkForm[formElementIdentifier].value;
        }
        this.props.onOperationStart()
        const data = new FormData()
        data.append('data', JSON.stringify(formData));
        axios.post('api/save_part2.php', data)
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
                   this.props.onOperationFail('Ошибка сохранения записи' + error.message);
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

export default connect(mapStateToProps, mapDispatchToProps)(Part2);
