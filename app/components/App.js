import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initialize } from '../actions/application.action';

import AwsLayout from './layouts/awsLayout';
import WarningLayout from './layouts/warningLayout';


class App extends React.Component {
  componentDidMount() {
    if (!this.props.initialized) this.props.initialize();
  }

  render () {
    const { supported, initialized } = this.props;

    if (!initialized) {
      return null; // show nothing while initializing
    }

    /**
     * Do not mount the application until it has been initialized. Once
     * it has been initialized, show the full application if it is supported.
     * If it is not supported (due to network error or lack of browser support),
     * then show the warning.
     */
    return supported ? <AwsLayout {...this.props} /> : <WarningLayout />;
  }
}


App.propTypes = {
  initialize: PropTypes.func.isRequired,
  supported: PropTypes.bool.isRequired,
  initialized: PropTypes.bool.isRequired,
};

App.defaultProps = {
  initialized: false,
  supported: false,
};


export default connect(
  state => ({
    ...state.application,
  }),
  dispatch => ({
    initialize: () => dispatch(initialize()),
  }),
)(App);
