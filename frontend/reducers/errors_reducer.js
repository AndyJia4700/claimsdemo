import { combineReducers } from 'redux';
import patientErrorsReducer from './patient_errors_reducer';
import sessionErrorsReducer from './session_errors_reducer';

const errorsReducer = combineReducers({
    sessionErrorsReducer,
    patientErrorsReducer,
})

export default errorsReducer;