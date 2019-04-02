import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import './SearchingResults.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../shared/check-axios';
import * as actionTypes from '../../../store/actions/actionTypes';
import { decodeHtml } from '../../../shared/utility';

class SearchingResults extends Component {

  clickHandler(id) {
    this.props.onOperationStart()
    axios.post('api/get_check.php?id=' + id)
            .then((response)=>{
               if (response.data.error === '') {
                 let check = { ...response.data.check }
                 let benefitMap = new Map()
                 check.benefits.forEach(benefit=>benefitMap.set(benefit.name, benefit))
                 check = {...check, benefits: benefitMap}
  
                 this.props.onCheckInitSuccess(check)
                 this.props.history.push('/check/part1')
               } else {
                 throw new Error(response.data.error)
               }
            }).catch((error)=> {
               this.props.onOperationFail('Ошибка поиска данных' + error.message);
            });
  }

  render() {
    let result = this.props.items && <div className="results-wrapper">
        <table className='results'>
          <thead>
            <tr>
              <th className='td__fixed'>Рег. номер</th>
              <th>Название</th>
              <th className='td__fixed'>Начало проверки</th>
              <th className='td__fixed'>Конец проверки</th>
              <th className='td__fixed'>Начало периода</th>
              <th className='td__fixed'>Конец периода</th>
              <th>Район</th>
              <th>Специалисты</th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map(item => <tr key={item.id} onClick={()=>this.clickHandler(item.id)}>
                <td>{item.regNum}</td>
                <td>{decodeHtml(item.name)}</td>
                <td>{item.checkStart}</td>
                <td>{item.checkEnd}</td>
                <td>{item.periodStart}</td>
                <td>{item.periodEnd}</td>
                <td>{decodeHtml(item.region)}</td>
                <td>{decodeHtml(item.specialists)}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    if ( this.props.loading ) {
        result = <Spinner />
    }
    return result
  }
}

const mapStateToProps = state => {
    return {
        check: state.check.check,
        checkLoading: state.check.loading,
        checkError: state.check.error,
        items: state.searching.items,
        loading: state.searching.resultsLoading,
        error: state.searching.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOperationStart: () => dispatch({type: actionTypes.OPERATION_START}),
        onOperationFail: (message) => dispatch({type: actionTypes.OPERATION_FAIL, message}),
        onCheckInitSuccess: (checkData) => dispatch({type: actionTypes.SAVE_CHECK_SUCCESS, checkData})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchingResults));
