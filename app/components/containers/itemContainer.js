import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from '../elements/item';
import { clearItem, updateItem, saveItem } from '../../actions/dynamodb.action';

const ItemContainer = (props) => {
  return <Item {...props} />;
};

ItemContainer.propTypes = {
  item: PropTypes.shape({}),
  clearItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  saveItem: PropTypes.func.isRequired,
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
  updateItem: (keypath, value) => {
    dispatch(updateItem(keypath, value));
  },
  saveItem: () => {
    dispatch(saveItem());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemContainer));
