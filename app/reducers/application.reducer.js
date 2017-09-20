import {
  APPLICATION_INITIALIZE_CHECK,
  APPLICATION_SUPPORT_CHECK,
  LOAD_ENVIRONMENT,
  SWITCH_PROFILE,
} from '../actions/application.action';

const ApplicationReducer = (state = window.INITIAL_STATE.application, action) => {
  switch (action.type) {

    case `${APPLICATION_SUPPORT_CHECK}_PENDING`: return state;

    case `${APPLICATION_SUPPORT_CHECK}_FULFILLED`:
      return {
        ...state,
        supported: true,
      };

    case `${APPLICATION_SUPPORT_CHECK}_REJECTED`:
      return {
        ...state,
        supported: false,
      };

    case APPLICATION_INITIALIZE_CHECK:
      return {
        ...state,
        initialized: true,
      };

    case `${LOAD_ENVIRONMENT}_FULFILLED`:
      return Object.assign({}, state, action.payload);

    case SWITCH_PROFILE:
      return {
        ...state,
        currentProfile: action.payload,
      };

    default:
      // If no action matched, we return the state unchanged
      return state;
  }
};

export default ApplicationReducer;
