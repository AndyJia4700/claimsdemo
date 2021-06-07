import { combineReducers } from "redux";
import userReducer from './users_reducer';
import patientReducer from './patients_reducer';
import claimReducer from './claims_reducer';

const entitiesReducer = combineReducers({
    user: userReducer,
    patient: patientReducer,
    claim: claimReducer
});

export default entitiesReducer;