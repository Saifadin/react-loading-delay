import React from 'react';
import PropTypes from 'prop-types';

class LoadingDelay extends React.PureComponent {
  state = {
    isLoading: this.props.check,
    isDelaying: true,
    delay: this.props.delay
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.check && nextProps.check !== this.state.isLoading) {
      this.setState({
        isLoading: nextProps.check
      });

      setTimeout(() => {
        this.setState({
          isDelaying: false
        });
      }, nextProps.delay);
    }
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
