'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint-disable no-restricted-syntax */


var Compressor = function (_Component) {
  _inherits(Compressor, _Component);

  function Compressor(props, context) {
    _classCallCheck(this, Compressor);

    var _this = _possibleConstructorReturn(this, (Compressor.__proto__ || Object.getPrototypeOf(Compressor)).call(this, props));

    _this.connectNode = context.audioContext.createDynamicsCompressor();
    _this.connectNode.connect(context.connectNode);

    _this.applyProps = _this.applyProps.bind(_this);
    return _this;
  }

  _createClass(Compressor, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return _extends({}, this.context, {
        connectNode: this.connectNode
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.applyProps(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.applyProps(nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.connectNode.disconnect();
    }
  }, {
    key: 'applyProps',
    value: function applyProps(props) {
      for (var prop in props) {
        if (this.connectNode[prop]) {
          this.connectNode[prop].value = props[prop];
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        null,
        this.props.children
      );
    }
  }]);

  return Compressor;
}(_react.Component);

Compressor.propTypes = {
  attack: _propTypes2.default.number,
  children: _propTypes2.default.node,
  knee: _propTypes2.default.number,
  ratio: _propTypes2.default.number,
  release: _propTypes2.default.number,
  threshold: _propTypes2.default.number
};
Compressor.defaultProps = {
  attack: 0.003,
  knee: 32,
  ratio: 12,
  release: 0.25,
  threshold: -24
};
Compressor.contextTypes = {
  audioContext: _propTypes2.default.object,
  connectNode: _propTypes2.default.object
};
Compressor.childContextTypes = {
  audioContext: _propTypes2.default.object,
  connectNode: _propTypes2.default.object
};
exports.default = Compressor;