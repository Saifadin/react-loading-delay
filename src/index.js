import React from 'react';
import PropTypes from 'prop-types';

class LoadingDelay extends React.PureComponent {
  state = {
    isLoading: this.props.check,
    isDelaying: this.props.check
  };

  componentDidMount() {
    if (this.props.check) {
      this.timeout = setTimeout(() => {
        this.setState({
          isDelaying: false
        });
      }, this.props.delay);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.check && !this.state.isDelaying) {
      this.timeout = setTimeout(() => {
        this.setState({
          isDelaying: false
        });
      }, nextProps.delay);

      return this.setState({
        isLoading: true,
        isDelaying: true
      });
    }

    if (!nextProps.check && nextProps.check !== this.state.isLoading) {
      this.setState({
        isLoading: false
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
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
