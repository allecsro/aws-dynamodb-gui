import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  return (
    <div className="modal active item-modal">
      <div className="modal-overlay" />
      <div className="modal-container">
        <div className="modal-header">
          <button className="btn btn-clear float-right" onClick={props.onClose} />
          {props.title &&
            <div className="modal-title h5">{props.title}</div>
          }
        </div>
        <div className="modal-body">
          <div className="content">
            {props.children}
          </div>
        </div>
        <div className="modal-footer">
          {props.onSubmit &&
            <button className="btn btn-primary" onClick={props.onSubmit}>{props.submitLabel}</button>
          }
          <a href="#modals" className="btn btn-link" onClick={props.onClose}>Close</a>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  submitLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  title: null,
  onSubmit: null,
  onClose: null,
  submitLabel: 'Save',
};

export default Modal;
