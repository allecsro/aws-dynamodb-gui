import React from 'react';
import PropTypes from 'prop-types';
import ItemsContainer from '../../containers/itemsContainer';

const TableItemsTab = (props) => {
  const hashKey = props.table.KeySchema[0].AttributeName;
  const rangeKey = props.table.KeySchema.length === 2 ?
    props.table.KeySchema[1].AttributeName : false;

  return (
    <div className="container">

      <header className="columns">
        <section className="column col-xs-8 s-navbar-actions">
          <button className="btn btn-primary">Create item</button>
          { '\u00a0' }
          <div className="dropdown">
            <a href="#dropdown" className="btn disabled dropdown-toggle" tabIndex={0}>
              Actions <i className="icon icon-arrow-down" />
            </a>
            <ul className="menu">
              <li className="menu-item">
                <a href="#dropdowns">Duplicate</a>
              </li>
              <li className="menu-item">
                <a href="#dropdowns">Edit</a>
              </li>
              <li className="menu-item">
                <a href="#dropdowns">Delete</a>
              </li>
              <li className="menu-item">
                <a href="#dropdowns">Export to CSV</a>
              </li>
            </ul>
          </div>
        </section>
        <section className="column col-xs-4">
          <div />
        </section>
      </header>

      <div className="accordion bg-gray s-scanquery-header">
        <div className="accordion">
          <input type="checkbox" id="accordion-1" name="accordion-checkbox" hidden />
          <label className="accordion-header c-hand" htmlFor="accordion-1">
            <div className="columns">
              <div className="column col-8 ">
                <i className="icon icon-arrow-right mr-1" />
                Scan: [Table] {props.table.TableName}: {hashKey}{!rangeKey || `, ${rangeKey}`}
              </div>
              <div className="column col-4">
                <ul className="pagination float-right">
                  <li className="page-item disabled">
                    <a href="#prev">
                      <div className="page-item-subtitle"><i className="icon icon-arrow-left mr-1" /></div>
                    </a>
                  </li>
                  <li>
                    <span>
                      Viewing 1 to 100 items
                    </span>
                  </li>
                  <li className="page-item">
                    <a href="#next">
                      <div className="page-item-subtitle"><i className="icon icon-arrow-right mr-1" /></div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </label>
          <div className="accordion-body bg-dark">
            <form className="form-horizontal">
              <div className="form-group columns">
                <div className="column col-2">
                  <select className="form-select mx-1">
                    <option>Scan</option>
                    <option>Query</option>
                  </select>
                </div>
                <div className="column col-8">
                  <select className="form-select">
                    <option>[Table] {props.table.TableName}: {hashKey}{!rangeKey || `, ${rangeKey}`}</option>
                  </select>
                </div>
              </div>
              <div className="columns">
                <div className="column col-2" />
                <div className="column col-8">
                  <button className="btn btn-link">
                    <span className="text-light"><i className="icon icon-plus" /> Add filter</span>
                  </button>
                  <div className="divider" />
                  <button className="btn">Start search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ItemsContainer />
    </div>
  );
};

TableItemsTab.propTypes = {
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

export default TableItemsTab;
