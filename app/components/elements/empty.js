import React from 'react';
import PropTypes from 'prop-types';

const Empty = props => (
  <div className="empty">
    <div className="empty-icon">
      <i className="icon icon-apps" />
    </div>
    {props.title && <p className="empty-title h5">{props.title}</p>}
    {props.subtitle && <p className="empty-subtitle">{props.subtitle}</p>}
  </div>
);

Empty.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

Empty.defaultProps = {
  title: null,
  subtitle: null,
};

export default Empty;
