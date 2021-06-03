import {
    RECEIVE_ALL_PATIENTS,
    RECEIVE_PATIENT,
    REMOVE_PATIENT
} from '../actions/patient_actions';
import { merge } from 'lodash';

const PatientReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch(action.type){
        case RECEIVE_ALL_PATIENTS:
            return merge({}, oldState, action.patients);
        case RECEIVE_PATIENT:
            if (action.patient){
                return merge({}, oldState, {
                    [action.patient.id]: action.patient
                })
            }
        case REMOVE_PATIENT:
            let nextState = Object.assign({}, oldState);
            delete nextState[action.patientId];
            return nextState;
        default:
            return oldState;
    }
};

export default PatientReducer;