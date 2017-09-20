import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TableOverviewTab from './table/overviewTab';
import TableItemsTab from './table/itemsTab';
import TableIndexesTab from './table/indexesTab';

const Table = (props) => {
  if (!props.table || !props.table.TableName) {
    return null;
  }

  return (
    <div className="container">
      <div className="columns">
        <div className="column col-11">
          <h1>{props.table.TableName}</h1>
        </div>
        <div className="column col-1">
          <Link to="/">Close</Link>
        </div>
      </div>
      <ul className="tab tab-block">
        <li className={`tab-item ${props.tab !== 'overview' || 'active'}`}>
          <Link to={`/tables/${props.table.TableName}`}>Overview</Link>
        </li>
        <li className={`tab-item ${props.tab !== 'items' || 'active'}`}>
          <Link to={`/tables/${props.table.TableName}/items`}>Items</Link>
        </li>
        <li className={`tab-item ${props.tab !== 'indexes' || 'active'}`}>
          <Link to={`/tables/${props.table.TableName}/indexes`}>Indexes</Link>
        </li>
      </ul>

      {props.tab === 'overview' && <TableOverviewTab {...props} />}
      {props.tab === 'items' && <TableItemsTab {...props} />}
      {props.tab === 'indexes' && <TableIndexesTab {...props} />}
    </div>
  );
};

Table.propTypes = {
  tab: PropTypes.oneOf(['overview', 'items', 'indexes']).isRequired,
  table: PropTypes.shape({
    AttributeDefinitions: PropTypes.arrayOf(PropTypes.object),
    CreationDateTime: PropTypes.instanceOf(Date),
    ItemCount: PropTypes.number,
    KeySchema: PropTypes.arrayOf(PropTypes.object),
    TableStatus: PropTypes.oneOf(['ACTIVE']),
    TableArn: PropTypes.string,
    TableName: PropTypes.string,
    TableSizeBytes: PropTypes.number,
  }).isRequired,
};

Table.defaultProps = {
  tab: 'overview',
};

export default Table;
