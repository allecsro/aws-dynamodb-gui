import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import Tables from '../elements/tables';
import Empty from '../elements/empty';
import TableContainer from './tableContainer';

const TablesAndTableContainer = (props) => {
  if (!props.tables || props.tables.length === 0) {
    return <Empty title="No tables were found" />;
  }

  return (
    <div className="container">
      <div className="columns s-tables-header">
        <div className="column col8">
          <div className="input-group input-inline">
            <input className="form-input" type="text" placeholder="search" />
            <button className="btn btn-primary input-group-btn">Search</button>
          </div>
        </div>
        <div className="column col-4 hide-sm text-right">
          Viewing {props.size} tables.
        </div>
      </div>
      <div className="container s-tables">
        <SplitPane split="vertical" minSize={200} defaultSize={250}>
          <div>
            <Tables {...props} />
          </div>
          <div>
            <TableContainer {...props} />
          </div>
        </SplitPane>
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
};

TablesAndTableContainer.defaultProps = {
  size: 0,
  tables: [],
};

const mapStateToProps = (state) => {
  return {
    tables: state.dynamodb.tables,
    size: state.dynamodb.tables.length,
  };
};

export default connect(mapStateToProps)(TablesAndTableContainer);
