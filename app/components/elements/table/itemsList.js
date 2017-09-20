import React from 'react';
import PropTypes from 'prop-types';
import ItemContainer from '../../containers/itemContainer';

// TODO AD: this should a presentation component so the logic must be in a container
const TableItemsList = (props) => {
  const hashKey = props.table.KeySchema[0].AttributeName;
  const rangeKey = props.table.KeySchema.length === 2 ?
    props.table.KeySchema[1].AttributeName : false;

  const headers = [hashKey];
  if (rangeKey) headers.push(rangeKey);

  for (let i = 0; i < props.items.length; i += 1) {
    const item = props.items[i];
    Object.keys(item).forEach((name) => {
      if (headers.indexOf(name) < 0) {
        headers.push(name);
      }
    });
  }

  const body = [];
  for (let i = 0; i < props.items.length; i += 1) {
    const item = props.items[i];
    const hk = item[hashKey];
    const rk = rangeKey ? item[rangeKey] : null;
    body.push(
      <tr key={i}>
        {headers.map(header => (
          <td key={`${header}_${i}`}>
            {header === hashKey ?
              <a href={`#${hk}`} onClick={() => props.getItem(props.table.TableName, hk, rk)}>
                {item[header]}
              </a>
              :
              item[header]}
          </td>
        ))}
      </tr>,
    );
  }

  return (
    <div className="container s-items-container">
      <ItemContainer />
      <table className="table table-striped table-hover">
        <thead className="bg-secondary">
          <tr>
            {headers.map(header => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
};

TableItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  table: PropTypes.shape({
    AttributeDefinitions: PropTypes.arrayOf(PropTypes.object),
    ItemCount: PropTypes.number,
    KeySchema: PropTypes.arrayOf(PropTypes.object),
    TableArn: PropTypes.string,
    TableName: PropTypes.string,
    TableSizeBytes: PropTypes.number,
  }).isRequired,
};

TableItemsList.defaultProps = {
  items: [],
};

export default TableItemsList;
