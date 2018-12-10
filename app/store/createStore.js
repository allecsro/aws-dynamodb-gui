import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { makeRootReducer } from './reducers';

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  console.log(promiseMiddleware);
  const composeStoreWithMiddleware = [thunkMiddleware, promiseMiddleware()];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...composeStoreWithMiddleware),
      ...enhancers,
    ),
  );
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers);
    });
  }

  return store;
};
