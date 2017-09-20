import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTable } from '../../actions/dynamodb.action';
import Table from '../elements/table';

class TableContainer extends React.Component {

  constructor(props) {
    super(props);
    this.props.loadTable(props.match.params.name);
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
  table: PropTypes.shape({
    AttributeDefinitions: PropTypes.arrayOf(PropTypes.object),
    ItemCount: PropTypes.number,
    KeySchema: PropTypes.arrayOf(PropTypes.object),
    TableArn: PropTypes.string,
    TableName: PropTypes.string,
    TableSizeBytes: PropTypes.number,
  }),
  loadTable: PropTypes.func.isRequired,
};

TableContainer.defaultProps = {
  tab: 'overview',
  table: {},
};


const mapStateToProps = (state, ownProps) => {
  return {
    tab: ownProps.match.params.view,
    table: state.dynamodb.table,
  };
};

const mapDispatchToProps = dispatch => ({
  loadTable: (tableName) => {
    dispatch(loadTable(tableName));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableContainer));
