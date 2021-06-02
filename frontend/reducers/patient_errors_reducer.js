import { RECEIVE_PATIENT_ERRORS } from '../actions/patient_actions';

export const patientErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_PATIENT_ERRORS:
            if (action.errors == undefined) {
                return [];
            } else {
                return action.errors;
            }
        default:
            return state;
    }
};

export default patientErrorsReducer;