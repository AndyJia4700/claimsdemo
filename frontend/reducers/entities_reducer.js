import { combineReducers } from "redux";
import userReducer from './users_reducer';
import patientReducer from './patients_reducer';
import claimReducer from './claims_reducer';
import cptReducer from './cpts_reducer';
import icdReducer from './icds_reducer';
import billingCptReducer from './billing_cpts_reducer';
import billingIcdReducer from './billing_icds_reducer';

const entitiesReducer = combineReducers({
    user: userReducer,
    patient: patientReducer,
    claim: claimReducer,
    cpt: cptReducer,
    icd: icdReducer, 
    billingCpt: billingCptReducer,
    billingIcd: billingIcdReducer,
});

export default entitiesReducer;