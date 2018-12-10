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
    if (!this.props.tables) {
      return null;
    }

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
            <input type="radio" checked={this.props.table && table.TableName === this.props.table.TableName} onChange={() => {}} />
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
        <table className="table tablesaw tablesaw-swipe" data-tablesaw-mode="swipe" data-tablesaw-sortable data-tablesaw-sortable-switch>
          <thead>
            <tr>
              <th scope="col" data-tablesaw-priority="persist" />
              <th scope="col" data-tablesaw-priority="persist" data-tablesaw-sortable-col data-tablesaw-sortable-default-col>Name</th>
              <th scope="col" data-tablesaw-sortable-col>Partition Key</th>
              <th scope="col" data-tablesaw-sortable-col >Sort Key</th>
              <th scope="col" data-tablesaw-sortable-col data-tablesaw-sortable-numeric>Item Count</th>
              <th scope="col" data-tablesaw-sortable-col data-tablesaw-sortable-numeric>Indexes</th>
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
  table: PropTypes.shape({
    map: PropTypes.func,
    AttributeDefinitions: PropTypes.arrayOf(PropTypes.object),
    ItemCount: PropTypes.number,
    KeySchema: PropTypes.arrayOf(PropTypes.object),
    TableArn: PropTypes.string,
    TableName: PropTypes.string,
    TableSizeBytes: PropTypes.number,
  }),
};

Tables.defaultProps = {
  tables: false,
  table: null,
};


export default Tables;
