import { combineReducers } from "redux";
import userReducer from './users_reducer';
import patientReducer from './patients_reducer';

const entitiesReducer = combineReducers({
    user: userReducer,
    patient: patientReducer,
});

export default entitiesReducer;