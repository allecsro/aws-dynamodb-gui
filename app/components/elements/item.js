import React from 'react';
import PropTypes from 'prop-types';
import Inspector from 'react-json-inspector';
import InteractiveSelection from '../elements/interactiveSelection';

const Item = (props) => {
  if (!props.item) {
    return null;
  }

  return (
    <div className="modal active item-modal">
      <div className="modal-overlay" />
      <div className="modal-container">
        <div className="modal-header">
          <button className="btn btn-clear float-right" onClick={props.clearItem} />
          <div className="modal-title h5">Edit item</div>
        </div>
        <div className="modal-body">
          <div className="content">
            <Inspector
              data={props.item}
              interactiveLabel={p => <InteractiveSelection {...p} onChange={props.updateItem} />}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={props.saveItem}>Save</button>
          <a href="#modals" className="btn btn-link" onClick={props.clearItem}>Close</a>
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({}).isRequired,
  clearItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  saveItem: PropTypes.func.isRequired,
};

export default Item;
