import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import createStore from './store/createStore';

import Root from './config/Root';

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store.
const initialState = window.INITIAL_STATE;
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component store={store} />
      </AppContainer>
    </Provider>,
    MOUNT_NODE,
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./config/Root', () => {
    const newApp = require('./config/Root').default;
    render(newApp);
  });
}
