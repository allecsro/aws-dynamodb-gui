import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tables from '../elements/tables';
import Empty from '../elements/empty';
import { filterTables } from '../../actions/dynamodb.action';
import { switchProfile } from '../../actions/application.action';

class TablesContainer extends React.Component {

  constructor(props) {
    super(props);

    this.onFilterChange = this.onFilterChange.bind(this);

    this.state = {
      filter: '',
    };
  }

  componentDidMount() {
    if (this.props.match.params.profile &&
        this.props.match.params.profile !== this.props.appProfile) {
      this.props.switchProfile(this.props.match.params.profile);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appProfile !== nextProps.match.params.profile) {
      this.props.switchProfile(nextProps.match.params.profile);
    }
  }

  onFilterChange(event) {
    this.setState({
      filter: event.target.value,
    });
  }

  render() {
    if (this.props.isLoadingTables) {
      return <div className="loading loading-lg" />;
    }

    if (!this.props.tables || this.props.tables.length === 0) {
      return <Empty title="No tables were found" />;
    }

    return (
      <div className="container">
        <div className="columns s-tables-header">
          <div className="column col8">
            <div className="input-group input-inline">
              <input className="form-input" type="text" onChange={this.onFilterChange} placeholder="search" />
              <button className="btn btn-primary input-group-btn" onClick={() => this.props.filterTables(this.state.filter)}>Search</button>
            </div>
          </div>
          <div className="column col-4 hide-sm text-right">
            Viewing {this.props.size} tables.
          </div>
        </div>
        <Tables {...this.props} />
      </div>
    );
  }
}

TablesContainer.propTypes = {
  size: PropTypes.number.isRequired,
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
  appProfile: PropTypes.string.isRequired,
  filterTables: PropTypes.func.isRequired,
  switchProfile: PropTypes.func.isRequired,
  isLoadingTables: PropTypes.bool.isRequired,
};

TablesContainer.defaultProps = {
  size: 0,
  tables: [],
};

const mapStateToProps = (state) => {
  return {
    tables: state.dynamodb.tables,
    size: state.dynamodb.tables.length,
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
