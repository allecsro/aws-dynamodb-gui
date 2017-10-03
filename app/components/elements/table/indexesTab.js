import React from 'react';
import PropTypes from 'prop-types';
import CreateIndexForm from '../createIndexForm';

class TableIndexesTab extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      create: false,
      selected: false,
    };

    this.showCreateIndexForm = this.showCreateIndexForm.bind(this);
  }

  showCreateIndexForm() {
    this.setState({
      create: true,
    });
  }

  render() {
    return (
      <div className="container s-indexes">

        { this.state.create &&
          <CreateIndexForm
            onCancel={() => this.setState({ create: false })}
            onSaveIndex={(data) => {
              this.setState({ create: false });
              this.props.onSaveIndex(data);
            }}
          />
        }

        <header className="columns">
          <section className="column col-xs-8 s-navbar-actions">
            <button className="btn btn-primary" onClick={this.showCreateIndexForm}>Create index</button>
            {'\u00a0'}
            <button
              className={`btn btn-primary ${this.state.selected ? '' : 'disabled'}`}
              disabled={!this.state.selected}
              onClick={() => this.props.onDeleteIndex(this.state.selected)}
            >
              Delete index
            </button>
          </section>
        </header>

        <div className="container s-items-container">
          <table className="table table-striped table-hover">
            <thead className="bg-secondary">
              <tr>
                <th />
                <th>Name</th>
                <th>Status</th>
                <th>Type</th>
                <th>Partition key</th>
                <th>Sort key</th>
                <th>Attributes</th>
                <th>Size</th>
                <th>Item count</th>
              </tr>
            </thead>
            <tbody>
              { this.props.table.GlobalSecondaryIndexes &&
                  this.props.table.GlobalSecondaryIndexes.map(
                (index) => {
                  const hashKey = index.KeySchema[0].AttributeName;
                  const rangeKey = index.KeySchema.length === 2 ?
                    index.KeySchema[1].AttributeName : '-';

                  return (
                    <tr key={index.IndexName}>
                      <td>
                        <input
                          type="radio"
                          name="selectedIndex"
                          disabled={index.IndexStatus !== 'ACTIVE'}
                          value={index.IndexName}
                          onChange={() => this.setState({
                            selected: index,
                          })}
                        />
                      </td>
                      <td>{index.IndexName}</td>
                      <td>{index.IndexStatus}</td>
                      <td>GSI</td>
                      <td>{hashKey}</td>
                      <td>{rangeKey}</td>
                      <td>Attributes</td>
                      <td>{index.IndexSizeBytes}</td>
                      <td>{index.ItemCount}</td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>

          {!this.props.table.GlobalSecondaryIndexes &&
          <div className="empty">
            <div className="empty-icon">
              <i className="icon icon-search" />
            </div>
            <p className="empty-title h5">There are no indexes defined for this table</p>
            <p className="empty-subtitle">
              Global Secondary Indexes (GSI) allow you to query efficiently over
              any field (attribute) in your DynamoDB table.
              <br />
              GSIs can treat any table attribute
              as a key, even attributes not present in all items.
            </p>
            <div className="empty-action">
              <button className="btn btn-primary">Create index</button>
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
}

TableIndexesTab.propTypes = {
  table: PropTypes.shape({
    AttributeDefinitions: PropTypes.arrayOf(PropTypes.object),
    CreationDateTime: PropTypes.instanceOf(Date),
    GlobalSecondaryIndexes: PropTypes.arrayOf(PropTypes.object),
    ItemCount: PropTypes.number,
    KeySchema: PropTypes.arrayOf(PropTypes.object),
    TableStatus: PropTypes.oneOf(['ACTIVE']),
    TableArn: PropTypes.string,
    TableName: PropTypes.string,
    TableSizeBytes: PropTypes.number,
  }).isRequired,
  onSaveIndex: PropTypes.func.isRequired,
  onDeleteIndex: PropTypes.func.isRequired,
};

export default TableIndexesTab;
