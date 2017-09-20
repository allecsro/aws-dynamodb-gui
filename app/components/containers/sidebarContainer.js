import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidebar from '../elements/sidebar';

const SidebarContainer = props => (
  <Sidebar {...props} />
);

SidebarContainer.propTypes = {
  currentProfile: PropTypes.string,
  profiles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    awsRegion: PropTypes.string,
    awsAccessKeyId: PropTypes.string,
    awsSecretAccessKey: PropTypes.string,
    dynamodbEndpoint: PropTypes.string,
  })).isRequired,
};

SidebarContainer.defaultProps = {
  currentProfile: null,
  profiles: [],
};

const mapStateToProps = (state) => {
  const profiles = [];
  Object.keys(state.application.profiles).forEach((name, profile) => {
    profiles.push(Object.assign({}, profile, {
      name,
    }));
  });

  return {
    profiles,
    currentProfile: state.application.currentProfile,
  };
};

export default connect(mapStateToProps)(SidebarContainer);
