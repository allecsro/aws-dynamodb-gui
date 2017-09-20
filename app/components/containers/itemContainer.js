import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Inspector from 'react-json-inspector';
import { connect } from 'react-redux';
import { clearItem } from '../../actions/dynamodb.action';

const ItemContainer = (props) => {
  if (props.item) {
    return (
      <div className="modal active item-modal">
        <div className="modal-overlay" />
        <div className="modal-container">
          <div className="modal-header">
            <button className="btn btn-clear float-right" onClick={props.clearItem} />
            <div className="modal-title h5">Edit item</div>
          </div>
          <div className="modal-body">
            <div className="content">
              <Inspector data={props.item} />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary">Save</button>
            <a href="#modals" className="btn btn-link" onClick={props.clearItem}>Close</a>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

ItemContainer.propTypes = {
  item: PropTypes.shape({}),
  clearItem: PropTypes.func.isRequired,
};

ItemContainer.defaultProps = {
  item: null,
};

const mapStateToProps = (state) => {
  return {
    item: state.dynamodb.item,
  };
};

const mapDispatchToProps = dispatch => ({
  clearItem: () => {
    dispatch(clearItem());
  },

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemContainer));
