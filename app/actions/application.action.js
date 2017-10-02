import clientStorage from 'store';
import Noty from 'noty';
import Logger from '../utils/logger';
import { initDynamoDBAws } from './dynamodb.action';

const log = new Logger('ApplicationAction');

// ======================================================
// Action types
// ======================================================
export const APPLICATION_PREINIT_CHECK = 'APPLICATION_PREINIT_CHECK';
export const APPLICATION_INITIALIZE_CHECK = 'APPLICATION_INITIALIZE_CHECK';
export const APPLICATION_SUPPORT_CHECK = 'APPLICATION_SUPPORT_CHECK';
export const LOAD_ENVIRONMENT = 'LOAD_ENVIRONMENT';
export const INIT_AWS = 'INIT_AWS';
export const SWITCH_PROFILE = 'SWITCH_PROFILE';

/**
 * Check if the browser is supported
 */
const performSupportCheck = () => ({
  type: APPLICATION_SUPPORT_CHECK,
  payload: new Promise((resolve, reject) => {
    const isSupported = ('querySelector' in document &&
      clientStorage.enabled &&
      'addEventListener' in window);

    log.debug(`Application supported: ${isSupported}`);

    if (isSupported) {
      resolve();
    } else {
      reject();
    }
  }),
});

/**
 * Switch profile
 */
export const switchProfile = (profile) => {
  return (dispatch) => {
    dispatch({
      type: SWITCH_PROFILE,
      payload: profile,
    });

    dispatch(initDynamoDBAws());
  };
};

/**
 * Loads the application environment variables from the API
 * @returns {function(*=)}
 */
export const loadEnvironment = () => {
  return (dispatch, getState) => {
    return dispatch({
      type: INIT_AWS,
      payload: new Promise((resolve, reject) => {
        const state = getState();

        const profile =
          state.application.currentProfile || Object.keys(state.application.profiles)[0];

        if (!profile) {
          reject('No configuration profile found');
        }

        dispatch(switchProfile(profile));

        resolve(true);
      }),
    });
  };
};

export const initialize = () => {
  return (dispatch) => {
    log.debug('Initializing application...');

    // Catch unhandled rejected promises and display a notification
    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason) {
        new Noty({
          type: 'error',
          text: event.reason.error.message,
          timeout: 5000,
        }).show();
      } else if (event.message) {
        new Noty({
          type: 'error',
          text: event.message,
          timeout: 5000,
        }).show();
      }
    });

    return dispatch({
      type: 'APPLICATION_PREINIT_CHECK',
      payload: Promise.all([
        dispatch(performSupportCheck()),
        dispatch({
          type: 'APPLICATION_CHECK_DELAY',
          payload: new Promise(resolve => setTimeout(resolve, 1)),
        }),
        dispatch(loadEnvironment()),
      ]),
    }).then(() => {
      log.debug('Application initialization: checked');

      dispatch({
        type: APPLICATION_INITIALIZE_CHECK,
      });
    }).catch((error) => {
      log.error(`Application initialization failed: ${error}`);

      dispatch({
        type: APPLICATION_INITIALIZE_CHECK,
      });
    });
  };
};

