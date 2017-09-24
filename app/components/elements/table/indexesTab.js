import React from 'react';
import PropTypes from 'prop-types';

const TableIndexesTab = (props) => {
  return (
    <div className="container">

      <header className="columns">
        <section className="column col-xs-8 s-navbar-actions">
          <button className="btn btn-primary">Create index</button>
          { '\u00a0' }
          <button className="btn btn-primary disabled">Delete index</button>
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
            {props.table.GlobalSecondaryIndexes.map(
              (index) => {
                const hashKey = index.KeySchema[0].AttributeName;
                const rangeKey = index.KeySchema.length === 2 ?
                  index.KeySchema[1].AttributeName : '-';

                return (
                  <tr key={index.IndexName}>
                    <td><input type="radio" /></td>
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
      </div>
    </div>
  );
};

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
};

export default TableIndexesTab;
