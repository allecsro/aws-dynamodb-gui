import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tables from '../elements/tables';
import Empty from '../elements/empty';
import { filterTables } from '../../actions/dynamodb.action';
import { switchProfile } from '../../actions/application.action';

class TablesContainer extends React.Component {

  componentDidMount() {
    if (this.props.appProfile && this.props.match.params.profile &&
        this.props.match.params.profile !== this.props.appProfile) {
      this.props.switchProfile(this.props.match.params.profile);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appProfile && nextProps.match.params.profile &&
        this.props.appProfile !== nextProps.match.params.profile) {
      this.props.switchProfile(nextProps.match.params.profile);
    }
  }

  render() {
    if (this.props.isLoadingTables) {
      return <div className="loading loading-lg" />;
    }

    if (this.props.totalTablesCount === 0) {
      return <Empty title="No tables were found" />;
    }

    return (
      <div className="container">
        <div className="columns s-tables-header">
          <div className="column col8">
            <div className="input-group input-inline">
              <div className="has-icon-left">
                <input className="form-input" type="text" onChange={event => this.props.filterTables(event.target.value)} placeholder="search" />
                <i className="form-icon icon icon-search" />
              </div>
              <button className="btn btn-primary input-group-btn">
                <i className="form-icon icon icon-cross" />
              </button>
            </div>
          </div>
          <div className="column col-4 hide-sm text-right">
            Viewing {this.props.filteredTablesCount} of {this.props.totalTablesCount} tables.
          </div>
        </div>
        {this.props.filteredTablesCount > 0 ?
          <Tables {...this.props} /> :
          <Empty title="No tables found for the given filter." />}
      </div>
    );
  }
}

TablesContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
    url: PropTypes.string,
  }).isRequired,
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
  filteredTablesCount: PropTypes.number.isRequired,
  totalTablesCount: PropTypes.number.isRequired,
  appProfile: PropTypes.string.isRequired,
  filterTables: PropTypes.func.isRequired,
  switchProfile: PropTypes.func.isRequired,
  isLoadingTables: PropTypes.bool.isRequired,
};

TablesContainer.defaultProps = {
  totalTablesCount: 0,
  filteredTablesCount: 0,
  tables: [],
};

const mapStateToProps = (state) => {
  return {
    tables: state.dynamodb.tables,
    totalTablesCount: state.dynamodb.totalTablesCount,
    filteredTablesCount: state.dynamodb.filteredTablesCount,
    isLoadingTables: state.dynamodb.isLoadingTables,
    appProfile: state.application.currentProfile,
  };
};

const mapDispatchToProps = dispatch => ({
  filterTables: (filter) => {
    dispatch(filterTables(filter));
  },
  switchProfile: (profile) => {
    dispatch(switchProfile(profile));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TablesContainer);
