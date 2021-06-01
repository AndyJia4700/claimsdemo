import * as PatientUtil from '../util/patient_util'

export const RECEIVE_ALL_PATIENTS = 'RECEIVE_ALL_PATIENTS';
export const RECEIVE_PATIENT = 'RECEIVE_PATIENT';
export const REMOVE_PATIENT = 'REMOVE_PATIENT';

const receiveAllPatients = patients => ({
    type: RECEIVE_ALL_PATIENTS,
    patients
});

const receivePatient = patient => ({
    type: RECEIVE_PATIENT,
    patient
});

const removePatient = patientId => ({
    type: REMOVE_PATIENT,
    patientId
});

export const fetchPatients = () => dispatch => (
    PatientUtil.fetchPatients()
        .then(patients => dispatch(receiveAllPatients(patients)))
);

export const fetchPatient = patientId => dispatch => (
    PatientUtil.fetchPatient(patientId)
        .then(patient => dispatch(receivePatient(patient)))
);

export const createPatient = patient => dispatch => (
    PatientUtil.createPatient(patient)
        .then(patient => dispatch(receivePatient(patient)))
);

export const updatePatient = patient => dispatch => (
    PatientUtil.updatePatient(patient)
        .then(patient => dispatch(receivePatient(patient)))
);

export const deletePatient = patientId => dispatch => (
    PatientUtil.deletePatient(patientId)
        .then(() => dispatch(removePatient(patientId)))
);
