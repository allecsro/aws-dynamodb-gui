import React from 'react';
import PropTypes from 'prop-types';

class InteractiveSelection extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      value: this.props.value,
    };
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    if (this.props.isKey) return null;

    return (
      <input
        className="json-inspector__selection"
        value={this.state.value}
        size={Math.max(1, this.props.value.length)}
        spellCheck={false}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            this.props.onChange(this.props.keypath, this.state.value);
            e.target.blur();
          }
        }}
        onClick={e => e.stopPropagation()}
        onFocus={e => e.target.select}
        onChange={this.onChange}
      />
    );
  }
}

InteractiveSelection.propTypes = {
  keypath: PropTypes.string.isRequired,
  isKey: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

InteractiveSelection.defaultProps = {
  value: '',
  onChange: () => {},
};


export default InteractiveSelection;
