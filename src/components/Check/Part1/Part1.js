import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../../shared/check-axios';
import * as actionTypes from '../../../store/actions/actionTypes';
import { checkValidity, regions, decodeHtml, PASSWORD, formatDate } from '../../../shared/utility';

import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import Spinner from '../../UI/Spinner/Spinner'
import Modal from '../../UI/Modal/Modal'
import PasswordModal from '../../UI/PasswordModal/PasswordModal'

import './Part1.css';


class Part1 extends Component {
    constructor(props) {
       super(props);

       this.state = {
           checkForm: {
             checkType: {
                 elementType: 'select',
                 elementConfig: {
                     options: [
                         {value: '1', displayValue: 'Выездная'},
                         {value: '2', displayValue: 'Камеральная'}
                     ]
                 },
                 value: 1,
                 validation: {},
                 valid: true,
                 small: '1'
             },
             unschaduled: {
                 elementType: 'select',
                 elementConfig: {
                     options: [
                         {value: '1', displayValue: 'Плановая'},
                         {value: '2', displayValue: 'Внеплановая'}
                     ]
                 },
                 value: '1',
                 validation: {},
                 valid: true,
                 small: '1'
             },
             state: {
                 elementType: 'select',
                 elementConfig: {
                     options: [
                         {value: '1', displayValue: 'В исполнении'},
                         {value: '2', displayValue: 'Проведена'}
                     ]
                 },
                 value: '1',
                 validation: {},
                 valid: true,
                 small: '1'
             },
             checkStart: {
                 elementType: 'input',
                 label: 'Период проведения С',
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
             checkEnd: {
                 elementType: 'input',
                 label: 'Период проведения ПО',
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
             periodStart: {
                 elementType: 'input',
                 label: 'Проверяемый период С',
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
             periodEnd: {
                 elementType: 'input',
                 label: 'Проверяемый период ПО',
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
             regNum: {
                   elementType: 'input',
                   label: 'Рег. номер',
                   elementConfig: {
                       type: 'text'
                   },
                   value: '',
                   validation: {
                       required: true,
                       minLength: 10,
                       maxLength: 10,
                       isNumeric: true
                   },
                   valid: false,
                   touched: false
               },
               inn: {
                     elementType: 'input',
                     label: 'ИНН',
                     elementConfig: {
                         type: 'text'
                     },
                     value: '',
                     validation: {
                         required: true,
                         minLength: 10,
                         maxLength: 12,
                         isNumeric: true
                     },
                     valid: false,
                     touched: false
               },
               name: {
                   elementType: 'textarea',
                   label: 'Наименование страхователя',
                   elementConfig: {
                       rows: '3'
                   },
                   value: '',
                   validation: {
                       required: true,
                       minLength: 5
                   },
                   valid: false,
                   touched: false
               },
               address: {
                   elementType: 'textarea',
                   label: 'Адрес страхователя',
                   elementConfig: {
                       rows: '3'
                   },
                   value: '',
                   validation: {
                       required: true,
                       minLength: 5
                   },
                   valid: false,
                   touched: false
               },
               region: {
                   elementType: 'select',
                   label: 'Район',
                   elementConfig: {
                       options: regions
                   },
                   value: 'Курск',
                   validation: {},
                   valid: true
               },
               chief: {
                   elementType: 'input',
                   label: 'ФИО руководителя',
                   elementConfig: {
                       type: 'text'
                   },
                   value: '',
                   validation: {
                       required: true,
                       minLength: 5
                   },
                   valid: false,
                   touched: false
               },
               employeesNumber: {
                     elementType: 'input',
                     label: 'Численность работающих',
                     elementConfig: {
                         type: 'number',
                         min: 0
                     },
                     value: '0',
                     validation: {
                         required: true,
                         minLength: 1,
                         isNumeric: true
                     },
                     valid: false,
                     touched: false
                 },
                 expenses1: {
                       elementType: 'input',
                       label: 'Расходы 1 года',
                       elementConfig: {
                           type: 'number',
                           min: 0
                       },
                       value: '',
                       validation: {},
                       valid: true,
                       touched: false
                   },
                   expenses2: {
                         elementType: 'input',
                         label: 'Расходы 2 года',
                         elementConfig: {
                             type: 'number',
                             min: 0
                         },
                         value: '',
                         validation: {},
                         valid: true,
                         touched: false
                     },
                     expenses3: {
                           elementType: 'input',
                           label: 'Расходы 3 года',
                           elementConfig: {
                               type: 'number',
                               min: 0
                           },
                           value: '',
                           validation: {},
                           valid: true,
                           touched: false
                     },
                     note: {
                         elementType: 'textarea',
                         label: 'Примечание',
                         elementConfig: {
                             rows: '2'
                         },
                         value: '',
                         validation: {},
                         valid: true,
                         touched: false
                     },
                     specialists: {
                         elementType: 'textarea',
                         label: 'Специалисты',
                         elementConfig: {
                             rows: '2'
                         },
                         validation: {
                             required: true,
                             minLength: 5
                         },
                         value: '',
                         valid: false,
                         touched: false
                     }
           },
           formIsValid: false,
           passwordFormShow: false
       }

   }

   componentDidMount() {
       let updatedcheckForm = {
           ...this.state.checkForm
       };
       if (this.props.check) {
         for (let inputIdentifier in updatedcheckForm) {
             updatedcheckForm[inputIdentifier].value = decodeHtml(this.props.check[inputIdentifier]) || ''
             updatedcheckForm[inputIdentifier].valid = true
         }
         this.setState({checkForm: updatedcheckForm, formIsValid: true})
       }
   }

   UNSAFE_componentWillUpdate(props, state){
     if (props.check === null && !props.available) {
       this.setState((state, props) => {
             this.props.onSetCheck(true)
             let updatedcheckForm = {...state.checkForm}

             for (let inputIdentifier in updatedcheckForm) {
                 updatedcheckForm[inputIdentifier].valid = (updatedcheckForm[inputIdentifier].elementType === 'select') ? true : false
                 updatedcheckForm[inputIdentifier].touched = false
                 updatedcheckForm[inputIdentifier].value = (updatedcheckForm[inputIdentifier].elementType === 'select') ? '1' : ''
                 updatedcheckForm[inputIdentifier].value = (inputIdentifier === 'region') ? 'Курск' : updatedcheckForm[inputIdentifier].value
             }
            return {
                formIsValid: false,
                checkForm: updatedcheckForm
              }
            })
     }
   }

    checkHandler = ( event ) => {
        event.preventDefault();
        const formData = { id: (this.props.check) ? this.props.check.id : 0};
        for (let formElementIdentifier in this.state.checkForm) {
            formData[formElementIdentifier] = this.state.checkForm[formElementIdentifier].value;
        }
        this.props.onOperationStart()
        const data = new FormData()
        data.append('data', JSON.stringify(formData));
        axios.post('api/save_part1.php', data)
                .then((response)=>{
                   if (response.data.error === '') {
                     const checkData = {
                                        ...formData,
                                         id: response.data.id || this.props.check.id
                                       }
                     this.props.onCheckSaveSuccess(checkData)

                     const searchItem = {
                       id: formData.id,
                       name: formData.name,
                       regNum: formData.regNum,
                       region: formData.region,
                       specialists: formData.specialists,
                       checkStart: formatDate(formData.checkStart),
                       checkEnd: formatDate(formData.checkEnd),
                       periodStart: formatDate(formData.periodStart),
                       periodEnd: formatDate(formData.periodEnd),
                       unschaduled: formData.unschaduled
                     }
                     this.props.onSearchingUpdateItem( searchItem );
                   } else {
                     throw new Error(response.data.error)
                   }
                }).catch((error)=> {
                   this.props.onOperationFail('Ошибка сохранения записи ' + error.message);
                })
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
      if (inputIdentifier === 'regNum') {
      axios.get('api/ins_info.php?rn=' + event.target.value+'')
              .then((response)=>{
                let updatedCheckForm = {
                    ...this.state.checkForm
                };
                updatedCheckForm.name.value = response.data.name
                updatedCheckForm.name.valid = checkValidity(updatedCheckForm.name.value, updatedCheckForm.name.validation)
                updatedCheckForm.inn.value = response.data.inn
                updatedCheckForm.inn.valid = checkValidity(updatedCheckForm.inn.value, updatedCheckForm.inn.validation)
                updatedCheckForm.chief.value = response.data.chief
                updatedCheckForm.chief.valid = checkValidity(updatedCheckForm.chief.value, updatedCheckForm.chief.validation)
                updatedCheckForm.address.value = response.data.address
                updatedCheckForm.address.valid = checkValidity(updatedCheckForm.address.value, updatedCheckForm.address.validation)
                updatedCheckForm.region.value = response.data.region
                updatedCheckForm.region.valid = checkValidity(updatedCheckForm.region.value, updatedCheckForm.region.validation)
                updatedCheckForm.employeesNumber.value = response.data.employees_number
                updatedCheckForm.employeesNumber.valid = checkValidity(updatedCheckForm.employeesNumber.value, updatedCheckForm.employeesNumber.validation)
                updatedCheckForm.expenses1.value = response.data.expenses1
                updatedCheckForm.expenses1.valid = checkValidity(updatedCheckForm.expenses1.value, updatedCheckForm.expenses1.validation)
                updatedCheckForm.expenses2.value = response.data.expenses2
                updatedCheckForm.expenses2.valid = checkValidity(updatedCheckForm.expenses2.value, updatedCheckForm.expenses2.validation)
                updatedCheckForm.expenses3.value = response.data.expenses3
                updatedCheckForm.expenses3.valid = checkValidity(updatedCheckForm.expenses3.value, updatedCheckForm.expenses3.validation)
                updatedCheckForm.note.valid = true
                let formIsValid = true;
                for (let inputIdentifier in updatedCheckForm) {
                    formIsValid = updatedCheckForm[inputIdentifier].valid && formIsValid;
                }
                this.setState({checkForm: updatedCheckForm, formIsValid: formIsValid});
              }).catch((error)=> {
                 console.log(error)
              });
      }
    }

    deleteHandler = (event) => {
      event.preventDefault()
      this.setState({
        passwordFormShow: true
      })

    }

    onDelete = (pwd)=> {
      const id = (this.props.check) ? this.props.check.id : 0;

      if (pwd === PASSWORD) {
          this.setState({
            passwordFormShow: false
          })

          setTimeout(()=>{
              const data = new FormData()
              data.append('id', id);

              axios.post('api/delete_check.php', data)
                      .then((response)=>{
                         if (response.data.error === '') {
                           this.props.onSearchingRemoveItem(this.props.check.id);
                           this.props.history.push('/')
                         } else {
                           throw new Error(response.data.error)
                         }
                      }).catch((error)=> {
                         this.props.onOperationFail('Ошибка удаления записи ' + error.message);
                      });
          }, 500)


       }

    }

    onClosePasswordForm = (value) => {
      this.setState({
        passwordFormShow: value
      })
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
                           blur={(event) => this.inputBlurHandler(event, formElement.id)}/>

                     return (formElement.config.small === '1') ? <div className='small-block' key={formElement.id}>{elem}</div> : elem
                   }
                 )}
                  </div>
                <Button btnType="Success" disabled={!this.state.formIsValid}>Сохранить</Button>
                <Button btnType="Success" disabled={!this.props.check} clicked={(event)=>this.deleteHandler(event)}>Удалить</Button>
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
                <PasswordModal show={this.state.passwordFormShow}
                               confirmHandler = {(pwd)=>this.onDelete(pwd)}
                               cancelHandler = {(value)=>this.onClosePasswordForm(value)}
                />
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
        path: state.check.path,
        available: state.check.available
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOperationStart: () => dispatch({type: actionTypes.OPERATION_START}),
        onOperationFail: (message) => dispatch({type: actionTypes.OPERATION_FAIL, message}),
        onCheckSaveSuccess: (checkData) => dispatch({type: actionTypes.SAVE_CHECK_SUCCESS, checkData}),
        onCheckDeleteSuccess: () => dispatch({type: actionTypes.DELETE_CHECK_SUCCESS}),
        onSetCheck: (available) => dispatch({type: actionTypes.SET_CHECK, available}),
        onSearchingUpdateItem: (docData) => dispatch({type: actionTypes.SEARCHING_UPDATE_ITEM, docData: docData}),
        onSearchingRemoveItem: (id) => dispatch({type: actionTypes.SEARCHING_REMOVE_ITEM, id: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Part1);
