import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tables from '../elements/tables';
import TableContainer from './tableContainer';
import { filterTables } from '../../actions/dynamodb.action';

const TablesAndTableContainer = (props) => {
  return (
    <div className="container">
      <div className="columns s-tables-header">
        <div className="column col8">
          <div className="input-group input-inline">
            <div className="has-icon-left">
              <input className="form-input" type="text" onChange={event => props.filterTables(event.target.value)} placeholder="search" />
              <i className="form-icon icon icon-search" />
            </div>
            <button className="btn btn-primary input-group-btn">
              <i className="form-icon icon icon-cross" />
            </button>
          </div>
        </div>
        <div className="column col-4 hide-sm text-right">
          Viewing {props.size} tables.
        </div>
      </div>
      <div className="container">
        <div className="columns">
          <div className="column col-3">
            <Tables {...props} />
          </div>
          <div className="divider-vert p-0" />
          <div className="column col-9 s-table">
            <TableContainer {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

TablesAndTableContainer.propTypes = {
  size: PropTypes.number.isRequired,
  tables: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.func,
      AttributeDefinitions: PropTypes.arrayOf(PropTypes.object),
      ItemCount: PropTypes.number,
      KeySchema: PropTypes.arrayOf(PropTypes.object),
      TableArn: PropTypes.string,
      TableName: PropTypes.string,
      TableSizeBytes: PropTypes.number,
    }),
  ),
  table: PropTypes.shape({
    map: PropTypes.func,
    AttributeDefinitions: PropTypes.arrayOf(PropTypes.object),
    ItemCount: PropTypes.number,
    KeySchema: PropTypes.arrayOf(PropTypes.object),
    TableArn: PropTypes.string,
    TableName: PropTypes.string,
    TableSizeBytes: PropTypes.number,
  }),
  filterTables: PropTypes.func.isRequired,
};

TablesAndTableContainer.defaultProps = {
  size: 0,
  tables: [],
  table: null,
};

const mapStateToProps = (state) => {
  return {
    tables: state.dynamodb.tables,
    table: state.dynamodb.table,
    size: state.dynamodb.tables.length,
  };
};

const mapDispatchToProps = dispatch => ({
  filterTables: (filter) => {
    dispatch(filterTables(filter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TablesAndTableContainer);
