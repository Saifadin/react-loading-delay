'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingDelay = function (_React$PureComponent) {
  _inherits(LoadingDelay, _React$PureComponent);

  function LoadingDelay() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LoadingDelay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoadingDelay.__proto__ || Object.getPrototypeOf(LoadingDelay)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isLoading: _this.props.check,
      isDelaying: _this.props.check
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LoadingDelay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.check) {
        this.timeout = setTimeout(function () {
          _this2.setState({
            isDelaying: false
          });
        }, this.props.delay);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if (nextProps.check && !this.state.isDelaying) {
        this.timeout = setTimeout(function () {
          _this3.setState({
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
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var _state = this.state,
          isLoading = _state.isLoading,
          isDelaying = _state.isDelaying;


      return children({ isLoading: isLoading, isDelaying: isDelaying });
    }
  }]);

  return LoadingDelay;
}(_react2.default.PureComponent);

LoadingDelay.propTypes = {
  check: _propTypes2.default.bool.isRequired,
  children: _propTypes2.default.func.isRequired,
  delay: _propTypes2.default.number.isRequired
};

exports.default = LoadingDelay;