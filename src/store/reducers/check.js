import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    check: null,
    loading: false,
    error: '',
    available: true
};


const operationStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const operationFail = ( state, action ) => {
    return updateObject( state, { error: action.message, loading: false } );
};

const saveCheckSuccess = ( state, action ) => {
    const newCheck = updateObject( action.checkData );
    return updateObject( state, {
        loading: false,
        error: '',
        check: newCheck
    } );
};

const deleteCheckSuccess = ( state, action ) => {
    return updateObject( state, {
        check: null,
        loading: false,
        error: ''
    } );
};

const setCheck = (state, action) =>{
    return {
        check: null,
        loading: false,
        error: '',
        available: action.available
    } ;
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.OPERATION_START: return operationStart(state, action);
        case actionTypes.OPERATION_FAIL: return operationFail(state, action);
        case actionTypes.SAVE_CHECK_SUCCESS: return saveCheckSuccess(state, action);
        case actionTypes.DELETE_CHECK_SUCCESS: return deleteCheckSuccess(state, action);
        case actionTypes.SET_CHECK: return setCheck(state, action);
        default: return state;
    }
};

export default reducer;
