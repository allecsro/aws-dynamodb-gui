import React from 'react';
import PropTypes from 'prop-types';

const TableOverviewTab = (props) => {
  const hashKey = props.table.KeySchema[0].AttributeName;
  const rangeKey = props.table.KeySchema.length === 2 ?
    props.table.KeySchema[1].AttributeName : false;

  return (
    <form className="form-horizontal">
      <div className="form-group">
        <div className="col-3">
          <b className="form-label">Table name</b>
        </div>
        <div className="col-9">
          <span>{props.table.TableName}</span>
        </div>
      </div>
      <div className="form-group">
        <div className="col-3">
          <b className="form-label">Primary partition key</b>
        </div>
        <div className="col-9">
          <span>{hashKey}</span>
        </div>
      </div>
      <div className="form-group">
        <div className="col-3">
          <b className="form-label">Primary sort key</b>
        </div>
        <div className="col-9">
          <span>{rangeKey || '-'}</span>
        </div>
      </div>
      <div className="form-group">
        <div className="col-3">
          <b className="form-label">Table status</b>
        </div>
        <div className="col-9">
          <span>{props.table.TableStatus}</span>
        </div>
      </div>
      <div className="form-group">
        <div className="col-3">
          <b className="form-label">Creation date</b>
        </div>
        <div className="col-9">
          <span>{props.table.CreationDateTime ? props.table.CreationDateTime.toString() : '-'}</span>
        </div>
      </div>
      <div className="form-group">
        <div className="col-3">
          <b className="form-label">Storage size (in bytes)</b>
        </div>
        <div className="col-9">
          <span>{props.table.TableSizeBytes}</span>
        </div>
      </div>
      <div className="form-group">
        <div className="col-3">
          <b className="form-label">Item count</b>
        </div>
        <div className="col-9">
          <span>{props.table.ItemCount}</span>
        </div>
      </div>
      <div className="form-group">
        <div className="col-3">
          <b className="form-label">Region</b>
        </div>
        <div className="col-9">
          <span>{props.table.TableName}</span>
        </div>
      </div>
      <div className="form-group">
        <div className="col-3">
          <b className="form-label">Amazon Resource Name (ARN)</b>
        </div>
        <div className="col-9">
          <span>{props.table.TableArn}</span>
        </div>
      </div>
    </form>
  );
};

TableOverviewTab.propTypes = {
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

export default TableOverviewTab;
