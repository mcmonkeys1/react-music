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

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _bufferLoader = require('../utils/buffer-loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sampler = function (_Component) {
  _inherits(Sampler, _Component);

  function Sampler(props, context) {
    _classCallCheck(this, Sampler);

    var _this = _possibleConstructorReturn(this, (Sampler.__proto__ || Object.getPrototypeOf(Sampler)).call(this, props));

    _this.bufferLoaded = _this.bufferLoaded.bind(_this);
    _this.getSteps = _this.getSteps.bind(_this);
    _this.playStep = _this.playStep.bind(_this);

    _this.connectNode = context.audioContext.createGain();
    _this.connectNode.gain.value = props.gain;
    _this.connectNode.connect(context.connectNode);
    return _this;
  }

  _createClass(Sampler, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return _extends({}, this.context, {
        connectNode: this.connectNode
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.id = _uuid2.default.v1();

      var master = this.context.getMaster();
      master.instruments[this.id] = this.getSteps;
      master.buffers[this.id] = 1;

      var bufferLoader = new _bufferLoader.BufferLoader(this.context.audioContext, [this.props.sample], this.bufferLoaded);

      bufferLoader.load();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.connectNode.gain.value = nextProps.gain;
      if (this.props.sample !== nextProps.sample) {
        var master = this.context.getMaster();
        delete master.buffers[this.id];

        this.id = _uuid2.default.v1();
        master.buffers[this.id] = 1;

        var bufferLoader = new _bufferLoader.BufferLoader(this.context.audioContext, [nextProps.sample], this.bufferLoaded);

        bufferLoader.load();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var master = this.context.getMaster();

      delete master.buffers[this.id];
      delete master.instruments[this.id];
      this.connectNode.disconnect();
    }
  }, {
    key: 'getSteps',
    value: function getSteps(playbackTime) {
      var _this2 = this;

      var totalBars = this.context.getMaster().getMaxBars();
      var loopCount = totalBars / this.context.bars;

      var _loop = function _loop(i) {
        var barOffset = _this2.context.barInterval * _this2.context.bars * i / 1000;
        var stepInterval = _this2.context.barInterval / _this2.context.resolution;

        _this2.props.steps.forEach(function (step) {
          var stepValue = Array.isArray(step) ? step[0] : step;
          var time = barOffset + stepValue * stepInterval / 1000;

          _this2.context.scheduler.insert(playbackTime + time, _this2.playStep, {
            time: playbackTime,
            step: step
          });
        });
      };

      for (var i = 0; i < loopCount; i++) {
        _loop(i);
      }
    }
  }, {
    key: 'playStep',
    value: function playStep(e) {
      var source = this.context.audioContext.createBufferSource();
      source.buffer = this.buffer;
      if (source.detune) {
        if (Array.isArray(e.args.step)) {
          source.detune.value = (this.props.detune + e.args.step[1]) * 100;
        } else {
          source.detune.value = this.props.detune;
        }
      }
      source.connect(this.connectNode);

      if (this.props.busses) {
        var master = this.context.getMaster();
        this.props.busses.forEach(function (bus) {
          if (master.busses[bus]) {
            source.connect(master.busses[bus]);
          }
        });
      }

      source.start(e.args.playbackTime);
      this.context.scheduler.nextTick(e.args.playbackTime + this.buffer.duration, function () {
        source.disconnect();
      });
    }
  }, {
    key: 'bufferLoaded',
    value: function bufferLoaded(buffers) {
      this.buffer = buffers[0];
      var master = this.context.getMaster();
      delete master.buffers[this.id];
      this.context.bufferLoaded();
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

  return Sampler;
}(_react.Component);

Sampler.displayName = 'Sampler';
Sampler.propTypes = {
  busses: _propTypes2.default.array,
  children: _propTypes2.default.node,
  detune: _propTypes2.default.number,
  gain: _propTypes2.default.number,
  sample: _propTypes2.default.oneOfType([_propTypes2.default.string.isRequired, _propTypes2.default.instanceOf(ArrayBuffer).isRequired]),
  steps: _propTypes2.default.array.isRequired
};
Sampler.defaultProps = {
  detune: 0,
  gain: 0.5
};
Sampler.contextTypes = {
  audioContext: _propTypes2.default.object,
  bars: _propTypes2.default.number,
  barInterval: _propTypes2.default.number,
  bufferLoaded: _propTypes2.default.func,
  connectNode: _propTypes2.default.object,
  getMaster: _propTypes2.default.func,
  resolution: _propTypes2.default.number,
  scheduler: _propTypes2.default.object,
  tempo: _propTypes2.default.number
};
Sampler.childContextTypes = {
  audioContext: _propTypes2.default.object,
  bars: _propTypes2.default.number,
  barInterval: _propTypes2.default.number,
  bufferLoaded: _propTypes2.default.func,
  connectNode: _propTypes2.default.object,
  getMaster: _propTypes2.default.func,
  resolution: _propTypes2.default.number,
  scheduler: _propTypes2.default.object,
  tempo: _propTypes2.default.number
};
exports.default = Sampler;