import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTable, createIndex } from '../../actions/dynamodb.action';
import Table from '../elements/table';

class TableContainer extends React.Component {

  componentWillMount() {
    this.props.loadTable(this.props.match.params.name);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      this.props.loadTable(nextProps.match.params.name);
    }
  }

  render() {
    if (this.props.table.TableName) {
      return <Table {...this.props} />;
    }
    return null;
  }

}

TableContainer.propTypes = {
  tab: PropTypes.oneOf(['overview', 'items', 'indexes']).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
    url: PropTypes.string,
  }).isRequired,
  pagination: PropTypes.shape({
    from: PropTypes.number,
    to: PropTypes.number,
  }),
  table: PropTypes.shape({
    AttributeDefinitions: PropTypes.arrayOf(PropTypes.object),
    ItemCount: PropTypes.number,
    KeySchema: PropTypes.arrayOf(PropTypes.object),
    TableArn: PropTypes.string,
    TableName: PropTypes.string,
    TableSizeBytes: PropTypes.number,
  }),
  loadTable: PropTypes.func.isRequired,
  onSaveIndex: PropTypes.func.isRequired,
};

TableContainer.defaultProps = {
  tab: 'overview',
  table: {},
  pagination: null,
};

const mapStateToProps = (state, ownProps) => {
  return {
    tab: ownProps.match.params.view,
    table: state.dynamodb.table,
    pagination: {
      from: 1,
      to: state.dynamodb.scanCount,
    },
  };
};

const mapDispatchToProps = dispatch => ({
  loadTable: (tableName) => {
    dispatch(loadTable(tableName));
  },
  onSaveIndex: (data) => {
    dispatch(createIndex(data));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableContainer));
