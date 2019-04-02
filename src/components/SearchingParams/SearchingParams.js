import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../shared/check-axios';
import * as actionTypes from '../../store/actions/actionTypes';
import { checkValidity, regions } from '../../shared/utility';

import Input from '../UI/Input/Input'
import Button from '..//UI/Button/Button'
import Spinner from '../UI/Spinner/Spinner'
import Modal from '../UI/Modal/Modal'

import './SearchingParams.css';

class SearchingParams extends Component {

  constructor(props) {
     super(props);
     this.state = {
         form: {
           checkType: {
               label: 'Вид проверки',
               elementType: 'select',
               elementConfig: {
                   options: [
                       {value: '1', displayValue: 'Выездная'},
                       {value: '2', displayValue: 'Камеральная'}
                   ]
               },
               value: '1',
               validation: {},
               valid: true
           },
           regNum: {
                 elementType: 'input',
                 label: 'Рег. номер',
                 elementConfig: {
                     type: 'number'
                 },
                 value: '',
                 validation: {
                     maxLength: 10
                 },
                 valid: true,
                 touched: false
             },
           start: {
               elementType: 'input',
               label: 'Начало проверки С *',
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
           end: {
               elementType: 'input',
               label: 'Начало проверки ПО *',
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
           specialists: {
                 elementType: 'input',
                 label: 'Специалисты',
                 elementConfig: {
                     type: 'text'
                 },
                 value: '',
                 validation: {},
                 valid: true,
                 touched: false
           },
           inn: {
                   elementType: 'input',
                   label: 'ИНН',
                   elementConfig: {
                       type: 'number'
                   },
                   value: '',
                   validation: {
                       maxLength: 12
                   },
                   valid: true,
                   touched: false
             },
             name: {
                   elementType: 'input',
                   label: 'Наименование',
                   elementConfig: {
                       type: 'text'
                   },
                   value: '',
                   validation: {},
                   valid: true,
                   touched: false
             },
             region: {
                 elementType: 'select',
                 label: 'Район',
                 elementConfig: {
                     options: [{value: '', displayValue: ''}, ...regions]
                 },
                 value: '',
                 validation: {},
                 valid: true
             },
         },
         formIsValid: false
     }

 }

 componentDidMount() {
     let updatedcheckForm = {
         ...this.state.form
     };
     if (this.props.params) {
       for (let inputIdentifier in updatedcheckForm) {
           updatedcheckForm[inputIdentifier].value = this.props.params[inputIdentifier] || ''
           updatedcheckForm[inputIdentifier].valid = true
       }
       this.setState({form: updatedcheckForm, formIsValid: true})
     }
     if (this.props.serviceName === 'Сформировать отчет') {
       this.props.onSearchingSuccess(null);
     }
 }

 inputChangedHandler = (event, inputIdentifier) => {
     const updatedcheckForm = {
         ...this.state.form
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
     this.setState({form: updatedcheckForm, formIsValid: formIsValid});
 }

 findHandler = (event) => {
   event.preventDefault();
   const formData = { ...this.state.form };
   const params = {}
   for (let inputIdentifier in formData) {
       params[inputIdentifier] = formData[inputIdentifier].value
   }
   this.props.onSearchingInit(params)
   let data = new FormData()
   for (let formElementIdentifier in formData) {
       data.append(formElementIdentifier, formData[formElementIdentifier].value);
   }
   this.props.onOperationStart()
   let suffix = 'checks'
   if (this.props.serviceName === 'Сформировать отчет') {
      suffix = 'report'
      data.append('report', this.props.reportName);
   }
   axios.post(`api/get_${suffix}.php?XDEBUG_SESSION_START=netbeans-xdebug`, data)
           .then((response)=>{
              if (response.data.error === '') {
                this.props.onSearchingSuccess(response.data.checks);
              } else {
                throw new Error(response.data.error)
              }
           }).catch((error)=> {
              this.props.onOperationFail('Ошибка поиска данных' + error.message);
           });
 }

 render () {
   const formElementsArray = [];
   for (let key in this.state.form) {
       formElementsArray.push({
           id: key,
           config: this.state.form[key]
       });
   }
   let form = (
       <form onSubmit={this.findHandler}>
          <div className="find-data">
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
           <Button btnType="Success" disabled={!this.state.formIsValid}>{this.props.serviceName}</Button>
       </form>
   );
   if ( this.props.loading ) {
       form = <Spinner />;
   }
   return (
       <div>
           <Modal show={this.props.error}
                  modalClosed={()=>this.props.onOperationFail('')}>
                  { this.props.error }
           </Modal>
           {form}
       </div>
   );
 }

}

let mapStateToProps = state => {
    return {
        error: state.searching.error,
        loading: state.searching.loading,
        items: state.searching.items,
        params: state.searching.params,
        reportName: state.searching.reportName
    };
}

let mapDispatchToProps = dispatch => {
    return {
        onOperationStart: () => dispatch({type: actionTypes.SEARCHING_START}),
        onOperationFail: () => dispatch({type: actionTypes.SEARCHING_FAIL}),
        onSearchingSuccess: (items) => dispatch({type: actionTypes.SEARCHING_SUCCESS, items: items}),
        onSearchingInit: (params) => dispatch({type: actionTypes.SEARCHING_INIT, params: params})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchingParams);
