import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scanItems, queryItems, getItem } from '../../actions/dynamodb.action';
import TableItemsList from '../elements/table/itemsList';

class ItemsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.props.scanItems(props.table.TableName, {});
  }

  render() {
    if (!this.props.isLoading) {
      return <TableItemsList {...this.props} />;
    }

    return <div className="loading loading-lg" />;
  }

}

ItemsContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool.isRequired,
  table: PropTypes.shape({
    AttributeDefinitions: PropTypes.arrayOf(PropTypes.object),
    ItemCount: PropTypes.number,
    KeySchema: PropTypes.arrayOf(PropTypes.object),
    TableArn: PropTypes.string,
    TableName: PropTypes.string,
    TableSizeBytes: PropTypes.number,
  }),
  scanItems: PropTypes.func.isRequired,
  queryItems: PropTypes.func.isRequired,
};

ItemsContainer.defaultProps = {
  isLoading: false,
  items: [],
  table: {},
};


const mapStateToProps = (state) => {
  return {
    items: state.dynamodb.items,
    isLoading: state.dynamodb.isLoadingItems,
    table: state.dynamodb.table,
  };
};

const mapDispatchToProps = dispatch => ({
  scanItems: (tableName, filters) => {
    dispatch(scanItems(tableName, filters));
  },
  queryItems: (tableName, hashKey, rangeKey, filters) => {
    dispatch(queryItems(tableName, hashKey, rangeKey, filters));
  },
  getItem: (tableName, hashKey, rangeKey) => {
    dispatch(getItem(tableName, hashKey, rangeKey));
  },

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemsContainer));
