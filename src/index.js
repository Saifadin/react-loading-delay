import React from 'react';
import PropTypes from 'prop-types';

class LoadingDelay extends React.PureComponent {
  state = {
    isLoading: this.props.check,
    isDelaying: this.props.check,
    delay: this.props.delay
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.check && nextProps.check !== this.state.isLoading) {
      this.timeout = setTimeout(() => {
        this.setState({
          isDelaying: false
        });
      }, this.state.delay);

      return this.setState({
        isLoading: nextProps.check
      });
    }

    if (nextProps.check && !this.state.isLoading && !this.state.isDelaying) {
      return this.setState({
        isLoading: nextProps.check,
        isDelaying: true,
        delay: nextProps.delay
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }

  render() {
    const { children } = this.props;
    const { isLoading, isDelaying } = this.state;

    return children({ isLoading, isDelaying });
  }
}

LoadingDelay.propTypes = {
  check: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
  delay: PropTypes.number.isRequired,
};

export default LoadingDelay;
