import { combineReducers } from 'redux';
import application from '../reducers/application.reducer';
import dynamodb from '../reducers/dynamodb.reducer';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    application,
    dynamodb,
    // Add sync reducers here
    ...asyncReducers,
  });
};

export default makeRootReducer;
