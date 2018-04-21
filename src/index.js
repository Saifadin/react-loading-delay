import React from 'react';
import PropTypes from 'prop-types';

class LoadingDelay extends React.Component {
  state = {
    loading: this.props.check,
    delay: this.props.delay || 0
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.check && nextProps.check !== this.state.loading) {
      setTimeout(() => {
        this.setState({
          loading: false
        });
      }, this.state.delay);
    }
  }

  render() {
    const { children } = this.props;
    const { loading } = this.state;

    return children({ loading });
  }
}

LoadingDelay.propTypes = {
  check: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
  delay: PropTypes.number,
};

export default LoadingDelay;
