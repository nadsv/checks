import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../../shared/check-axios';
import * as actionTypes from '../../../store/actions/actionTypes';

import Button from '../../UI/Button/Button'
import Modal from '../../UI/Modal/Modal'
import Spinner from '../../UI/Spinner/Spinner'
import Inserting from './Inserting/Inserting'
import ExtraCosts from './ExtraCosts/ExtraCosts'
import Benefits from './Benefits/Benefits'


import './Part4.css';

class Part4 extends Component {
    constructor(props) {
      super(props)
      this.state = {
        benefit: '',
        benefitNames: [],
        forms: new Map(),
        showModal: false
      }
      this.extraCosts = {}
    }


    componentDidMount() {
        if (this.props.check && this.props.check.benefits) {
          let newBenefits = [];
          this.props.check.benefits.forEach( (value, key, map) => {
              newBenefits.push(key)
          })
          this.setState({forms: this.props.check.benefits, benefitNames: newBenefits})
          this.extraCosts = {
            ndfl: this.props.check.ndfl,
            post: this.props.check.post,
            nds: this.props.check.nds
          }
        }
    }

    addBenefit(value) {
      let add = true
      const benefits = [...this.state.forms.keys()]
      benefits.forEach((element) => {
        if (element === value) {
          add = false
        }
      });
      if ( add ) {
          this.setState((prevState, props) => {
             prevState.forms.set(value,  {name: value, needSum: '0', volSum: '0', suitSum: '0'})
             return {
                 forms: prevState.forms,
                 benefit: value,
                 benefitNames: [value, ...this.state.benefitNames]
             }
          })
      }
    }

    setBenefit(data) {
       this.setState((prevState, props) => {
            prevState.forms.delete(data.name)
            prevState.forms.set(data.name, data)
            return {
                forms: prevState.forms
            }
        })
    }

    removeBenefit(type) {
        this.setState((prevState, props) => {
             prevState.forms.delete(type)
             if (![...this.state.benefitNames].length) {
               this.extraCosts = {}
             }
             return {
                 benefitNames: [...this.state.benefitNames].filter((elem) => elem !== type),
                 forms: prevState.forms
             }
           })
    }

    isValidForm = ( formMap ) => {
      let valid = true
      if (!formMap.size) return false
      formMap.forEach( (value, key, map) => {
          valid = valid && ( +value.needSum > 0 ) ? true : false
      })

      return valid
    }

    findSums = ( formMap ) => {
      let sums = {
        redressDecisionSum: 0,
        paymentSum: 0,
        judgmentPaymentSum: 0
      }
      formMap.forEach( (value, key, map) => {
          sums.redressDecisionSum =   (sums.redressDecisionSum * 100 + value.needSum *100) / 100
          sums.paymentSum =   (sums.paymentSum * 100 + value.volSum * 100) / 100
          sums.judgmentPaymentSum =   (sums.judgmentPaymentSum * 100 + value.suitSum * 100) / 100
      })

      return sums

    }

    onAddExtraCost = (extraCost) => {
      this.extraCosts = {
        ...this.extraCosts,
        ...extraCost
      }
    }

    savePart4 = () => {
      let valid = this.isValidForm(this.state.forms)
      const sums = this.findSums(this.state.forms)

      if (valid) {
        this.setState( { loading: true } )
        const data = new FormData()
        data.append('id', this.props.check.id)
        let i = 0;
        this.state.forms.forEach( (value, key, map) => {
              data.append(`form${i}`, JSON.stringify(value))
              i++
        })
        data.append('ndfl', this.extraCosts.ndfl)
        data.append('post', this.extraCosts.post)
        data.append('nds', this.extraCosts.nds)
        this.props.onOperationStart()
        axios.post('api/save_part4.php', data)
                .then((response)=>{
                   if (response.data.error === '') {
                     const checkData = {
                                        ...this.props.check,
                                        ...sums,
                                        ...this.extraCosts,
                                        benefits: this.state.forms
                                       }
                     this.props.onCheckSaveSuccess(checkData);
                  } else {
                      throw new Error(response.data.error)
                  }
                }).catch((error)=> {
                   this.props.onOperationFail('Ошибка сохранения записи ' + error.message);
                });
      } else {
        this.props.onOperationFail('Добавьте виды пособий и заполните все поля начислений.');
      }
    }


    render() {
        let form = (<React.Fragment>
                      <Modal show={this.props.error}
                           modalClosed={()=>this.props.onOperationFail('')}>
                           { this.props.error }
                      </Modal>
                        <Inserting onSetBenefit = { (value) => this.addBenefit(value) } />
                        <Benefits benefits = {[...this.state.forms.values()]}
                                  benefitNames = {this.state.benefitNames}
                                  onSetBenefit = {(value)=>this.setBenefit(value)}
                                  onRemoveBenefit = { (value) => this.removeBenefit(value) }
                        />
                        <ExtraCosts AddExtraCost = {(value)=>this.onAddExtraCost(value)} />
                      <Button btnType="Success" clicked={ this.savePart4 }>Сохранить</Button>
                  </React.Fragment>)
      if ( this.props.loading ) {
          form = <Spinner />;
      }
      return (<div>{form}</div>)
    }


};

const mapStateToProps = state => {
    return {
        error: state.check.error,
        loading: state.check.loading,
        check: state.check.check
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOperationStart: () => dispatch({type: actionTypes.OPERATION_START}),
        onOperationFail: (message) => dispatch({type: actionTypes.OPERATION_FAIL, message}),
        onCheckSaveSuccess: (checkData) => dispatch({type: actionTypes.SAVE_CHECK_SUCCESS, checkData})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Part4);
