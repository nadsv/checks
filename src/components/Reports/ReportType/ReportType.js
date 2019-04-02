import React, { Component } from 'react'
import { connect } from 'react-redux'

import './ReportType.css';
import Input from '../../UI/Input/Input'
import { reportTypes } from '../../../shared/utility';
import * as actionTypes from '../../../store/actions/actionTypes';

class ReportType extends Component {
    constructor(props) {
      super(props);
      this.state = {
        type: {
            elementType: 'select',
            label: 'Вид отчета',
            elementConfig: {
                options: reportTypes
            },
            value: '1',
            validation: {},
            valid: true
        }
      }
    }

    inputChangedHandler = (event) => {
      const updatedType = {
          ...this.state.type,
          value: event.target.value
      }
      this.setState({type: updatedType})
      this.props.onSetReportName(event.target.value)
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
        </div>)
    }
};

const mapStateToProps = state => {
    return {
        reportName: state.searching.reportName
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetReportName: (name) => dispatch({type: actionTypes.SET_REPORT_NAME, name: name})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportType);
