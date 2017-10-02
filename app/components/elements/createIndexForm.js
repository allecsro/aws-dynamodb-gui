import React from 'react';
import PropTypes from 'prop-types';
import Modal from './common/modal';

class CreateIndexForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasRangeKey: false,
      hashKey: '',
      hashKeyType: 'S',
      rangeKey: '',
      rangeKeyType: 'S',
      indexName: '',
      projectionType: 'ALL',
      indexNameAuto: true, /* set to true when the index name is automatically generated */
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (this.state.indexNameAuto && name === 'hashKey') {
      this.setState({
        [name]: value,
        indexName: `${value}${this.state.rangeKey !== '' ? `-${this.state.rangeKey}` : ''}-index`,
      });
    } else if (this.state.indexNameAuto && name === 'rangeKey') {
      this.setState({
        [name]: value,
        indexName: `${this.state.hashKey}-${value}-index`,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  render() {
    return (
      <Modal onClose={this.props.onCancel} onSubmit={() => this.props.onSaveIndex(this.state)} title="Create index">
        <form name="createIndexForm" className="form-horizontal">
          <div className="form-group">
            <div className="col-3">
              <label className="form-label" htmlFor="index-hash-key">Primary key*</label>
            </div>
            <div className="col-9">Partition Key</div>
          </div>
          <div className="form-group">
            <div className="col-3" />
            <div className="col-6">
              <input
                type="text"
                id="index-hash-key"
                name="hashKey"
                value={this.state.hashKey}
                onChange={this.handleInputChange}
                className="form-input"
              />
            </div>
            <div className="col-2 ph-1">
              <select
                name="hashKeyType"
                value={this.state.hashKeyType}
                onChange={this.handleInputChange}
                className="form-select"
              >
                <option value="S">String</option>
                <option value="B">Binary</option>
                <option value="N">Number</option>
              </select>
            </div>
            <div className="col-1 p-1">
              <button
                className="btn btn-action btn-primary btn-sm circle tooltip tooltip-left"
                data-tooltip="The primary key is made up of a partition key (hash key) and an optional sort key. The partition key is used to partition data across hosts for scalability and availability. Choose an attribute which has a wide range of values and is likely to have evenly distributed access patterns."
              >
                <b>i</b>
              </button>
            </div>
          </div>

          <div className="form-group">
            <div className="col-3" />
            <div className="col-9" >
              <label className="form-switch" htmlFor="index-range-key-switch">
                <input
                  type="checkbox"
                  name="hasRangeKey"
                  id="index-range-key-switch"
                  onChange={() => this.setState({
                    hasRangeKey: !this.state.hasRangeKey,
                    rangeKey: '',
                    rangeKeyType: 'S',
                  })}
                />
                <i className="form-icon" /> Add sort key
              </label>
            </div>
          </div>

          { this.state.hasRangeKey &&
            <div className="form-group">
              <div className="col-3 relative">
                <div className="float-right absolute" style={{ fontSize: '1.5em', right: 0, top: -70, width: 20, height: 90, border: '2px solid #007dbc', borderRight: 0 }} />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  id="index-range-key"
                  name="rangeKey"
                  value={this.state.rangeKey}
                  onChange={this.handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="col-2 ph-1">
                <select
                  name="rangeKeyType"
                  value={this.state.rangeKeyType}
                  onChange={this.handleInputChange}
                  className="form-select"
                >
                  <option value="S">String</option>
                  <option value="B">Binary</option>
                  <option value="N">Number</option>
                </select>
              </div>
              <div className="col-1 p-1">
                <button
                  className="btn btn-action btn-primary btn-sm circle tooltip tooltip-left"
                  data-tooltip="The sort key allows for searching within a partition."
                >
                  <b>i</b>
                </button>
              </div>
            </div>
          }
          <div className="form-group">
            <div className="col-3">
              <label className="form-label" htmlFor="index-name">Index name*</label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="indexName"
                value={this.state.indexName}
                onChange={this.handleInputChange}
                id="index-name"
                className="form-input"
              />
            </div>
            <div className="col-1 p-1">
              <button
                className="btn btn-action btn-primary btn-sm circle tooltip tooltip-left"
                data-tooltip="When you issue query requests using the index, you will need to specify the index name. The name must be unique per table."
              >
                <b>i</b>
              </button>
            </div>
          </div>

          <div className="form-group">
            <div className="col-3">
              <label className="form-label" htmlFor="index-attributes">Projected attributes</label>
            </div>
            <div className="col-8">
              <select
                name="projectionType"
                value={this.state.projectionType}
                onChange={this.handleInputChange}
                id="index-attributes"
                className="form-select"
              >
                <option value="ALL">All</option>
                <option value="KEYS_ONLY">Keys only</option>
              </select>
            </div>
            <div className="col-1 p-1">
              <button
                className="btn btn-action btn-primary btn-sm circle tooltip tooltip-left"
                data-tooltip="Projected attributes are attributes stored in the index, and can be returned by queries and scans performed on the index."
              >
                <b>i</b>
              </button>
            </div>
          </div>


        </form>
      </Modal>
    );
  }
}

CreateIndexForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSaveIndex: PropTypes.func.isRequired,
};

export default CreateIndexForm;
