/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Tables extends React.Component {

  /**
   * Renders the list of tables
   *
   * @returns {*}
   */
  renderTables() {
    return this.props.tables.map((table) => {
      const name = table.TableName;
      const id = table.TableArn;

      const attributes = {};
      for (let i = 0; i < table.AttributeDefinitions.length; i++) {
        const attribute = table.AttributeDefinitions[i];
        attributes[attribute.AttributeName] = attribute;
      }

      const types = {
        S: 'String',
        N: 'Number',
      };

      const hk = table.KeySchema[0].AttributeName;
      const hkType = types[attributes[hk].AttributeType];

      const rk = table.KeySchema.length === 2 ? table.KeySchema[1].AttributeName : false;
      const rkType = rk ? types[attributes[rk].AttributeType] : false;

      const indices = table.GlobalSecondaryIndexes ? table.GlobalSecondaryIndexes.length : 0;
      const itemCount = table.ItemCount;

      return (
        <tr key={id}>
          <td style={{ width: 40, textAlign: 'center' }}>
            <input type="radio" name="gender" />
          </td>
          <td>
            <Link to={`/tables/${name}`}>{name}</Link>
          </td>
          <td>{hk} ({hkType})</td>
          <td>{rk || '-'} {rkType ? ` (${rkType})` : false}</td>
          <td>{itemCount}</td>
          <td>{indices}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Partition Key</th>
              <th>Sort Key</th>
              <th>Item Count</th>
              <th>Indexes</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTables()}
          </tbody>
        </table>
      </div>
    );
  }
}


Tables.propTypes = {
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

Tables.defaultProps = {
  tables: false,
};


export default Tables;
