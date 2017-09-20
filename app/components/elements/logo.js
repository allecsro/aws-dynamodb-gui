import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Logo = props => (
  <Link to="/" className="s-logo">
    <img src={'/images/dynamodb.svg'} alt="DynamoDB" />
    {props.title && <h2>{props.title}</h2>}
  </Link>
);

Logo.propTypes = {
  title: PropTypes.string,
};

Logo.defaultProps = {
  title: null,
};

export default Logo;
