import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = props => (
  <div className="accordion-container">
    <div className="accordion">
      <input type="checkbox" id="database-accordion" name="database-checkbox" hidden defaultChecked />
      <label className="accordion-header c-hand" htmlFor="database-accordion">
        Profiles
      </label>
      <div className="accordion-body">
        <ul className="menu menu-nav">
          {props.profiles.map(profile => (
            <li key={profile.name} className={`menu-item ${profile.name === props.currentProfile ? 'active' : ''}`}>
              <Link to={`/profile/${profile.name}`}>{profile.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

Sidebar.propTypes = {
  currentProfile: PropTypes.string,
  profiles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    awsRegion: PropTypes.string,
    awsAccessKeyId: PropTypes.string,
    awsSecretAccessKey: PropTypes.string,
    dynamodbEndpoint: PropTypes.string,
  })).isRequired,
};

Sidebar.defaultProps = {
  currentProfile: null,
  profiles: [],
};

export default Sidebar;
