import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    items: null,
    loading: false,
    error: '',
    params: null
};

const reportingSuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        resultsLoading: false,
        error: false,
        items: action.items
    } );
};

const reportingInit = (state, action) => {
  return updateObject( state, {
      loading: false,
      error: false,
      params: action.params
  } );
}

const reportingStart = ( state, action ) => {
    return updateObject( state, { resultsLoading: true } );
};

const reportingFail = ( state, action ) => {
    return updateObject( state, { error: action.message, resultsLoading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.REPORTING_SUCCESS: return reportingSuccess(state, action);
        case actionTypes.REPORTING_START: return reportingStart(state, action);
        case actionTypes.REPORTING_FAIL: return reportingFail(state, action);
        case actionTypes.REPORTING_INIT: return reportingInit(state, action);
        default: return state;
    }
};

export default reducer;
