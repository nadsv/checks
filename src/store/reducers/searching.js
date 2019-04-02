import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    items: null,
    loading: false,
    resultsLoading: false,
    error: '',
    params: null,
    reportName: '1'
};

const findItemsSuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        resultsLoading: false,
        error: false,
        items: action.items
    } );
};

const setReportName = (state, action) => {
  return updateObject( state, {
      reportName: action.name
  } );
}

const searchingInit = (state, action) => {
  return updateObject( state, {
      loading: false,
      error: false,
      params: action.params
  } );
}

const searchingStart = ( state, action ) => {
    return updateObject( state, { resultsLoading: true } );
};

const searchingFail = ( state, action ) => {
    return updateObject( state, { error: action.message, resultsLoading: false } );
};

const searchingRemoveItem = (state, action) => {
    let array = (state.items) ? state.items.filter(item => item.id!==action.id ) : null;
    return updateObject( state, { items: array } );
};

const  searchingUpdateItem = (state, action) => {
    let array = (state.items)?state.items.map(item => (item.id !== action.docData.id) ? item : action.docData):null;
    return updateObject( state, { items: array } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SEARCHING_SUCCESS: return findItemsSuccess(state, action);
        case actionTypes.SEARCHING_START: return searchingStart(state, action);
        case actionTypes.SEARCHING_FAIL: return searchingFail(state, action);
        case actionTypes.SEARCHING_INIT: return searchingInit(state, action);
        case actionTypes.SEARCHING_UPDATE_ITEM: return searchingUpdateItem(state, action);
        case actionTypes.SEARCHING_REMOVE_ITEM: return searchingRemoveItem(state, action);
        case actionTypes.SET_REPORT_NAME: return setReportName(state, action);
        default: return state;
    }
};

export default reducer;
