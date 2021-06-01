import { RECEIVE_PATIENT_ERRORS} from '../actions/patient_actions';

export const patientErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_PATIENT_ERRORS:
            return action.errors;
        default:
            return state
    }
};

export default patientErrorsReducer;