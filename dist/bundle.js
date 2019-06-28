/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	if (true) {
	  module.exports = __webpack_require__(55);
	} else {
	  module.exports = require('./cjs/react.development.js');
	}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (false) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(46)();
	}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    Copyright (c) 2012 DinahMoe AB & Oskar Eriksson

	    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
	    files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
	    modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
	    is furnished to do so, subject to the following conditions:

	    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
	    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/
	/*global module*/
	(function() {

	    var userContext,
	        userInstance,
	        pipe = function(param, val) {
	            param.value = val;
	        },
	        Super = Object.create(null, {
	            activate: {
	                writable: true,
	                value: function(doActivate) {
	                    if (doActivate) {
	                        this.input.disconnect();
	                        this.input.connect(this.activateNode);
	                        if (this.activateCallback) {
	                            this.activateCallback(doActivate);
	                        }
	                    } else {
	                        this.input.disconnect();
	                        this.input.connect(this.output);
	                    }
	                }
	            },
	            bypass: {
	                get: function() {
	                    return this._bypass;
	                },
	                set: function(value) {
	                    if (this._lastBypassValue === value) {
	                        return;
	                    }
	                    this._bypass = value;
	                    this.activate(!value);
	                    this._lastBypassValue = value;
	                }
	            },
	            connect: {
	                value: function(target) {
	                    this.output.connect(target);
	                }
	            },
	            disconnect: {
	                value: function(target) {
	                    this.output.disconnect(target);
	                }
	            },
	            connectInOrder: {
	                value: function(nodeArray) {
	                    var i = nodeArray.length - 1;
	                    while (i--) {
	                        if (!nodeArray[i].connect) {
	                            return console.error("AudioNode.connectInOrder: TypeError: Not an AudioNode.", nodeArray[i]);
	                        }
	                        if (nodeArray[i + 1].input) {
	                            nodeArray[i].connect(nodeArray[i + 1].input);
	                        } else {
	                            nodeArray[i].connect(nodeArray[i + 1]);
	                        }
	                    }
	                }
	            },
	            getDefaults: {
	                value: function() {
	                    var result = {};
	                    for (var key in this.defaults) {
	                        result[key] = this.defaults[key].value;
	                    }
	                    return result;
	                }
	            },
	            automate: {
	                value: function(property, value, duration, startTime) {
	                    var start = startTime ? ~~(startTime / 1000) : userContext.currentTime,
	                        dur = duration ? ~~(duration / 1000) : 0,
	                        _is = this.defaults[property],
	                        param = this[property],
	                        method;

	                    if (param) {
	                        if (_is.automatable) {
	                            if (!duration) {
	                                method = "setValueAtTime";
	                            } else {
	                                method = "linearRampToValueAtTime";
	                                param.cancelScheduledValues(start);
	                                param.setValueAtTime(param.value, start);
	                            }
	                            param[method](value, dur + start);
	                        } else {
	                            param = value;
	                        }
	                    } else {
	                        console.error("Invalid Property for " + this.name);
	                    }
	                }
	            }
	        }),
	        FLOAT = "float",
	        BOOLEAN = "boolean",
	        STRING = "string",
	        INT = "int";

	    if (typeof module !== "undefined" && module.exports) {
	        module.exports = Tuna;
	    } else if (true) {
	        window.define("Tuna", definition);
	    } else {
	        window.Tuna = Tuna;
	    }

	    function definition() {
	        return Tuna;
	    }

	    function Tuna(context) {
	        if (!(this instanceof Tuna)) {
	            return new Tuna(context);
	        }

	        var _window = typeof window === 'undefined' ? {} : window;

	        if (!_window.AudioContext) {
	            _window.AudioContext = _window.webkitAudioContext;
	        }
	        if (!context) {
	            console.log("tuna.js: Missing audio context! Creating a new context for you.");
	            context = _window.AudioContext && (new _window.AudioContext());
	        }
	        if (!context) {
	            throw new Error("Tuna cannot initialize because this environment does not support web audio.");
	        }
	        connectify(context);
	        userContext = context;
	        userInstance = this;
	    }

	    function connectify(context) {
	        if (context.__connectified__ === true) return;

	        var gain = context.createGain(),
	            proto = Object.getPrototypeOf(Object.getPrototypeOf(gain)),
	            oconnect = proto.connect;

	        proto.connect = shimConnect;
	        context.__connectified__ = true; // Prevent overriding connect more than once

	        function shimConnect() {
	            var node = arguments[0];
	            arguments[0] = Super.isPrototypeOf ? (Super.isPrototypeOf(node) ? node.input : node) : (node.input || node);
	            oconnect.apply(this, arguments);
	            return node;
	        }
	    }

	    function dbToWAVolume(db) {
	        return Math.max(0, Math.round(100 * Math.pow(2, db / 6)) / 100);
	    }

	    function fmod(x, y) {
	        // http://kevin.vanzonneveld.net
	        // *     example 1: fmod(5.7, 1.3);
	        // *     returns 1: 0.5
	        var tmp, tmp2, p = 0,
	            pY = 0,
	            l = 0.0,
	            l2 = 0.0;

	        tmp = x.toExponential().match(/^.\.?(.*)e(.+)$/);
	        p = parseInt(tmp[2], 10) - (tmp[1] + "").length;
	        tmp = y.toExponential().match(/^.\.?(.*)e(.+)$/);
	        pY = parseInt(tmp[2], 10) - (tmp[1] + "").length;

	        if (pY > p) {
	            p = pY;
	        }

	        tmp2 = (x % y);

	        if (p < -100 || p > 20) {
	            // toFixed will give an out of bound error so we fix it like this:
	            l = Math.round(Math.log(tmp2) / Math.log(10));
	            l2 = Math.pow(10, l);

	            return (tmp2 / l2).toFixed(l - p) * l2;
	        } else {
	            return parseFloat(tmp2.toFixed(-p));
	        }
	    }

	    function sign(x) {
	        if (x === 0) {
	            return 1;
	        } else {
	            return Math.abs(x) / x;
	        }
	    }

	    function tanh(n) {
	        return (Math.exp(n) - Math.exp(-n)) / (Math.exp(n) + Math.exp(-n));
	    }

	    function initValue(userVal, defaultVal) {
	        return userVal === undefined ? defaultVal : userVal;
	    }

	    Tuna.prototype.Bitcrusher = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.bufferSize = properties.bufferSize || this.defaults.bufferSize.value;

	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.processor = userContext.createScriptProcessor(this.bufferSize, 1, 1);
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.processor);
	        this.processor.connect(this.output);

	        var phaser = 0,
	            last = 0,
	            input, output, step, i, length;
	        this.processor.onaudioprocess = function(e) {
	            input = e.inputBuffer.getChannelData(0),
	            output = e.outputBuffer.getChannelData(0),
	            step = Math.pow(1 / 2, this.bits);
	            length = input.length;
	            for (i = 0; i < length; i++) {
	                phaser += this.normfreq;
	                if (phaser >= 1.0) {
	                    phaser -= 1.0;
	                    last = step * Math.floor(input[i] / step + 0.5);
	                }
	                output[i] = last;
	            }
	        };

	        this.bits = properties.bits || this.defaults.bits.value;
	        this.normfreq = initValue(properties.normfreq, this.defaults.normfreq.value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Bitcrusher.prototype = Object.create(Super, {
	        name: {
	            value: "Bitcrusher"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                bits: {
	                    value: 4,
	                    min: 1,
	                    max: 16,
	                    automatable: false,
	                    type: INT
	                },
	                bufferSize: {
	                    value: 4096,
	                    min: 256,
	                    max: 16384,
	                    automatable: false,
	                    type: INT
	                },
	                bypass: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                normfreq: {
	                    value: 0.1,
	                    min: 0.0001,
	                    max: 1.0,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        bits: {
	            enumerable: true,
	            get: function() {
	                return this.processor.bits;
	            },
	            set: function(value) {
	                this.processor.bits = value;
	            }
	        },
	        normfreq: {
	            enumerable: true,
	            get: function() {
	                return this.processor.normfreq;
	            },
	            set: function(value) {
	                this.processor.normfreq = value;
	            }
	        }
	    });

	    Tuna.prototype.Cabinet = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.convolver = this.newConvolver(properties.impulsePath || "../impulses/impulse_guitar.wav");
	        this.makeupNode = userContext.createGain();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.convolver.input);
	        this.convolver.output.connect(this.makeupNode);
	        this.makeupNode.connect(this.output);

	        this.makeupGain = initValue(properties.makeupGain, this.defaults.makeupGain);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Cabinet.prototype = Object.create(Super, {
	        name: {
	            value: "Cabinet"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                makeupGain: {
	                    value: 1,
	                    min: 0,
	                    max: 20,
	                    automatable: true,
	                    type: FLOAT
	                },
	                bypass: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                }
	            }
	        },
	        makeupGain: {
	            enumerable: true,
	            get: function() {
	                return this.makeupNode.gain;
	            },
	            set: function(value) {
	                this.makeupNode.gain.value = value;
	            }
	        },
	        newConvolver: {
	            value: function(impulsePath) {
	                return new userInstance.Convolver({
	                    impulse: impulsePath,
	                    dryLevel: 0,
	                    wetLevel: 1
	                });
	            }
	        }
	    });

	    Tuna.prototype.Chorus = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.attenuator = this.activateNode = userContext.createGain();
	        this.splitter = userContext.createChannelSplitter(2);
	        this.delayL = userContext.createDelay();
	        this.delayR = userContext.createDelay();
	        this.feedbackGainNodeLR = userContext.createGain();
	        this.feedbackGainNodeRL = userContext.createGain();
	        this.merger = userContext.createChannelMerger(2);
	        this.output = userContext.createGain();

	        this.lfoL = new userInstance.LFO({
	            target: this.delayL.delayTime,
	            callback: pipe
	        });
	        this.lfoR = new userInstance.LFO({
	            target: this.delayR.delayTime,
	            callback: pipe
	        });

	        this.input.connect(this.attenuator);
	        this.attenuator.connect(this.output);
	        this.attenuator.connect(this.splitter);
	        this.splitter.connect(this.delayL, 0);
	        this.splitter.connect(this.delayR, 1);
	        this.delayL.connect(this.feedbackGainNodeLR);
	        this.delayR.connect(this.feedbackGainNodeRL);
	        this.feedbackGainNodeLR.connect(this.delayR);
	        this.feedbackGainNodeRL.connect(this.delayL);
	        this.delayL.connect(this.merger, 0, 0);
	        this.delayR.connect(this.merger, 0, 1);
	        this.merger.connect(this.output);

	        this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
	        this.rate = initValue(properties.rate, this.defaults.rate.value);
	        this.delay = initValue(properties.delay, this.defaults.delay.value);
	        this.depth = initValue(properties.depth, this.defaults.depth.value);
	        this.lfoR.phase = Math.PI / 2;
	        this.attenuator.gain.value = 0.6934; // 1 / (10 ^ (((20 * log10(3)) / 3) / 20))
	        this.lfoL.activate(true);
	        this.lfoR.activate(true);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Chorus.prototype = Object.create(Super, {
	        name: {
	            value: "Chorus"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                feedback: {
	                    value: 0.4,
	                    min: 0,
	                    max: 0.95,
	                    automatable: false,
	                    type: FLOAT
	                },
	                delay: {
	                    value: 0.0045,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                depth: {
	                    value: 0.7,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                rate: {
	                    value: 1.5,
	                    min: 0,
	                    max: 8,
	                    automatable: false,
	                    type: FLOAT
	                },
	                bypass: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                }
	            }
	        },
	        delay: {
	            enumerable: true,
	            get: function() {
	                return this._delay;
	            },
	            set: function(value) {
	                this._delay = 0.0002 * (Math.pow(10, value) * 2);
	                this.lfoL.offset = this._delay;
	                this.lfoR.offset = this._delay;
	                this._depth = this._depth;
	            }
	        },
	        depth: {
	            enumerable: true,
	            get: function() {
	                return this._depth;
	            },
	            set: function(value) {
	                this._depth = value;
	                this.lfoL.oscillation = this._depth * this._delay;
	                this.lfoR.oscillation = this._depth * this._delay;
	            }
	        },
	        feedback: {
	            enumerable: true,
	            get: function() {
	                return this._feedback;
	            },
	            set: function(value) {
	                this._feedback = value;
	                this.feedbackGainNodeLR.gain.value = this._feedback;
	                this.feedbackGainNodeRL.gain.value = this._feedback;
	            }
	        },
	        rate: {
	            enumerable: true,
	            get: function() {
	                return this._rate;
	            },
	            set: function(value) {
	                this._rate = value;
	                this.lfoL.frequency = this._rate;
	                this.lfoR.frequency = this._rate;
	            }
	        }
	    });

	    Tuna.prototype.Compressor = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.compNode = this.activateNode = userContext.createDynamicsCompressor();
	        this.makeupNode = userContext.createGain();
	        this.output = userContext.createGain();

	        this.compNode.connect(this.makeupNode);
	        this.makeupNode.connect(this.output);

	        this.automakeup = initValue(properties.automakeup, this.defaults.automakeup.value);
	        this.makeupGain = initValue(properties.makeupGain, this.defaults.makeupGain.value);
	        this.threshold = initValue(properties.threshold, this.defaults.threshold.value);
	        this.release = initValue(properties.release, this.defaults.release.value);
	        this.attack = initValue(properties.attack, this.defaults.attack.value);
	        this.ratio = properties.ratio || this.defaults.ratio.value;
	        this.knee = initValue(properties.knee, this.defaults.knee.value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Compressor.prototype = Object.create(Super, {
	        name: {
	            value: "Compressor"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                threshold: {
	                    value: -20,
	                    min: -60,
	                    max: 0,
	                    automatable: true,
	                    type: FLOAT
	                },
	                release: {
	                    value: 250,
	                    min: 10,
	                    max: 2000,
	                    automatable: true,
	                    type: FLOAT
	                },
	                makeupGain: {
	                    value: 1,
	                    min: 1,
	                    max: 100,
	                    automatable: true,
	                    type: FLOAT
	                },
	                attack: {
	                    value: 1,
	                    min: 0,
	                    max: 1000,
	                    automatable: true,
	                    type: FLOAT
	                },
	                ratio: {
	                    value: 4,
	                    min: 1,
	                    max: 50,
	                    automatable: true,
	                    type: FLOAT
	                },
	                knee: {
	                    value: 5,
	                    min: 0,
	                    max: 40,
	                    automatable: true,
	                    type: FLOAT
	                },
	                automakeup: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                bypass: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                }
	            }
	        },
	        computeMakeup: {
	            value: function() {
	                var magicCoefficient = 4, // raise me if the output is too hot
	                    c = this.compNode;
	                return -(c.threshold.value - c.threshold.value / c.ratio.value) / magicCoefficient;
	            }
	        },
	        automakeup: {
	            enumerable: true,
	            get: function() {
	                return this._automakeup;
	            },
	            set: function(value) {
	                this._automakeup = value;
	                if (this._automakeup) this.makeupGain = this.computeMakeup();
	            }
	        },
	        threshold: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.threshold;
	            },
	            set: function(value) {
	                this.compNode.threshold.value = value;
	                if (this._automakeup) this.makeupGain = this.computeMakeup();
	            }
	        },
	        ratio: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.ratio;
	            },
	            set: function(value) {
	                this.compNode.ratio.value = value;
	                if (this._automakeup) this.makeupGain = this.computeMakeup();
	            }
	        },
	        knee: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.knee;
	            },
	            set: function(value) {
	                this.compNode.knee.value = value;
	                if (this._automakeup) this.makeupGain = this.computeMakeup();
	            }
	        },
	        attack: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.attack;
	            },
	            set: function(value) {
	                this.compNode.attack.value = value / 1000;
	            }
	        },
	        release: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.release;
	            },
	            set: function(value) {
	                this.compNode.release.value = value / 1000;
	            }
	        },
	        makeupGain: {
	            enumerable: true,
	            get: function() {
	                return this.makeupNode.gain;
	            },
	            set: function(value) {
	                this.makeupNode.gain.value = dbToWAVolume(value);
	            }
	        }
	    });

	    Tuna.prototype.Convolver = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.convolver = userContext.createConvolver();
	        this.dry = userContext.createGain();
	        this.filterLow = userContext.createBiquadFilter();
	        this.filterHigh = userContext.createBiquadFilter();
	        this.wet = userContext.createGain();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.filterLow);
	        this.activateNode.connect(this.dry);
	        this.filterLow.connect(this.filterHigh);
	        this.filterHigh.connect(this.convolver);
	        this.convolver.connect(this.wet);
	        this.wet.connect(this.output);
	        this.dry.connect(this.output);

	        this.dryLevel = initValue(properties.dryLevel, this.defaults.dryLevel.value);
	        this.wetLevel = initValue(properties.wetLevel, this.defaults.wetLevel.value);
	        this.highCut = properties.highCut || this.defaults.highCut.value;
	        this.buffer = properties.impulse || "../impulses/ir_rev_short.wav";
	        this.lowCut = properties.lowCut || this.defaults.lowCut.value;
	        this.level = initValue(properties.level, this.defaults.level.value);
	        this.filterHigh.type = "lowpass";
	        this.filterLow.type = "highpass";
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Convolver.prototype = Object.create(Super, {
	        name: {
	            value: "Convolver"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                highCut: {
	                    value: 22050,
	                    min: 20,
	                    max: 22050,
	                    automatable: true,
	                    type: FLOAT
	                },
	                lowCut: {
	                    value: 20,
	                    min: 20,
	                    max: 22050,
	                    automatable: true,
	                    type: FLOAT
	                },
	                dryLevel: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                },
	                wetLevel: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                },
	                level: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                }
	            }
	        },
	        lowCut: {
	            get: function() {
	                return this.filterLow.frequency;
	            },
	            set: function(value) {
	                this.filterLow.frequency.value = value;
	            }
	        },
	        highCut: {
	            get: function() {
	                return this.filterHigh.frequency;
	            },
	            set: function(value) {
	                this.filterHigh.frequency.value = value;
	            }
	        },
	        level: {
	            get: function() {
	                return this.output.gain;
	            },
	            set: function(value) {
	                this.output.gain.value = value;
	            }
	        },
	        dryLevel: {
	            get: function() {
	                return this.dry.gain;
	            },
	            set: function(value) {
	                this.dry.gain.value = value;
	            }
	        },
	        wetLevel: {
	            get: function() {
	                return this.wet.gain;
	            },
	            set: function(value) {
	                this.wet.gain.value = value;
	            }
	        },
	        buffer: {
	            enumerable: false,
	            get: function() {
	                return this.convolver.buffer;
	            },
	            set: function(impulse) {
	                var convolver = this.convolver,
	                    xhr = new XMLHttpRequest();
	                if (!impulse) {
	                    console.log("Tuna.Convolver.setBuffer: Missing impulse path!");
	                    return;
	                }
	                xhr.open("GET", impulse, true);
	                xhr.responseType = "arraybuffer";
	                xhr.onreadystatechange = function() {
	                    if (xhr.readyState === 4) {
	                        if (xhr.status < 300 && xhr.status > 199 || xhr.status === 302) {
	                            userContext.decodeAudioData(xhr.response, function(buffer) {
	                                convolver.buffer = buffer;
	                            }, function(e) {
	                                if (e) console.log("Tuna.Convolver.setBuffer: Error decoding data" + e);
	                            });
	                        }
	                    }
	                };
	                xhr.send(null);
	            }
	        }
	    });

	    Tuna.prototype.Delay = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.dry = userContext.createGain();
	        this.wet = userContext.createGain();
	        this.filter = userContext.createBiquadFilter();
	        this.delay = userContext.createDelay(10);
	        this.feedbackNode = userContext.createGain();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.delay);
	        this.activateNode.connect(this.dry);
	        this.delay.connect(this.filter);
	        this.filter.connect(this.feedbackNode);
	        this.feedbackNode.connect(this.delay);
	        this.feedbackNode.connect(this.wet);
	        this.wet.connect(this.output);
	        this.dry.connect(this.output);

	        this.delayTime = properties.delayTime || this.defaults.delayTime.value;
	        this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
	        this.wetLevel = initValue(properties.wetLevel, this.defaults.wetLevel.value);
	        this.dryLevel = initValue(properties.dryLevel, this.defaults.dryLevel.value);
	        this.cutoff = properties.cutoff || this.defaults.cutoff.value;
	        this.filter.type = "lowpass";
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Delay.prototype = Object.create(Super, {
	        name: {
	            value: "Delay"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                delayTime: {
	                    value: 100,
	                    min: 20,
	                    max: 1000,
	                    automatable: false,
	                    type: FLOAT
	                },
	                feedback: {
	                    value: 0.45,
	                    min: 0,
	                    max: 0.9,
	                    automatable: true,
	                    type: FLOAT
	                },
	                cutoff: {
	                    value: 20000,
	                    min: 20,
	                    max: 20000,
	                    automatable: true,
	                    type: FLOAT
	                },
	                wetLevel: {
	                    value: 0.5,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                },
	                dryLevel: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                }
	            }
	        },
	        delayTime: {
	            enumerable: true,
	            get: function() {
	                return this.delay.delayTime;
	            },
	            set: function(value) {
	                this.delay.delayTime.value = value / 1000;
	            }
	        },
	        wetLevel: {
	            enumerable: true,
	            get: function() {
	                return this.wet.gain;
	            },
	            set: function(value) {
	                this.wet.gain.value = value;
	            }
	        },
	        dryLevel: {
	            enumerable: true,
	            get: function() {
	                return this.dry.gain;
	            },
	            set: function(value) {
	                this.dry.gain.value = value;
	            }
	        },
	        feedback: {
	            enumerable: true,
	            get: function() {
	                return this.feedbackNode.gain;
	            },
	            set: function(value) {
	                this.feedbackNode.gain.value = value;
	            }
	        },
	        cutoff: {
	            enumerable: true,
	            get: function() {
	                return this.filter.frequency;
	            },
	            set: function(value) {
	                this.filter.frequency.value = value;
	            }
	        }
	    });

	    Tuna.prototype.Filter = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.filter = userContext.createBiquadFilter();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.filter);
	        this.filter.connect(this.output);

	        this.frequency = properties.frequency || this.defaults.frequency.value;
	        this.Q = properties.resonance || this.defaults.Q.value;
	        this.filterType = initValue(properties.filterType, this.defaults.filterType.value);
	        this.gain = initValue(properties.gain, this.defaults.gain.value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Filter.prototype = Object.create(Super, {
	        name: {
	            value: "Filter"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                frequency: {
	                    value: 800,
	                    min: 20,
	                    max: 22050,
	                    automatable: true,
	                    type: FLOAT
	                },
	                Q: {
	                    value: 1,
	                    min: 0.001,
	                    max: 100,
	                    automatable: true,
	                    type: FLOAT
	                },
	                gain: {
	                    value: 0,
	                    min: -40,
	                    max: 40,
	                    automatable: true,
	                    type: FLOAT
	                },
	                bypass: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                filterType: {
	                    value: "lowpass",
	                    automatable: false,
	                    type: STRING
	                }
	            }
	        },
	        filterType: {
	            enumerable: true,
	            get: function() {
	                return this.filter.type;
	            },
	            set: function(value) {
	                this.filter.type = value;
	            }
	        },
	        Q: {
	            enumerable: true,
	            get: function() {
	                return this.filter.Q;
	            },
	            set: function(value) {
	                this.filter.Q.value = value;
	            }
	        },
	        gain: {
	            enumerable: true,
	            get: function() {
	                return this.filter.gain;
	            },
	            set: function(value) {
	                this.filter.gain.value = value;
	            }
	        },
	        frequency: {
	            enumerable: true,
	            get: function() {
	                return this.filter.frequency;
	            },
	            set: function(value) {
	                this.filter.frequency.value = value;
	            }
	        }
	    });

	    Tuna.prototype.MoogFilter = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.bufferSize = properties.bufferSize || this.defaults.bufferSize.value;

	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.processor = userContext.createScriptProcessor(this.bufferSize, 1, 1);
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.processor);
	        this.processor.connect(this.output);

	        var in1, in2, in3, in4, out1, out2, out3, out4;
	        in1 = in2 = in3 = in4 = out1 = out2 = out3 = out4 = 0.0;
	        var input, output, f, fb, i, length, inputFactor;
	        this.processor.onaudioprocess = function(e) {
	            input = e.inputBuffer.getChannelData(0),
	                output = e.outputBuffer.getChannelData(0),
	                f = this.cutoff * 1.16,
	                inputFactor = 0.35013 * (f * f) * (f * f);
	            fb = this.resonance * (1.0 - 0.15 * f * f);
	            length = input.length;
	            for (i = 0; i < length; i++) {
	                input[i] -= out4 * fb;
	                input[i] *= inputFactor;
	                out1 = input[i] + 0.3 * in1 + (1 - f) * out1; // Pole 1
	                in1 = input[i];
	                out2 = out1 + 0.3 * in2 + (1 - f) * out2; // Pole 2
	                in2 = out1;
	                out3 = out2 + 0.3 * in3 + (1 - f) * out3; // Pole 3
	                in3 = out2;
	                out4 = out3 + 0.3 * in4 + (1 - f) * out4; // Pole 4
	                in4 = out3;
	                output[i] = out4;
	            }
	        };

	        this.cutoff = initValue(properties.cutoff, this.defaults.cutoff.value);
	        this.resonance = initValue(properties.resonance, this.defaults.resonance.value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.MoogFilter.prototype = Object.create(Super, {
	        name: {
	            value: "MoogFilter"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                bufferSize: {
	                    value: 4096,
	                    min: 256,
	                    max: 16384,
	                    automatable: false,
	                    type: INT
	                },
	                bypass: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                cutoff: {
	                    value: 0.065,
	                    min: 0.0001,
	                    max: 1.0,
	                    automatable: false,
	                    type: FLOAT
	                },
	                resonance: {
	                    value: 3.5,
	                    min: 0.0,
	                    max: 4.0,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        cutoff: {
	            enumerable: true,
	            get: function() {
	                return this.processor.cutoff;
	            },
	            set: function(value) {
	                this.processor.cutoff = value;
	            }
	        },
	        resonance: {
	            enumerable: true,
	            get: function() {
	                return this.processor.resonance;
	            },
	            set: function(value) {
	                this.processor.resonance = value;
	            }
	        }
	    });

	    Tuna.prototype.Overdrive = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.inputDrive = userContext.createGain();
	        this.waveshaper = userContext.createWaveShaper();
	        this.outputDrive = userContext.createGain();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.inputDrive);
	        this.inputDrive.connect(this.waveshaper);
	        this.waveshaper.connect(this.outputDrive);
	        this.outputDrive.connect(this.output);

	        this.ws_table = new Float32Array(this.k_nSamples);
	        this.drive = initValue(properties.drive, this.defaults.drive.value);
	        this.outputGain = initValue(properties.outputGain, this.defaults.outputGain.value);
	        this.curveAmount = initValue(properties.curveAmount, this.defaults.curveAmount.value);
	        this.algorithmIndex = initValue(properties.algorithmIndex, this.defaults.algorithmIndex.value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Overdrive.prototype = Object.create(Super, {
	        name: {
	            value: "Overdrive"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                drive: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT,
	                    scaled: true
	                },
	                outputGain: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT,
	                    scaled: true
	                },
	                curveAmount: {
	                    value: 0.725,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                algorithmIndex: {
	                    value: 0,
	                    min: 0,
	                    max: 5,
	                    automatable: false,
	                    type: INT
	                }
	            }
	        },
	        k_nSamples: {
	            value: 8192
	        },
	        drive: {
	            get: function() {
	                return this.inputDrive.gain;
	            },
	            set: function(value) {
	                this._drive = value;
	            }
	        },
	        curveAmount: {
	            get: function() {
	                return this._curveAmount;
	            },
	            set: function(value) {
	                this._curveAmount = value;
	                if (this._algorithmIndex === undefined) {
	                    this._algorithmIndex = 0;
	                }
	                this.waveshaperAlgorithms[this._algorithmIndex](this._curveAmount, this.k_nSamples, this.ws_table);
	                this.waveshaper.curve = this.ws_table;
	            }
	        },
	        outputGain: {
	            get: function() {
	                return this.outputDrive.gain;
	            },
	            set: function(value) {
	                this._outputGain = dbToWAVolume(value);
	            }
	        },
	        algorithmIndex: {
	            get: function() {
	                return this._algorithmIndex;
	            },
	            set: function(value) {
	                this._algorithmIndex = value;
	                this.curveAmount = this._curveAmount;
	            }
	        },
	        waveshaperAlgorithms: {
	            value: [
	                function(amount, n_samples, ws_table) {
	                    amount = Math.min(amount, 0.9999);
	                    var k = 2 * amount / (1 - amount),
	                        i, x;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        ws_table[i] = (1 + k) * x / (1 + k * Math.abs(x));
	                    }
	                },
	                function(amount, n_samples, ws_table) {
	                    var i, x, y;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        y = ((0.5 * Math.pow((x + 1.4), 2)) - 1) * y >= 0 ? 5.8 : 1.2;
	                        ws_table[i] = tanh(y);
	                    }
	                },
	                function(amount, n_samples, ws_table) {
	                    var i, x, y, a = 1 - amount;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        y = x < 0 ? -Math.pow(Math.abs(x), a + 0.04) : Math.pow(x, a);
	                        ws_table[i] = tanh(y * 2);
	                    }
	                },
	                function(amount, n_samples, ws_table) {
	                    var i, x, y, abx, a = 1 - amount > 0.99 ? 0.99 : 1 - amount;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        abx = Math.abs(x);
	                        if (abx < a) y = abx;
	                        else if (abx > a) y = a + (abx - a) / (1 + Math.pow((abx - a) / (1 - a), 2));
	                        else if (abx > 1) y = abx;
	                        ws_table[i] = sign(x) * y * (1 / ((a + 1) / 2));
	                    }
	                },
	                function(amount, n_samples, ws_table) { // fixed curve, amount doesn't do anything, the distortion is just from the drive
	                    var i, x;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        if (x < -0.08905) {
	                            ws_table[i] = (-3 / 4) * (1 - (Math.pow((1 - (Math.abs(x) - 0.032857)), 12)) + (1 / 3) * (Math.abs(x) - 0.032847)) + 0.01;
	                        } else if (x >= -0.08905 && x < 0.320018) {
	                            ws_table[i] = (-6.153 * (x * x)) + 3.9375 * x;
	                        } else {
	                            ws_table[i] = 0.630035;
	                        }
	                    }
	                },
	                function(amount, n_samples, ws_table) {
	                    var a = 2 + Math.round(amount * 14),
	                        // we go from 2 to 16 bits, keep in mind for the UI
	                        bits = Math.round(Math.pow(2, a - 1)),
	                        // real number of quantization steps divided by 2
	                        i, x;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        ws_table[i] = Math.round(x * bits) / bits;
	                    }
	                }
	            ]
	        }
	    });

	    Tuna.prototype.Phaser = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.splitter = this.activateNode = userContext.createChannelSplitter(2);
	        this.filtersL = [];
	        this.filtersR = [];
	        this.feedbackGainNodeL = userContext.createGain();
	        this.feedbackGainNodeR = userContext.createGain();
	        this.merger = userContext.createChannelMerger(2);
	        this.filteredSignal = userContext.createGain();
	        this.output = userContext.createGain();
	        this.lfoL = new userInstance.LFO({
	            target: this.filtersL,
	            callback: this.callback
	        });
	        this.lfoR = new userInstance.LFO({
	            target: this.filtersR,
	            callback: this.callback
	        });

	        var i = this.stage;
	        while (i--) {
	            this.filtersL[i] = userContext.createBiquadFilter();
	            this.filtersR[i] = userContext.createBiquadFilter();
	            this.filtersL[i].type = "allpass";
	            this.filtersR[i].type = "allpass";
	        }
	        this.input.connect(this.splitter);
	        this.input.connect(this.output);
	        this.splitter.connect(this.filtersL[0], 0, 0);
	        this.splitter.connect(this.filtersR[0], 1, 0);
	        this.connectInOrder(this.filtersL);
	        this.connectInOrder(this.filtersR);
	        this.filtersL[this.stage - 1].connect(this.feedbackGainNodeL);
	        this.filtersL[this.stage - 1].connect(this.merger, 0, 0);
	        this.filtersR[this.stage - 1].connect(this.feedbackGainNodeR);
	        this.filtersR[this.stage - 1].connect(this.merger, 0, 1);
	        this.feedbackGainNodeL.connect(this.filtersL[0]);
	        this.feedbackGainNodeR.connect(this.filtersR[0]);
	        this.merger.connect(this.output);

	        this.rate = initValue(properties.rate, this.defaults.rate.value);
	        this.baseModulationFrequency = properties.baseModulationFrequency || this.defaults.baseModulationFrequency.value;
	        this.depth = initValue(properties.depth, this.defaults.depth.value);
	        this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
	        this.stereoPhase = initValue(properties.stereoPhase, this.defaults.stereoPhase.value);

	        this.lfoL.activate(true);
	        this.lfoR.activate(true);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Phaser.prototype = Object.create(Super, {
	        name: {
	            value: "Phaser"
	        },
	        stage: {
	            value: 4
	        },
	        defaults: {
	            writable: true,
	            value: {
	                rate: {
	                    value: 0.1,
	                    min: 0,
	                    max: 8,
	                    automatable: false,
	                    type: FLOAT
	                },
	                depth: {
	                    value: 0.6,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                feedback: {
	                    value: 0.7,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                stereoPhase: {
	                    value: 40,
	                    min: 0,
	                    max: 180,
	                    automatable: false,
	                    type: FLOAT
	                },
	                baseModulationFrequency: {
	                    value: 700,
	                    min: 500,
	                    max: 1500,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        callback: {
	            value: function(filters, value) {
	                for (var stage = 0; stage < 4; stage++) {
	                    filters[stage].frequency.value = value;
	                }
	            }
	        },
	        depth: {
	            get: function() {
	                return this._depth;
	            },
	            set: function(value) {
	                this._depth = value;
	                this.lfoL.oscillation = this._baseModulationFrequency * this._depth;
	                this.lfoR.oscillation = this._baseModulationFrequency * this._depth;
	            }
	        },
	        rate: {
	            get: function() {
	                return this._rate;
	            },
	            set: function(value) {
	                this._rate = value;
	                this.lfoL.frequency = this._rate;
	                this.lfoR.frequency = this._rate;
	            }
	        },
	        baseModulationFrequency: {
	            enumerable: true,
	            get: function() {
	                return this._baseModulationFrequency;
	            },
	            set: function(value) {
	                this._baseModulationFrequency = value;
	                this.lfoL.offset = this._baseModulationFrequency;
	                this.lfoR.offset = this._baseModulationFrequency;
	                this._depth = this._depth;
	            }
	        },
	        feedback: {
	            get: function() {
	                return this._feedback;
	            },
	            set: function(value) {
	                this._feedback = value;
	                this.feedbackGainNodeL.gain.value = this._feedback;
	                this.feedbackGainNodeR.gain.value = this._feedback;
	            }
	        },
	        stereoPhase: {
	            get: function() {
	                return this._stereoPhase;
	            },
	            set: function(value) {
	                this._stereoPhase = value;
	                var newPhase = this.lfoL._phase + this._stereoPhase * Math.PI / 180;
	                newPhase = fmod(newPhase, 2 * Math.PI);
	                this.lfoR._phase = newPhase;
	            }
	        }
	    });

	    Tuna.prototype.PingPongDelay = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.wetLevel = userContext.createGain();
	        this.stereoToMonoMix = userContext.createGain();
	        this.feedbackLevel = userContext.createGain();
	        this.output = userContext.createGain();
	        this.delayLeft = userContext.createDelay(10);
	        this.delayRight = userContext.createDelay(10);

	        this.activateNode = userContext.createGain();
	        this.splitter = userContext.createChannelSplitter(2);
	        this.merger = userContext.createChannelMerger(2);

	        this.activateNode.connect(this.splitter);
	        this.splitter.connect(this.stereoToMonoMix, 0, 0);
	        this.splitter.connect(this.stereoToMonoMix, 1, 0);
	        this.stereoToMonoMix.gain.value = .5;
	        this.stereoToMonoMix.connect(this.wetLevel);
	        this.wetLevel.connect(this.delayLeft);
	        this.feedbackLevel.connect(this.delayLeft);
	        this.delayLeft.connect(this.delayRight);
	        this.delayRight.connect(this.feedbackLevel);
	        this.delayLeft.connect(this.merger, 0, 0);
	        this.delayRight.connect(this.merger, 0, 1);
	        this.merger.connect(this.output);
	        this.activateNode.connect(this.output);

	        this.delayTimeLeft = properties.delayTimeLeft !== undefined ? properties.delayTimeLeft : this.defaults.delayTimeLeft.value;
	        this.delayTimeRight = properties.delayTimeRight !== undefined ? properties.delayTimeRight : this.defaults.delayTimeRight.value;
	        this.feedbackLevel.gain.value = properties.feedback !== undefined ? properties.feedback : this.defaults.feedback.value;
	        this.wetLevel.gain.value = properties.wetLevel !== undefined ? properties.wetLevel : this.defaults.wetLevel.value;
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.PingPongDelay.prototype = Object.create(Super, {
	        name: {
	            value: "PingPongDelay"
	        },
	        delayTimeLeft: {
	            enumerable: true,
	            get: function() {
	                return this._delayTimeLeft;
	            },
	            set: function(value) {
	                this._delayTimeLeft = value;
	                this.delayLeft.delayTime.value = value / 1000;
	            }
	        },
	        delayTimeRight: {
	            enumerable: true,
	            get: function() {
	                return this._delayTimeRight;
	            },
	            set: function(value) {
	                this._delayTimeRight = value;
	                this.delayRight.delayTime.value = value / 1000;
	            }
	        },
	        defaults: {
	            writable: true,
	            value: {
	                delayTimeLeft: {
	                    value: 200,
	                    min: 1,
	                    max: 10000,
	                    automatable: false,
	                    type: INT
	                },
	                delayTimeRight: {
	                    value: 400,
	                    min: 1,
	                    max: 10000,
	                    automatable: false,
	                    type: INT
	                },
	                feedback: {
	                    value: 0.3,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                wetLevel: {
	                    value: 0.5,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        }
	    });

	    Tuna.prototype.Tremolo = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.splitter = this.activateNode = userContext.createChannelSplitter(
	                2),
	            this.amplitudeL = userContext.createGain(),
	            this.amplitudeR = userContext.createGain(),
	            this.merger = userContext.createChannelMerger(2),
	            this.output = userContext.createGain();
	        this.lfoL = new userInstance.LFO({
	            target: this.amplitudeL.gain,
	            callback: pipe
	        });
	        this.lfoR = new userInstance.LFO({
	            target: this.amplitudeR.gain,
	            callback: pipe
	        });

	        this.input.connect(this.splitter);
	        this.splitter.connect(this.amplitudeL, 0);
	        this.splitter.connect(this.amplitudeR, 1);
	        this.amplitudeL.connect(this.merger, 0, 0);
	        this.amplitudeR.connect(this.merger, 0, 1);
	        this.merger.connect(this.output);

	        this.rate = properties.rate || this.defaults.rate.value;
	        this.intensity = initValue(properties.intensity, this.defaults.intensity.value);
	        this.stereoPhase = initValue(properties.stereoPhase, this.defaults.stereoPhase.value);

	        this.lfoL.offset = 1 - (this.intensity / 2);
	        this.lfoR.offset = 1 - (this.intensity / 2);
	        this.lfoL.phase = this.stereoPhase * Math.PI / 180;

	        this.lfoL.activate(true);
	        this.lfoR.activate(true);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Tremolo.prototype = Object.create(Super, {
	        name: {
	            value: "Tremolo"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                intensity: {
	                    value: 0.3,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                stereoPhase: {
	                    value: 0,
	                    min: 0,
	                    max: 180,
	                    automatable: false,
	                    type: FLOAT
	                },
	                rate: {
	                    value: 5,
	                    min: 0.1,
	                    max: 11,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        intensity: {
	            enumerable: true,
	            get: function() {
	                return this._intensity;
	            },
	            set: function(value) {
	                this._intensity = value;
	                this.lfoL.offset = 1 - this._intensity / 2;
	                this.lfoR.offset = 1 - this._intensity / 2;
	                this.lfoL.oscillation = this._intensity;
	                this.lfoR.oscillation = this._intensity;
	            }
	        },
	        rate: {
	            enumerable: true,
	            get: function() {
	                return this._rate;
	            },
	            set: function(value) {
	                this._rate = value;
	                this.lfoL.frequency = this._rate;
	                this.lfoR.frequency = this._rate;
	            }
	        },
	        stereoPhase: {
	            enumerable: true,
	            get: function() {
	                return this._stereoPhase;
	            },
	            set: function(value) {
	                this._stereoPhase = value;
	                var newPhase = this.lfoL._phase + this._stereoPhase * Math.PI / 180;
	                newPhase = fmod(newPhase, 2 * Math.PI);
	                this.lfoR.phase = newPhase;
	            }
	        }
	    });

	    Tuna.prototype.WahWah = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.envelopeFollower = new userInstance.EnvelopeFollower({
	            target: this,
	            callback: function(context, value) {
	                context.sweep = value;
	            }
	        });
	        this.filterBp = userContext.createBiquadFilter();
	        this.filterPeaking = userContext.createBiquadFilter();
	        this.output = userContext.createGain();

	        //Connect AudioNodes
	        this.activateNode.connect(this.filterBp);
	        this.filterBp.connect(this.filterPeaking);
	        this.filterPeaking.connect(this.output);

	        //Set Properties
	        this.init();
	        this.automode = initValue(properties.enableAutoMode, this.defaults.automode.value);
	        this.resonance = properties.resonance || this.defaults.resonance.value;
	        this.sensitivity = initValue(properties.sensitivity, this.defaults.sensitivity.value);
	        this.baseFrequency = initValue(properties.baseFrequency, this.defaults.baseFrequency.value);
	        this.excursionOctaves = properties.excursionOctaves || this.defaults.excursionOctaves.value;
	        this.sweep = initValue(properties.sweep, this.defaults.sweep.value);

	        this.activateNode.gain.value = 2;
	        this.envelopeFollower.activate(true);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.WahWah.prototype = Object.create(Super, {
	        name: {
	            value: "WahWah"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                automode: {
	                    value: true,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                baseFrequency: {
	                    value: 0.5,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                excursionOctaves: {
	                    value: 2,
	                    min: 1,
	                    max: 6,
	                    automatable: false,
	                    type: FLOAT
	                },
	                sweep: {
	                    value: 0.2,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                resonance: {
	                    value: 10,
	                    min: 1,
	                    max: 100,
	                    automatable: false,
	                    type: FLOAT
	                },
	                sensitivity: {
	                    value: 0.5,
	                    min: -1,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        activateCallback: {
	            value: function(value) {
	                this.automode = value;
	            }
	        },
	        automode: {
	            get: function() {
	                return this._automode;
	            },
	            set: function(value) {
	                this._automode = value;
	                if (value) {
	                    this.activateNode.connect(this.envelopeFollower.input);
	                    this.envelopeFollower.activate(true);
	                } else {
	                    this.envelopeFollower.activate(false);
	                    this.activateNode.disconnect();
	                    this.activateNode.connect(this.filterBp);
	                }
	            }
	        },
	        filterFreqTimeout: {
	            value: 0
	        },
	        setFilterFreq: {
	            value: function() {
	                try {
	                    this.filterBp.frequency.value = Math.min(22050, this._baseFrequency + this._excursionFrequency * this._sweep);
	                    this.filterPeaking.frequency.value = Math.min(22050, this._baseFrequency + this._excursionFrequency * this._sweep);
	                } catch (e) {
	                    clearTimeout(this.filterFreqTimeout);
	                    //put on the next cycle to let all init properties be set
	                    this.filterFreqTimeout = setTimeout(function() {
	                        this.setFilterFreq();
	                    }.bind(this), 0);
	                }
	            }
	        },
	        sweep: {
	            enumerable: true,
	            get: function() {
	                return this._sweep.value;
	            },
	            set: function(value) {
	                this._sweep = Math.pow(value > 1 ? 1 : value < 0 ? 0 : value, this._sensitivity);
	                this.setFilterFreq();
	            }
	        },
	        baseFrequency: {
	            enumerable: true,
	            get: function() {
	                return this._baseFrequency;
	            },
	            set: function(value) {
	                this._baseFrequency = 50 * Math.pow(10, value * 2);
	                this._excursionFrequency = Math.min(userContext.sampleRate / 2, this.baseFrequency * Math.pow(2, this._excursionOctaves));
	                this.setFilterFreq();
	            }
	        },
	        excursionOctaves: {
	            enumerable: true,
	            get: function() {
	                return this._excursionOctaves;
	            },
	            set: function(value) {
	                this._excursionOctaves = value;
	                this._excursionFrequency = Math.min(userContext.sampleRate / 2, this.baseFrequency * Math.pow(2, this._excursionOctaves));
	                this.setFilterFreq();
	            }
	        },
	        sensitivity: {
	            enumerable: true,
	            get: function() {
	                return this._sensitivity;
	            },
	            set: function(value) {
	                this._sensitivity = Math.pow(10, value);
	            }
	        },
	        resonance: {
	            enumerable: true,
	            get: function() {
	                return this._resonance;
	            },
	            set: function(value) {
	                this._resonance = value;
	                this.filterPeaking.Q = this._resonance;
	            }
	        },
	        init: {
	            value: function() {
	                this.output.gain.value = 1;
	                this.filterPeaking.type = "peaking";
	                this.filterBp.type = "bandpass";
	                this.filterPeaking.frequency.value = 100;
	                this.filterPeaking.gain.value = 20;
	                this.filterPeaking.Q.value = 5;
	                this.filterBp.frequency.value = 100;
	                this.filterBp.Q.value = 1;
	            }
	        }
	    });

	    Tuna.prototype.EnvelopeFollower = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.jsNode = this.output = userContext.createScriptProcessor(this.buffersize, 1, 1);

	        this.input.connect(this.output);

	        this.attackTime = initValue(properties.attackTime, this.defaults.attackTime.value);
	        this.releaseTime = initValue(properties.releaseTime, this.defaults.releaseTime.value);
	        this._envelope = 0;
	        this.target = properties.target || {};
	        this.callback = properties.callback || function() {};
	    };
	    Tuna.prototype.EnvelopeFollower.prototype = Object.create(Super, {
	        name: {
	            value: "EnvelopeFollower"
	        },
	        defaults: {
	            value: {
	                attackTime: {
	                    value: 0.003,
	                    min: 0,
	                    max: 0.5,
	                    automatable: false,
	                    type: FLOAT
	                },
	                releaseTime: {
	                    value: 0.5,
	                    min: 0,
	                    max: 0.5,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        buffersize: {
	            value: 256
	        },
	        envelope: {
	            value: 0
	        },
	        sampleRate: {
	            value: 44100
	        },
	        attackTime: {
	            enumerable: true,
	            get: function() {
	                return this._attackTime;
	            },
	            set: function(value) {
	                this._attackTime = value;
	                this._attackC = Math.exp(-1 / this._attackTime * this.sampleRate / this.buffersize);
	            }
	        },
	        releaseTime: {
	            enumerable: true,
	            get: function() {
	                return this._releaseTime;
	            },
	            set: function(value) {
	                this._releaseTime = value;
	                this._releaseC = Math.exp(-1 / this._releaseTime * this.sampleRate / this.buffersize);
	            }
	        },
	        callback: {
	            get: function() {
	                return this._callback;
	            },
	            set: function(value) {
	                if (typeof value === "function") {
	                    this._callback = value;
	                } else {
	                    console.error("tuna.js: " + this.name + ": Callback must be a function!");
	                }
	            }
	        },
	        target: {
	            get: function() {
	                return this._target;
	            },
	            set: function(value) {
	                this._target = value;
	            }
	        },
	        activate: {
	            value: function(doActivate) {
	                this.activated = doActivate;
	                if (doActivate) {
	                    this.jsNode.connect(userContext.destination);
	                    this.jsNode.onaudioprocess = this.returnCompute(this);
	                } else {
	                    this.jsNode.disconnect();
	                    this.jsNode.onaudioprocess = null;
	                }
	            }
	        },
	        returnCompute: {
	            value: function(instance) {
	                return function(event) {
	                    instance.compute(event);
	                };
	            }
	        },
	        compute: {
	            value: function(event) {
	                var count = event.inputBuffer.getChannelData(0).length,
	                    channels = event.inputBuffer.numberOfChannels,
	                    current, chan, rms, i;
	                chan = rms = i = 0;
	                if (channels > 1) { //need to mixdown
	                    for (i = 0; i < count; ++i) {
	                        for (; chan < channels; ++chan) {
	                            current = event.inputBuffer.getChannelData(chan)[i];
	                            rms += (current * current) / channels;
	                        }
	                    }
	                } else {
	                    for (i = 0; i < count; ++i) {
	                        current = event.inputBuffer.getChannelData(0)[i];
	                        rms += (current * current);
	                    }
	                }
	                rms = Math.sqrt(rms);

	                if (this._envelope < rms) {
	                    this._envelope *= this._attackC;
	                    this._envelope += (1 - this._attackC) * rms;
	                } else {
	                    this._envelope *= this._releaseC;
	                    this._envelope += (1 - this._releaseC) * rms;
	                }
	                this._callback(this._target, this._envelope);
	            }
	        }
	    });

	    Tuna.prototype.LFO = function(properties) {
	        //Instantiate AudioNode
	        this.output = userContext.createScriptProcessor(256, 1, 1);
	        this.activateNode = userContext.destination;

	        //Set Properties
	        this.frequency = initValue(properties.frequency, this.defaults.frequency.value);
	        this.offset = initValue(properties.offset, this.defaults.offset.value);
	        this.oscillation = initValue(properties.oscillation, this.defaults.oscillation.value);
	        this.phase = initValue(properties.phase, this.defaults.phase.value);
	        this.target = properties.target || {};
	        this.output.onaudioprocess = this.callback(properties.callback || function() {});
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.LFO.prototype = Object.create(Super, {
	        name: {
	            value: "LFO"
	        },
	        bufferSize: {
	            value: 256
	        },
	        sampleRate: {
	            value: 44100
	        },
	        defaults: {
	            value: {
	                frequency: {
	                    value: 1,
	                    min: 0,
	                    max: 20,
	                    automatable: false,
	                    type: FLOAT
	                },
	                offset: {
	                    value: 0.85,
	                    min: 0,
	                    max: 22049,
	                    automatable: false,
	                    type: FLOAT
	                },
	                oscillation: {
	                    value: 0.3,
	                    min: -22050,
	                    max: 22050,
	                    automatable: false,
	                    type: FLOAT
	                },
	                phase: {
	                    value: 0,
	                    min: 0,
	                    max: 2 * Math.PI,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        frequency: {
	            get: function() {
	                return this._frequency;
	            },
	            set: function(value) {
	                this._frequency = value;
	                this._phaseInc = 2 * Math.PI * this._frequency * this.bufferSize / this.sampleRate;
	            }
	        },
	        offset: {
	            get: function() {
	                return this._offset;
	            },
	            set: function(value) {
	                this._offset = value;
	            }
	        },
	        oscillation: {
	            get: function() {
	                return this._oscillation;
	            },
	            set: function(value) {
	                this._oscillation = value;
	            }
	        },
	        phase: {
	            get: function() {
	                return this._phase;
	            },
	            set: function(value) {
	                this._phase = value;
	            }
	        },
	        target: {
	            get: function() {
	                return this._target;
	            },
	            set: function(value) {
	                this._target = value;
	            }
	        },
	        activate: {
	            value: function(doActivate) {
	                if (!doActivate) {
	                    this.output.disconnect(userContext.destination);
	                } else {
	                    this.output.connect(userContext.destination);
	                }
	            }
	        },
	        callback: {
	            value: function(callback) {
	                var that = this;
	                return function() {
	                    that._phase += that._phaseInc;
	                    if (that._phase > 2 * Math.PI) {
	                        that._phase = 0;
	                    }
	                    callback(that._target, that._offset + that._oscillation * Math.sin(that._phase));
	                };
	            }
	        }
	    });

	    Tuna.toString = Tuna.prototype.toString = function() {
	        return "Please visit https://github.com/Theodeus/tuna/wiki for instructions on how to use Tuna.js";
	    };
	})();


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(58);

	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}

	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;

	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });

	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }

	  return buf;
	}

	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : unparse(b);
	}

	// **`v4()` - Generate random UUID**

	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || _rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || unparse(rnds);
	}

	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;

	module.exports = uuid;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict'
	var Voltage = __webpack_require__(59)
	var isNum = function (n) { return typeof n === 'number' }

	var NUMS = ['duration', 't1', 't2', 't3', 't4', 'l1', 'l2', 'l3']
	var DEFAULTS = {
	  duration: Infinity, l1: 1, l2: 0.2, l3: 0.8,
	  t1: 0.01, t2: 0.1, t3: 0, t4: 0.2
	}

	function rampFn (l) {
	  return l ? 'linearRampToValueAtTime' : 'exponentialRampToValueAtTime'
	}
	function ramp (l, node, level, time) { node.gain[rampFn(l)](level, time) }

	/**
	 * Create an envelope generator.
	 * @param {AudioContext} ac - the audio context
	 * @param {Object} options - (Optional) the envelope options
	 * @return {AudioNode} the envelope generator node
	 */
	function Contour (ac, options) {
	  var env = ac.createGain()
	  var opts = Contour.params(options, env)
	  var isL = opts.ramp === 'linear'

	  var tail = ac.createGain()
	  tail.connect(env)
	  var head = ac.createGain()
	  head.connect(tail)
	  var cv = Voltage(ac)
	  cv.connect(head)

	  env.start = function (time) {
	    time = Math.max(time || 0, ac.currentTime)
	    if (env.onstart) env.onstart(time)
	    cv.start(time)
	    head.gain.setValueAtTime(0, time)
	    head.gain.setValueAtTime(0.01, time + 0.000001)
	    ramp(isL, head, opts.l1, time + opts.t1)
	    ramp(isL, head, opts.l2, time + opts.t1 + opts.t2)
	    ramp(isL, head, opts.l3, time + opts.t1 + opts.t2 + opts.t3)
	    if (isFinite(opts.duration)) env.stop(time + opts.duration)
	  }

	  env.stop = function (time) {
	    time = Math.max(time || 0, ac.currentTime)
	    tail.gain.cancelScheduledValues(time)
	    tail.gain.setValueAtTime(env.gain.value, time)
	    var endsAt = time + opts.t4
	    ramp(isL, tail, 0.0001, endsAt)
	    if (env.onended) {
	      var s = Voltage(ac, 0)
	      s.connect(ac.destination)
	      s.onended = env.onended
	      s.start(ac.currentTime)
	      s.stop(endsAt)
	    }
	    return endsAt
	  }
	  return env
	}

	Contour.params = function (options, dest) {
	  dest = dest || {}
	  options = options || {}
	  NUMS.forEach(function (name) {
	    dest[name] = isNum(options[name]) ? options[name] : DEFAULTS[name]
	  })
	  if (isNum(options.attack)) dest.t1 = options.attack
	  if (isNum(options.decay)) dest.t2 = options.decay
	  if (isNum(options.sustain)) dest.l3 = options.sustain
	  if (isNum(options.release)) dest.t4 = options.release
	  dest.ramp = options.ramp === 'exponential' ? options.ramp : 'linear'
	  return dest
	}

	module.exports = Contour


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _src = __webpack_require__(8);

	var _polysynth = __webpack_require__(13);

	var _polysynth2 = _interopRequireDefault(_polysynth);

	var _visualization = __webpack_require__(14);

	var _visualization2 = _interopRequireDefault(_visualization);

	__webpack_require__(57);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Demo = function (_Component) {
	  _inherits(Demo, _Component);

	  function Demo(props) {
	    _classCallCheck(this, Demo);

	    var _this = _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

	    _this.state = {
	      playing: true,
	      lightMode: true
	    };

	    _this.handleAudioProcess = _this.handleAudioProcess.bind(_this);
	    _this.handlePlayToggle = _this.handlePlayToggle.bind(_this);
	    _this.toggleLightMode = _this.toggleLightMode.bind(_this);
	    return _this;
	  }

	  _createClass(Demo, [{
	    key: 'handleAudioProcess',
	    value: function handleAudioProcess(analyser) {
	      this.visualization.audioProcess(analyser);
	    }
	  }, {
	    key: 'handlePlayToggle',
	    value: function handlePlayToggle() {
	      this.setState({
	        playing: !this.state.playing
	      });
	    }
	  }, {
	    key: 'toggleLightMode',
	    value: function toggleLightMode() {
	      this.setState({ lightMode: !this.state.lightMode });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        { style: this.state.lightMode ? {
	            paddingTop: '30px'
	          } : {
	            backgroundColor: '#000',
	            width: '100%',
	            height: '100%',
	            paddingTop: '30px'
	          } },
	        _react2.default.createElement(
	          _src.Song,
	          {
	            playing: this.state.playing,
	            tempo: 90
	          },
	          _react2.default.createElement(
	            _src.Analyser,
	            { onAudioProcess: this.handleAudioProcess },
	            _react2.default.createElement(
	              _src.Sequencer,
	              {
	                resolution: 16,
	                bars: 1
	              },
	              _react2.default.createElement(_src.Sampler, {
	                sample: 'samples/kick.wav',
	                steps: [0, 2, 8, 10]
	              }),
	              _react2.default.createElement(_src.Sampler, {
	                sample: 'samples/snare.wav',
	                steps: [4, 12]
	              })
	            ),
	            _react2.default.createElement(
	              _src.Sequencer,
	              {
	                resolution: 16,
	                bars: 2
	              },
	              _react2.default.createElement(_polysynth2.default, {
	                steps: [[0, 1, ['c3', 'd#3', 'g3']], [2, 1, ['c4']], [8, 1, ['c3', 'd#3', 'g3']], [10, 1, ['c4']], [12, 1, ['c3', 'd#3', 'g3']], [14, 1, ['d#4']], [16, 1, ['f3', 'g#3', 'c4']], [18, 1, ['f3', 'g#3', 'c4']], [24, 1, ['f3', 'g#3', 'c4']], [26, 1, ['f3', 'g#3', 'c4']], [28, 1, ['f3', 'g#3', 'c4']], [30, 1, ['f3', 'g#3', 'c4']]]
	              })
	            ),
	            _react2.default.createElement(
	              _src.Sequencer,
	              {
	                resolution: 16,
	                bars: 2
	              },
	              _react2.default.createElement(_src.Synth, {
	                type: 'sine',
	                steps: [[0, 8, 'c2'], [8, 4, 'c2'], [12, 4, 'd#2'], [16, 8, 'f2'], [24, 8, 'f1']]
	              })
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { style: { textAlign: 'center' } },
	          _react2.default.createElement(
	            'p',
	            { style: this.state.lightMode ? { color: 'black' } : { color: 'white' } },
	            'Light Mode'
	          ),
	          _react2.default.createElement(
	            'label',
	            { className: 'switch' },
	            _react2.default.createElement('input', { type: 'checkbox', onChange: this.toggleLightMode, checked: this.state.lightMode }),
	            _react2.default.createElement('div', { className: 'slider round' })
	          )
	        ),
	        _react2.default.createElement(_visualization2.default, { ref: function ref(c) {
	            _this2.visualization = c;
	          } }),
	        _react2.default.createElement(
	          'button',
	          {
	            className: 'react-music-button',
	            type: 'button',
	            onClick: this.handlePlayToggle
	          },
	          this.state.playing ? 'Stop' : 'Play'
	        )
	      );
	    }
	  }]);

	  return Demo;
	}(_react.Component);

	exports.default = Demo;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Synth = exports.Song = exports.Sampler = exports.Sequencer = exports.Reverb = exports.PingPong = exports.Overdrive = exports.Monosynth = exports.MoogFilter = exports.LFO = exports.Gain = exports.Filter = exports.Delay = exports.Compressor = exports.Chorus = exports.Bitcrusher = exports.Bus = exports.Analyser = undefined;

	var _analyser = __webpack_require__(15);

	var _analyser2 = _interopRequireDefault(_analyser);

	var _bitcrusher = __webpack_require__(16);

	var _bitcrusher2 = _interopRequireDefault(_bitcrusher);

	var _bus = __webpack_require__(17);

	var _bus2 = _interopRequireDefault(_bus);

	var _chorus = __webpack_require__(18);

	var _chorus2 = _interopRequireDefault(_chorus);

	var _compressor = __webpack_require__(19);

	var _compressor2 = _interopRequireDefault(_compressor);

	var _delay = __webpack_require__(20);

	var _delay2 = _interopRequireDefault(_delay);

	var _filter = __webpack_require__(21);

	var _filter2 = _interopRequireDefault(_filter);

	var _gain = __webpack_require__(22);

	var _gain2 = _interopRequireDefault(_gain);

	var _lfo = __webpack_require__(23);

	var _lfo2 = _interopRequireDefault(_lfo);

	var _monosynth = __webpack_require__(24);

	var _monosynth2 = _interopRequireDefault(_monosynth);

	var _moogFilter = __webpack_require__(25);

	var _moogFilter2 = _interopRequireDefault(_moogFilter);

	var _overdrive = __webpack_require__(26);

	var _overdrive2 = _interopRequireDefault(_overdrive);

	var _pingPong = __webpack_require__(27);

	var _pingPong2 = _interopRequireDefault(_pingPong);

	var _reverb = __webpack_require__(28);

	var _reverb2 = _interopRequireDefault(_reverb);

	var _sequencer = __webpack_require__(30);

	var _sequencer2 = _interopRequireDefault(_sequencer);

	var _sampler = __webpack_require__(29);

	var _sampler2 = _interopRequireDefault(_sampler);

	var _song = __webpack_require__(31);

	var _song2 = _interopRequireDefault(_song);

	var _synth = __webpack_require__(32);

	var _synth2 = _interopRequireDefault(_synth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Analyser = _analyser2.default;
	exports.Bus = _bus2.default;
	exports.Bitcrusher = _bitcrusher2.default;
	exports.Chorus = _chorus2.default;
	exports.Compressor = _compressor2.default;
	exports.Delay = _delay2.default;
	exports.Filter = _filter2.default;
	exports.Gain = _gain2.default;
	exports.LFO = _lfo2.default;
	exports.MoogFilter = _moogFilter2.default;
	exports.Monosynth = _monosynth2.default;
	exports.Overdrive = _overdrive2.default;
	exports.PingPong = _pingPong2.default;
	exports.Reverb = _reverb2.default;
	exports.Sequencer = _sequencer2.default;
	exports.Sampler = _sampler2.default;
	exports.Song = _song2.default;
	exports.Synth = _synth2.default;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (false) {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	!function(t,n){ true?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.NoteParser=t.NoteParser||{})}(this,function(t){"use strict";function n(t,n){return Array(n+1).join(t)}function r(t){return"number"==typeof t}function e(t){return"string"==typeof t}function u(t){return void 0!==t}function c(t,n){return Math.pow(2,(t-69)/12)*(n||440)}function o(){return b}function i(t,n,r){if("string"!=typeof t)return null;var e=b.exec(t);if(!e||!n&&e[4])return null;var u={letter:e[1].toUpperCase(),acc:e[2].replace(/x/g,"##")};u.pc=u.letter+u.acc,u.step=(u.letter.charCodeAt(0)+3)%7,u.alt="b"===u.acc[0]?-u.acc.length:u.acc.length;var o=A[u.step]+u.alt;return u.chroma=o<0?12+o:o%12,e[3]&&(u.oct=+e[3],u.midi=o+12*(u.oct+1),u.freq=c(u.midi,r)),n&&(u.tonicOf=e[4]),u}function f(t){return r(t)?t<0?n("b",-t):n("#",t):""}function a(t){return r(t)?""+t:""}function l(t,n,r){return null===t||void 0===t?null:t.step?l(t.step,t.alt,t.oct):t<0||t>6?null:C.charAt(t)+f(n)+a(r)}function p(t){if((r(t)||e(t))&&t>=0&&t<128)return+t;var n=i(t);return n&&u(n.midi)?n.midi:null}function s(t,n){var r=p(t);return null===r?null:c(r,n)}function d(t){return(i(t)||{}).letter}function m(t){return(i(t)||{}).acc}function h(t){return(i(t)||{}).pc}function v(t){return(i(t)||{}).step}function g(t){return(i(t)||{}).alt}function x(t){return(i(t)||{}).chroma}function y(t){return(i(t)||{}).oct}var b=/^([a-gA-G])(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)\s*$/,A=[0,2,4,5,7,9,11],C="CDEFGAB";t.regex=o,t.parse=i,t.build=l,t.midi=p,t.freq=s,t.letter=d,t.acc=m,t.pc=h,t.step=v,t.alt=g,t.chroma=x,t.oct=y});
	//# sourceMappingURL=note-parser.js.map


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(49);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _demo = __webpack_require__(7);

	var _demo2 = _interopRequireDefault(_demo);

	var _reactHotLoader = __webpack_require__(50);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_reactDom2.default.render(_react2.default.createElement(
	  _reactHotLoader.AppContainer,
	  null,
	  _react2.default.createElement(_demo2.default, null)
	), document.getElementById('root'));

	module.hot.accept('./demo', function () {
	  var NextDemo = __webpack_require__(7).default;
	  _reactDom2.default.render(_react2.default.createElement(
	    _reactHotLoader.AppContainer,
	    null,
	    _react2.default.createElement(NextDemo, null)
	  ), document.getElementById('root'));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)(module)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _src = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Polysynth = function Polysynth(props) {
	  return _react2.default.createElement(
	    _src.Delay,
	    null,
	    _react2.default.createElement(
	      _src.Reverb,
	      null,
	      _react2.default.createElement(_src.Synth, {
	        type: 'sine',
	        gain: 0.15,
	        steps: props.steps
	      }),
	      _react2.default.createElement(
	        _src.MoogFilter,
	        { bufferSize: 4096 },
	        _react2.default.createElement(_src.Synth, {
	          type: 'square',
	          gain: 0.15,
	          transpose: 1,
	          steps: props.steps
	        })
	      )
	    )
	  );
	};

	Polysynth.propTypes = {
	  steps: _propTypes2.default.array
	};

	exports.default = Polysynth;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Visualization = function (_Component) {
	  _inherits(Visualization, _Component);

	  function Visualization(props) {
	    _classCallCheck(this, Visualization);

	    var _this = _possibleConstructorReturn(this, (Visualization.__proto__ || Object.getPrototypeOf(Visualization)).call(this, props));

	    _this.audioProcess = _this.audioProcess.bind(_this);
	    return _this;
	  }

	  _createClass(Visualization, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.ctx = this.canvas.getContext('2d');
	    }
	  }, {
	    key: 'audioProcess',
	    value: function audioProcess(analyser) {
	      if (this.ctx) {
	        var gradient = this.ctx.createLinearGradient(0, 0, 0, 512);
	        gradient.addColorStop(1, '#000000');
	        gradient.addColorStop(0.75, '#2ecc71');
	        gradient.addColorStop(0.25, '#f1c40f');
	        gradient.addColorStop(0, '#e74c3c');

	        var array = new Uint8Array(analyser.frequencyBinCount);
	        analyser.getByteFrequencyData(array);
	        this.ctx.clearRect(0, 0, 800, 512);
	        this.ctx.fillStyle = gradient;

	        for (var i = 0; i < array.length; i++) {
	          var value = array[i];
	          this.ctx.fillRect(i * 12, 512, 10, value * -2);
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement('canvas', {
	        className: 'react-music-canvas',
	        width: 800,
	        height: 512,
	        ref: function ref(c) {
	          _this2.canvas = c;
	        }
	      });
	    }
	  }]);

	  return Visualization;
	}(_react.Component);

	exports.default = Visualization;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Analyser = function (_Component) {
	  _inherits(Analyser, _Component);

	  function Analyser(props, context) {
	    _classCallCheck(this, Analyser);

	    var _this = _possibleConstructorReturn(this, (Analyser.__proto__ || Object.getPrototypeOf(Analyser)).call(this, props));

	    _this.visualization = context.audioContext.createScriptProcessor(2048, 1, 1);
	    _this.visualization.connect(context.audioContext.destination);

	    _this.connectNode = context.audioContext.createAnalyser();
	    _this.connectNode.connect(context.connectNode);
	    _this.applyProps = _this.applyProps.bind(_this);

	    _this.visualization.onaudioprocess = function () {
	      if (props.onAudioProcess) {
	        props.onAudioProcess(_this.connectNode);
	      }
	    };
	    return _this;
	  }

	  _createClass(Analyser, [{
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
	          this.connectNode[prop] = props[prop];
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

	  return Analyser;
	}(_react.Component);

	Analyser.propTypes = {
	  children: _propTypes2.default.node,
	  fftSize: _propTypes2.default.number,
	  onAudioProcess: _propTypes2.default.func,
	  smoothingTimeConstant: _propTypes2.default.number
	};
	Analyser.defaultProps = {
	  fftSize: 128,
	  onAudioProcess: function onAudioProcess() {},
	  smoothingTimeConstant: 0.3
	};
	Analyser.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Analyser.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Analyser;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tunajs = __webpack_require__(3);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Bitcrusher = function (_Component) {
	  _inherits(Bitcrusher, _Component);

	  function Bitcrusher(props, context) {
	    _classCallCheck(this, Bitcrusher);

	    var _this = _possibleConstructorReturn(this, (Bitcrusher.__proto__ || Object.getPrototypeOf(Bitcrusher)).call(this, props));

	    var tuna = new _tunajs2.default(context.audioContext);

	    _this.connectNode = new tuna.Bitcrusher({
	      bits: props.bits,
	      normfreq: props.normfreq,
	      bufferSize: props.bufferSize
	    });

	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Bitcrusher, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      for (var prop in nextProps) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = nextProps[prop];
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
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

	  return Bitcrusher;
	}(_react.Component);

	Bitcrusher.propTypes = {
	  bits: _propTypes2.default.number,
	  bufferSize: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  normfreq: _propTypes2.default.number
	};
	Bitcrusher.defaultProps = {
	  bits: 8,
	  bufferSize: 256,
	  normfreq: 0.1
	};
	Bitcrusher.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Bitcrusher.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Bitcrusher;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Bus = function (_Component) {
	  _inherits(Bus, _Component);

	  function Bus(props, context) {
	    _classCallCheck(this, Bus);

	    var _this = _possibleConstructorReturn(this, (Bus.__proto__ || Object.getPrototypeOf(Bus)).call(this, props));

	    _this.connectNode = context.audioContext.createGain();
	    _this.connectNode.gain.value = props.gain;
	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Bus, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var master = this.context.getMaster();
	      master.busses[this.props.id] = this.connectNode;
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var master = this.context.getMaster();
	      delete master.busses[this.props.id];

	      this.connectNode.gain.value = nextProps.gain;
	      master.busses[nextProps.id] = this.connectNode;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
	      delete this.context.getMaster().busses[this.props.id];
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

	  return Bus;
	}(_react.Component);

	Bus.propTypes = {
	  children: _propTypes2.default.node,
	  gain: _propTypes2.default.number,
	  id: _propTypes2.default.string.isRequired
	};
	Bus.defaultProps = {
	  gain: 0.5
	};
	Bus.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func
	};
	Bus.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func
	};
	exports.default = Bus;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tunajs = __webpack_require__(3);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Chorus = function (_Component) {
	  _inherits(Chorus, _Component);

	  function Chorus(props, context) {
	    _classCallCheck(this, Chorus);

	    var _this = _possibleConstructorReturn(this, (Chorus.__proto__ || Object.getPrototypeOf(Chorus)).call(this, props));

	    var tuna = new _tunajs2.default(context.audioContext);

	    _this.connectNode = new tuna.Chorus({
	      feedback: props.feedback,
	      rate: props.rate,
	      delay: props.delay,
	      bypass: props.bypass
	    });

	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Chorus, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      for (var prop in nextProps) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = nextProps[prop];
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
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

	  return Chorus;
	}(_react.Component);

	Chorus.propTypes = {
	  bypass: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  delay: _propTypes2.default.number,
	  feedback: _propTypes2.default.number,
	  rate: _propTypes2.default.number
	};
	Chorus.defaultProps = {
	  bypass: 0,
	  delay: 0.0045,
	  feedback: 0.2,
	  rate: 1.5
	};
	Chorus.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Chorus.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Chorus;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

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

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tunajs = __webpack_require__(3);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Delay = function (_Component) {
	  _inherits(Delay, _Component);

	  function Delay(props, context) {
	    _classCallCheck(this, Delay);

	    var _this = _possibleConstructorReturn(this, (Delay.__proto__ || Object.getPrototypeOf(Delay)).call(this, props));

	    var tuna = new _tunajs2.default(context.audioContext);

	    _this.connectNode = new tuna.Delay({
	      feedback: props.feedback,
	      delayTime: props.delayTime,
	      wetLevel: props.wetLevel,
	      dryLevel: props.dryLevel,
	      cutoff: props.cutoff,
	      bypass: props.bypass
	    });

	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Delay, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      for (var prop in nextProps) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = nextProps[prop];
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
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

	  return Delay;
	}(_react.Component);

	Delay.propTypes = {
	  bypass: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  cutoff: _propTypes2.default.number,
	  delayTime: _propTypes2.default.number,
	  dryLevel: _propTypes2.default.number,
	  feedback: _propTypes2.default.number,
	  wetLevel: _propTypes2.default.number
	};
	Delay.defaultProps = {
	  bypass: 0,
	  cutoff: 2000,
	  delayTime: 150,
	  dryLevel: 1,
	  feedback: 0.45,
	  wetLevel: 0.25
	};
	Delay.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Delay.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Delay;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Filter = function (_Component) {
	  _inherits(Filter, _Component);

	  function Filter(props, context) {
	    _classCallCheck(this, Filter);

	    var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));

	    _this.connectNode = context.audioContext.createBiquadFilter();
	    _this.connectNode.connect(context.connectNode);

	    _this.applyProps = _this.applyProps.bind(_this);
	    return _this;
	  }

	  _createClass(Filter, [{
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
	          if (_typeof(this.connectNode[prop]) === 'object') {
	            this.connectNode[prop].value = props[prop];
	          } else {
	            this.connectNode[prop] = props[prop];
	          }
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

	  return Filter;
	}(_react.Component);

	Filter.propTypes = {
	  children: _propTypes2.default.node,
	  frequency: _propTypes2.default.number,
	  gain: _propTypes2.default.number,
	  type: _propTypes2.default.oneOf(['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'])
	};
	Filter.defaultProps = {
	  frequency: 2000,
	  gain: 0,
	  type: 'lowpass'
	};
	Filter.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Filter.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Filter;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Gain = function (_Component) {
	  _inherits(Gain, _Component);

	  function Gain(props, context) {
	    _classCallCheck(this, Gain);

	    var _this = _possibleConstructorReturn(this, (Gain.__proto__ || Object.getPrototypeOf(Gain)).call(this, props));

	    _this.connectNode = context.audioContext.createGain();
	    _this.connectNode.gain.value = props.amount;
	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Gain, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.connectNode.gain.value = nextProps.amount;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
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

	  return Gain;
	}(_react.Component);

	Gain.propTypes = {
	  amount: _propTypes2.default.number,
	  children: _propTypes2.default.node
	};
	Gain.defaultProps = {
	  amount: 1.0
	};
	Gain.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Gain.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Gain;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LFO = function (_Component) {
	  _inherits(LFO, _Component);

	  function LFO() {
	    _classCallCheck(this, LFO);

	    return _possibleConstructorReturn(this, (LFO.__proto__ || Object.getPrototypeOf(LFO)).apply(this, arguments));
	  }

	  _createClass(LFO, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var volumeGain = this.context.audioContext.createGain();
	      volumeGain.gain.value = this.props.gain;
	      this.osc = this.context.audioContext.createOscillator();
	      this.osc.frequency.value = this.props.frequency;
	      this.osc.type = this.props.type;
	      this.osc.connect(volumeGain);
	      volumeGain.connect(this.props.connect(this.context.connectNode));

	      this.osc.start(this.context.audioContext.currentTime);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.osc.stop();
	      this.connectNode.disconnect();
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

	  return LFO;
	}(_react.Component);

	LFO.displayName = 'Synth';
	LFO.propTypes = {
	  children: _propTypes2.default.node,
	  connect: _propTypes2.default.func,
	  frequency: _propTypes2.default.number,
	  gain: _propTypes2.default.number,
	  type: _propTypes2.default.oneOf(['sine', 'square', 'sawtooth', 'triangle'])
	};
	LFO.defaultProps = {
	  connect: function connect(node) {
	    return node.gain;
	  },
	  frequency: 1,
	  gain: 0.5,
	  type: 'sine'
	};
	LFO.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = LFO;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _noteParser = __webpack_require__(10);

	var _noteParser2 = _interopRequireDefault(_noteParser);

	var _audioContour = __webpack_require__(6);

	var _audioContour2 = _interopRequireDefault(_audioContour);

	var _uuid = __webpack_require__(5);

	var _uuid2 = _interopRequireDefault(_uuid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Monosynth = function (_Component) {
	  _inherits(Monosynth, _Component);

	  function Monosynth(props, context) {
	    _classCallCheck(this, Monosynth);

	    var _this = _possibleConstructorReturn(this, (Monosynth.__proto__ || Object.getPrototypeOf(Monosynth)).call(this, props));

	    _this.getSteps = _this.getSteps.bind(_this);
	    _this.playStep = _this.playStep.bind(_this);

	    _this.connectNode = context.audioContext.createGain();
	    _this.connectNode.gain.value = props.gain;
	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Monosynth, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      this.id = _uuid2.default.v1();
	      var master = this.context.getMaster();
	      master.instruments[this.id] = this.getSteps;

	      this.amplitudeGain = this.context.audioContext.createGain();
	      this.amplitudeGain.gain.value = 0;
	      this.amplitudeGain.connect(this.connectNode);

	      this.osc = this.context.audioContext.createOscillator();
	      this.osc.type = this.props.type;
	      this.osc.connect(this.amplitudeGain);

	      if (this.props.busses) {
	        this.props.busses.forEach(function (bus) {
	          if (master.busses[bus]) {
	            _this2.osc.connect(master.busses[bus]);
	          }
	        });
	      }

	      this.osc.start(this.context.audioContext.currentTime);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var master = this.context.getMaster();
	      delete master.instruments[this.id];
	      this.osc.stop();
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'getSteps',
	    value: function getSteps(playbackTime) {
	      var _this3 = this;

	      var totalBars = this.context.getMaster().getMaxBars();
	      var loopCount = totalBars / this.context.bars;

	      var _loop = function _loop(i) {
	        var barOffset = _this3.context.barInterval * _this3.context.bars * i / 1000;
	        var stepInterval = _this3.context.barInterval / _this3.context.resolution;
	        _this3.props.steps.forEach(function (step, index) {
	          var time = barOffset + step[0] * stepInterval / 1000;
	          var glide = false;

	          if (index !== 0) {
	            var lastTime = barOffset + _this3.props.steps[index - 1][0] * stepInterval / 1000;
	            var lastDuration = _this3.props.steps[index - 1][1] * stepInterval / 1000;
	            glide = lastTime + lastDuration > time;
	          }

	          _this3.context.scheduler.insert(playbackTime + time, _this3.playStep, {
	            time: playbackTime,
	            step: step,
	            glide: glide
	          });
	        });
	      };

	      for (var i = 0; i < loopCount; i++) {
	        _loop(i);
	      }
	    }
	  }, {
	    key: 'createOscillator',
	    value: function createOscillator() {
	      var _arguments = Array.prototype.slice.call(arguments),
	          time = _arguments[0],
	          note = _arguments[1],
	          duration = _arguments[2],
	          glide = _arguments[3];

	      var transposed = note.slice(0, -1) + (parseInt(note[note.length - 1], 0) + parseInt(this.props.transpose, 0));

	      var env = (0, _audioContour2.default)(this.context.audioContext, {
	        attack: this.props.envelope.attack,
	        decay: this.props.envelope.decay,
	        sustain: this.props.envelope.sustain,
	        release: this.props.envelope.release
	      });

	      env.connect(this.amplitudeGain.gain);
	      this.osc.frequency.setTargetAtTime(_noteParser2.default.freq(transposed), time, glide ? this.props.glide : 0.001);

	      env.start(time);
	      env.stop(this.context.audioContext.currentTime + duration);
	    }
	  }, {
	    key: 'playStep',
	    value: function playStep(e) {
	      var _e$args = e.args,
	          step = _e$args.step,
	          glide = _e$args.glide,
	          time = _e$args.time;

	      var note = step[2];
	      var stepInterval = this.context.barInterval / this.context.resolution;
	      var duration = step[1] * stepInterval / 1000;
	      this.createOscillator(time, note, duration, glide);
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

	  return Monosynth;
	}(_react.Component);

	Monosynth.displayName = 'Synth';
	Monosynth.propTypes = {
	  busses: _propTypes2.default.array,
	  children: _propTypes2.default.node,
	  envelope: _propTypes2.default.shape({
	    attack: _propTypes2.default.number,
	    decay: _propTypes2.default.number,
	    sustain: _propTypes2.default.number,
	    release: _propTypes2.default.number
	  }),
	  gain: _propTypes2.default.number,
	  glide: _propTypes2.default.number,
	  steps: _propTypes2.default.array.isRequired,
	  transpose: _propTypes2.default.number,
	  type: _propTypes2.default.oneOf(['sine', 'square', 'sawtooth', 'triangle']).isRequired
	};
	Monosynth.defaultProps = {
	  envelope: {
	    attack: 0.01,
	    decay: 0.2,
	    sustain: 0.2,
	    release: 0.2
	  },
	  gain: 0.5,
	  glide: 0.1,
	  transpose: 0
	};
	Monosynth.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  bars: _propTypes2.default.number,
	  barInterval: _propTypes2.default.number,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func,
	  resolution: _propTypes2.default.number,
	  scheduler: _propTypes2.default.object,
	  tempo: _propTypes2.default.number
	};
	Monosynth.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  bars: _propTypes2.default.number,
	  barInterval: _propTypes2.default.number,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func,
	  resolution: _propTypes2.default.number,
	  scheduler: _propTypes2.default.object,
	  tempo: _propTypes2.default.number
	};
	exports.default = Monosynth;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tunajs = __webpack_require__(3);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var MoogFilter = function (_Component) {
	  _inherits(MoogFilter, _Component);

	  function MoogFilter(props, context) {
	    _classCallCheck(this, MoogFilter);

	    var _this = _possibleConstructorReturn(this, (MoogFilter.__proto__ || Object.getPrototypeOf(MoogFilter)).call(this, props));

	    var tuna = new _tunajs2.default(context.audioContext);

	    _this.connectNode = new tuna.MoogFilter({
	      cutoff: props.cutoff,
	      resonance: props.resonance,
	      bufferSize: props.bufferSize
	    });

	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(MoogFilter, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      for (var prop in nextProps) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = nextProps[prop];
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
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

	  return MoogFilter;
	}(_react.Component);

	MoogFilter.propTypes = {
	  bufferSize: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  cutoff: _propTypes2.default.number,
	  resonance: _propTypes2.default.number
	};
	MoogFilter.defaultProps = {
	  bufferSize: 256,
	  cutoff: 0.065,
	  resonance: 3.5
	};
	MoogFilter.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	MoogFilter.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = MoogFilter;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tunajs = __webpack_require__(3);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Overdrive = function (_Component) {
	  _inherits(Overdrive, _Component);

	  function Overdrive(props, context) {
	    _classCallCheck(this, Overdrive);

	    var _this = _possibleConstructorReturn(this, (Overdrive.__proto__ || Object.getPrototypeOf(Overdrive)).call(this, props));

	    var tuna = new _tunajs2.default(context.audioContext);

	    _this.connectNode = new tuna.Overdrive({
	      outputGain: props.outputGain,
	      drive: props.drive,
	      curveAmount: props.curveAmount,
	      algorithmIndex: props.algorithmIndex,
	      bypass: props.bypass
	    });

	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Overdrive, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      for (var prop in nextProps) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = nextProps[prop];
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
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

	  return Overdrive;
	}(_react.Component);

	Overdrive.propTypes = {
	  algorithmIndex: _propTypes2.default.number,
	  bypass: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  curveAmount: _propTypes2.default.number,
	  drive: _propTypes2.default.number,
	  outputGain: _propTypes2.default.number
	};
	Overdrive.defaultProps = {
	  algorithmIndex: 0,
	  bypass: 0,
	  curveAmount: 1,
	  drive: 0.7,
	  outputGain: 0.5
	};
	Overdrive.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Overdrive.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Overdrive;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tunajs = __webpack_require__(3);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var PingPong = function (_Component) {
	  _inherits(PingPong, _Component);

	  function PingPong(props, context) {
	    _classCallCheck(this, PingPong);

	    var _this = _possibleConstructorReturn(this, (PingPong.__proto__ || Object.getPrototypeOf(PingPong)).call(this, props));

	    var tuna = new _tunajs2.default(context.audioContext);

	    _this.connectNode = new tuna.PingPongDelay({
	      wetLevel: props.wetLevel,
	      feedback: props.feedback,
	      delayTimeLeft: props.delayTimeLeft,
	      delayTimeRight: props.delayTimeRight
	    });

	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(PingPong, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      for (var prop in nextProps) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = nextProps[prop];
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
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

	  return PingPong;
	}(_react.Component);

	PingPong.propTypes = {
	  children: _propTypes2.default.node,
	  delayTimeLeft: _propTypes2.default.number,
	  delayTimeRight: _propTypes2.default.number,
	  feedback: _propTypes2.default.number,
	  wetLevel: _propTypes2.default.number
	};
	PingPong.defaultProps = {
	  delayTimeLeft: 150,
	  delayTimeRight: 200,
	  feedback: 0.3,
	  wetLevel: 0.5
	};
	PingPong.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	PingPong.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = PingPong;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tunajs = __webpack_require__(3);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Reverb = function (_Component) {
	  _inherits(Reverb, _Component);

	  function Reverb(props, context) {
	    _classCallCheck(this, Reverb);

	    var _this = _possibleConstructorReturn(this, (Reverb.__proto__ || Object.getPrototypeOf(Reverb)).call(this, props));

	    var tuna = new _tunajs2.default(context.audioContext);

	    _this.connectNode = new tuna.Convolver({
	      highCut: props.highCut,
	      lowCut: props.lowCut,
	      dryLevel: props.dryLevel,
	      wetLevel: props.wetLevel,
	      level: props.level,
	      impulse: props.impulse,
	      bypass: props.bypass
	    });

	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Reverb, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      for (var prop in nextProps) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = nextProps[prop];
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
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

	  return Reverb;
	}(_react.Component);

	Reverb.propTypes = {
	  bypass: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  dryLevel: _propTypes2.default.number,
	  highCut: _propTypes2.default.number,
	  impulse: _propTypes2.default.string,
	  level: _propTypes2.default.number,
	  lowCut: _propTypes2.default.number,
	  wetLevel: _propTypes2.default.number
	};
	Reverb.defaultProps = {
	  bypass: 0,
	  dryLevel: 0.5,
	  highCut: 22050,
	  impulse: 'reverb/room.wav',
	  level: 1,
	  lowCut: 20,
	  wetLevel: 1
	};
	Reverb.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Reverb.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Reverb;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _uuid = __webpack_require__(5);

	var _uuid2 = _interopRequireDefault(_uuid);

	var _bufferLoader = __webpack_require__(33);

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
	  sample: _propTypes2.default.oneOfType([_propTypes2.default.string.isRequired, _propTypes2.default.array.isRequired]),
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

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _uuid = __webpack_require__(5);

	var _uuid2 = _interopRequireDefault(_uuid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Sequencer = function (_Component) {
	  _inherits(Sequencer, _Component);

	  function Sequencer() {
	    _classCallCheck(this, Sequencer);

	    return _possibleConstructorReturn(this, (Sequencer.__proto__ || Object.getPrototypeOf(Sequencer)).apply(this, arguments));
	  }

	  _createClass(Sequencer, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        bars: this.props.bars,
	        resolution: this.props.resolution
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.id = _uuid2.default.v1();
	      var master = this.context.getMaster();
	      master.bars[this.id] = this.props.bars;
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var master = this.context.getMaster();
	      master.bars[this.id] = nextProps.bars;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      delete this.context.getMaster().bars[this.id];
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

	  return Sequencer;
	}(_react.Component);

	Sequencer.propTypes = {
	  bars: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  resolution: _propTypes2.default.number
	};
	Sequencer.defaultProps = {
	  bars: 1,
	  resolution: 16
	};
	Sequencer.contextTypes = {
	  getMaster: _propTypes2.default.func
	};
	Sequencer.childContextTypes = {
	  bars: _propTypes2.default.number,
	  getMaster: _propTypes2.default.func,
	  resolution: _propTypes2.default.number
	};
	exports.default = Sequencer;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _scheduler = __webpack_require__(34);

	var _scheduler2 = _interopRequireDefault(_scheduler);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-loop-func, react/no-did-mount-set-state */


	var Song = function (_Component) {
	  _inherits(Song, _Component);

	  function Song(props) {
	    _classCallCheck(this, Song);

	    var _this = _possibleConstructorReturn(this, (Song.__proto__ || Object.getPrototypeOf(Song)).call(this, props));

	    _this.state = {
	      buffersLoaded: false
	    };

	    _this.barInterval = 60000 / props.tempo * 4;
	    _this.bars = {};
	    _this.buffers = {};
	    _this.instruments = {};
	    _this.busses = {};

	    _this.loop = _this.loop.bind(_this);
	    _this.bufferLoaded = _this.bufferLoaded.bind(_this);
	    _this.getMaster = _this.getMaster.bind(_this);
	    _this.getMaxBars = _this.getMaxBars.bind(_this);

	    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	    _this.audioContext = new AudioContext();

	    _this.scheduler = new _scheduler2.default({
	      context: _this.audioContext
	    });
	    return _this;
	  }

	  _createClass(Song, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        tempo: this.props.tempo,
	        audioContext: this.audioContext,
	        barInterval: this.barInterval,
	        bufferLoaded: this.bufferLoaded,
	        connectNode: this.audioContext.destination,
	        getMaster: this.getMaster,
	        scheduler: this.scheduler
	      };
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (Object.keys(this.buffers).length === 0) {
	        this.setState({
	          buffersLoaded: true
	        });
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.barInterval = 60000 / nextProps.tempo * 4;
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      var _this2 = this;

	      if (prevState.buffersLoaded !== this.state.buffersLoaded || prevProps.playing !== this.props.playing) {
	        if (this.state.buffersLoaded === true && this.props.playing === true) {
	          setTimeout(function () {
	            _this2.scheduler.start(_this2.loop);
	          }, 0);
	        } else {
	          this.scheduler.stop(true);
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.audioContext.close();
	    }
	  }, {
	    key: 'getMaster',
	    value: function getMaster() {
	      return this;
	    }
	  }, {
	    key: 'getMaxBars',
	    value: function getMaxBars() {
	      var _this3 = this;

	      return Math.max.apply(Math, _toConsumableArray(Object.keys(this.bars).map(function (b) {
	        return _this3.bars[b];
	      })));
	    }
	  }, {
	    key: 'bufferLoaded',
	    value: function bufferLoaded() {
	      if (Object.keys(this.buffers).length === 0) {
	        this.setState({
	          buffersLoaded: true
	        });
	      }
	    }
	  }, {
	    key: 'loop',
	    value: function loop(e) {
	      var _this4 = this;

	      var maxBars = Object.keys(this.bars).length ? this.getMaxBars() : 1;
	      Object.keys(this.instruments).forEach(function (id) {
	        var callback = _this4.instruments[id];
	        callback(e.playbackTime);
	      });
	      this.scheduler.insert(e.playbackTime + this.barInterval * maxBars / 1000, this.loop);
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

	  return Song;
	}(_react.Component);

	Song.propTypes = {
	  children: _propTypes2.default.node,
	  playing: _propTypes2.default.bool,
	  tempo: _propTypes2.default.number
	};
	Song.defaultProps = {
	  playing: false,
	  tempo: 90
	};
	Song.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  barInterval: _propTypes2.default.number,
	  bufferLoaded: _propTypes2.default.func,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func,
	  scheduler: _propTypes2.default.object,
	  tempo: _propTypes2.default.number
	};
	exports.default = Song;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _noteParser = __webpack_require__(10);

	var _noteParser2 = _interopRequireDefault(_noteParser);

	var _audioContour = __webpack_require__(6);

	var _audioContour2 = _interopRequireDefault(_audioContour);

	var _uuid = __webpack_require__(5);

	var _uuid2 = _interopRequireDefault(_uuid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable max-statements */


	var Synth = function (_Component) {
	  _inherits(Synth, _Component);

	  function Synth(props, context) {
	    _classCallCheck(this, Synth);

	    var _this = _possibleConstructorReturn(this, (Synth.__proto__ || Object.getPrototypeOf(Synth)).call(this, props));

	    _this.getSteps = _this.getSteps.bind(_this);
	    _this.playStep = _this.playStep.bind(_this);

	    _this.connectNode = context.audioContext.createGain();
	    _this.connectNode.gain.value = props.gain;
	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Synth, [{
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
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.connectNode.gain.value = nextProps.gain;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var master = this.context.getMaster();
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
	          var time = barOffset + step[0] * stepInterval / 1000;

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
	    key: 'createOscillator',
	    value: function createOscillator(time, note, duration) {
	      var amplitudeGain = this.context.audioContext.createGain();
	      amplitudeGain.gain.value = 0;
	      amplitudeGain.connect(this.connectNode);

	      var env = (0, _audioContour2.default)(this.context.audioContext, {
	        attack: this.props.envelope.attack,
	        decay: this.props.envelope.decay,
	        sustain: this.props.envelope.sustain,
	        release: this.props.envelope.release
	      });

	      env.connect(amplitudeGain.gain);

	      var osc = this.context.audioContext.createOscillator();
	      var transposed = note.slice(0, -1) + (parseInt(note[note.length - 1], 0) + parseInt(this.props.transpose, 0));

	      osc.frequency.value = _noteParser2.default.freq(transposed);
	      osc.type = this.props.type;
	      osc.connect(amplitudeGain);

	      if (this.props.busses) {
	        var master = this.context.getMaster();
	        this.props.busses.forEach(function (bus) {
	          if (master.busses[bus]) {
	            osc.connect(master.busses[bus]);
	          }
	        });
	      }

	      osc.start(time);
	      env.start(time);

	      var finish = env.stop(this.context.audioContext.currentTime + duration);
	      osc.stop(finish);
	    }
	  }, {
	    key: 'playStep',
	    value: function playStep(e) {
	      var _this3 = this;

	      var _e$args = e.args,
	          step = _e$args.step,
	          time = _e$args.time;

	      var notes = step[2];
	      var stepInterval = this.context.barInterval / this.context.resolution;
	      var duration = step[1] * stepInterval / 1000;

	      if (Array.isArray(notes)) {
	        notes.forEach(function (n) {
	          _this3.createOscillator(time, n, duration);
	        });
	      } else {
	        this.createOscillator(time, notes, duration);
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

	  return Synth;
	}(_react.Component);

	Synth.displayName = 'Synth';
	Synth.propTypes = {
	  busses: _propTypes2.default.array,
	  children: _propTypes2.default.node,
	  envelope: _propTypes2.default.shape({
	    attack: _propTypes2.default.number,
	    decay: _propTypes2.default.number,
	    sustain: _propTypes2.default.number,
	    release: _propTypes2.default.number
	  }),
	  gain: _propTypes2.default.number,
	  steps: _propTypes2.default.array.isRequired,
	  transpose: _propTypes2.default.number,
	  type: _propTypes2.default.oneOf(['sine', 'square', 'sawtooth', 'triangle']).isRequired
	};
	Synth.defaultProps = {
	  envelope: {
	    attack: 0.01,
	    decay: 0.2,
	    sustain: 0.2,
	    release: 0.2
	  },
	  gain: 0.5,
	  transpose: 0
	};
	Synth.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  bars: _propTypes2.default.number,
	  barInterval: _propTypes2.default.number,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func,
	  resolution: _propTypes2.default.number,
	  scheduler: _propTypes2.default.object,
	  tempo: _propTypes2.default.number
	};
	Synth.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  bars: _propTypes2.default.number,
	  barInterval: _propTypes2.default.number,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func,
	  resolution: _propTypes2.default.number,
	  scheduler: _propTypes2.default.object,
	  tempo: _propTypes2.default.number
	};
	exports.default = Synth;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	/* eslint-disable no-console */
	var BufferLoader = exports.BufferLoader = function BufferLoader(context, sampleList, callback) {
		this.context = context;
		this.sampleList = sampleList;
		this.onload = callback;
		this.bufferList = [];
		this.loadCount = 0;
	};

	BufferLoader.prototype.loadBuffer = function loadBuffer(sample, index) {

		var self = this;
		if (typeof sample === "string") {
			var request = new XMLHttpRequest();
			request.open('GET', sample, true);
			request.responseType = 'arraybuffer';

			request.onload = function onload() {
				self.context.decodeAudioData(request.response, function (buffer) {
					if (!buffer) {
						console.error('error decoding file data: ' + sample);
						return;
					}
					self.bufferList[index] = buffer;
					if (++self.loadCount === self.sampleList.length) {
						self.onload(self.bufferList);
					}
				}, function (error) {
					console.error('decodeAudioData error', error);
				});
			};

			request.onerror = function onError() {
				console.error('BufferLoader: XHR error');
			};

			request.send();
		} else {
			self.context.decodeAudioData(sample, function (buffer) {
				self.bufferList[index] = buffer;
				if (++self.loadCount === self.sampleList.length) {
					self.onload(self.bufferList);
				}
			});
		}
	};

	BufferLoader.prototype.load = function load() {
		for (var i = 0; i < this.sampleList.length; ++i) {
			this.loadBuffer(this.sampleList[i], i);
		}
	};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scheduler = function () {
	  function Scheduler(opts) {
	    _classCallCheck(this, Scheduler);

	    this.context = opts.context;
	    this.interval = 0.025;
	    this.aheadTime = 0.0;
	    this.playbackTime = this.context.currentTime;

	    this.timerID = 0;
	    this.scheduleID = 0;
	    this.schedules = [];
	  }

	  _createClass(Scheduler, [{
	    key: 'start',
	    value: function start(callback, args) {
	      var _this = this;

	      var loop = function loop() {
	        var t0 = _this.context.currentTime;
	        var t1 = t0 + _this.aheadTime;

	        _this.process(t0, t1);
	      };

	      if (this.timerID === 0) {
	        this.timerID = setInterval(loop, this.interval * 1000);

	        if (callback) {
	          this.insert(this.context.currentTime, callback, args);
	          loop();
	        }
	      } else {
	        this.insert(this.context.currentTime, callback, args);
	      }

	      return this;
	    }
	  }, {
	    key: 'stop',
	    value: function stop(reset) {
	      if (this.timerID !== 0) {
	        clearInterval(this.timerID);
	        this.timerID = 0;
	      }

	      if (reset) {
	        this.schedules.splice(0);
	      }

	      return this;
	    }
	  }, {
	    key: 'insert',
	    value: function insert(time, callback, args) {
	      var id = ++this.scheduleID;
	      var event = { id: id, time: time, callback: callback, args: args };

	      if (this.schedules.length === 0 || this.schedules[this.schedules.length - 1].time <= time) {
	        this.schedules.push(event);
	      } else {
	        for (var i = 0, imax = this.schedules.length; i < imax; i++) {
	          if (time < this.schedules[i].time) {
	            this.schedules.splice(i, 0, event);
	            break;
	          }
	        }
	      }

	      return id;
	    }
	  }, {
	    key: 'nextTick',
	    value: function nextTick(time, callback, args) {
	      return this.insert(time + this.aheadTime, callback, args);
	    }
	  }, {
	    key: 'remove',
	    value: function remove(scheduleID) {
	      if (typeof scheduleID === 'number') {
	        for (var i = 0, imax = this.schedules.length; i < imax; i++) {
	          if (scheduleID === this.schedules[i].id) {
	            this.schedules.splice(i, 1);
	            break;
	          }
	        }
	      }

	      return scheduleID;
	    }
	  }, {
	    key: 'removeAll',
	    value: function removeAll() {
	      this.schedules.splice(0);
	    }
	  }, {
	    key: 'process',
	    value: function process(t0, t1) {
	      this.playbackTime = t0;

	      while (this.schedules.length && this.schedules[0].time < t1) {
	        var event = this.schedules.shift();
	        var playbackTime = event.time;
	        var args = event.args;

	        this.playbackTime = playbackTime;

	        event.callback({ playbackTime: playbackTime, args: args });
	      }

	      this.playbackTime = t0;
	    }
	  }]);

	  return Scheduler;
	}();

	exports.default = Scheduler;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(36)();
	// imports


	// module
	exports.push([module.id, ".react-music-canvas {\n  display: block;\n  margin: 0 auto 0;\n  border: 1px solid #aaa;\n  padding: 10px;\n}\n\n.react-music-button {\n  display: block;\n  text-decoration: none;\n  background-color: #f7f7f7;\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#f7f7f7), to(#e7e7e7));\n  background-image: -webkit-linear-gradient(top, #f7f7f7, #e7e7e7);\n  background-image: -moz-linear-gradient(top, #f7f7f7, #e7e7e7);\n  background-image: -ms-linear-gradient(top, #f7f7f7, #e7e7e7);\n  background-image: -o-linear-gradient(top, #f7f7f7, #e7e7e7);\n  color: #a7a7a7;\n  margin: 30px auto;\n  width: 108px;\n  height: 108px;\n  position: relative;\n  text-align: center;\n  line-height: 108px;\n  border-radius: 50%;\n  box-shadow: 0px 3px 8px #aaa, inset 0px 2px 3px #fff;\n  border: solid 1px transparent;\n  outline: none;\n  font-size: 16px;\n  text-transform: uppercase;\n}\n\n.react-music-button:before {\n  content: \"\";\n  display: block;\n  background: #fff;\n  border-top: 2px solid #ddd;\n  position: absolute;\n  top: -9px;\n  left: -9px;\n  bottom: -9px;\n  right: -9px;\n  z-index: -1;\n  border-radius: 50%;\n  box-shadow: inset 0px 8px 48px #ddd;\n}\n\n.react-music-button:active {\n  box-shadow: none;\n  border: solid 1px #a7a7a7;\n}\n\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n.switch input {display:none;}\n\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: \"\";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\ninput:checked + .slider {\n  background-color: #2196F3;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  -ms-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n/* Rounded sliders */\n.slider.round {\n  border-radius: 34px;\n}\n\n.slider.round:before {\n  border-radius: 50%;\n}\n", ""]);

	// exports


/***/ }),
/* 36 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	var emptyFunction = __webpack_require__(4);

	/**
	 * Upstream version of event listener. Does not take into account specific
	 * nature of platform.
	 */
	var EventListener = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  listen: function listen(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function remove() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  },

	  /**
	   * Listen to DOM events during the capture phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  capture: function capture(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, true);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, true);
	        }
	      };
	    } else {
	      if (false) {
	        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
	      }
	      return {
	        remove: emptyFunction
	      };
	    }
	  },

	  registerDefault: function registerDefault() {}
	};

	module.exports = EventListener;

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var isTextNode = __webpack_require__(44);

	/*eslint-disable no-bitwise */

	/**
	 * Checks if a given DOM node contains or is another DOM node.
	 */
	function containsNode(outerNode, innerNode) {
	  if (!outerNode || !innerNode) {
	    return false;
	  } else if (outerNode === innerNode) {
	    return true;
	  } else if (isTextNode(outerNode)) {
	    return false;
	  } else if (isTextNode(innerNode)) {
	    return containsNode(outerNode, innerNode.parentNode);
	  } else if ('contains' in outerNode) {
	    return outerNode.contains(innerNode);
	  } else if (outerNode.compareDocumentPosition) {
	    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
	  } else {
	    return false;
	  }
	}

	module.exports = containsNode;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * @param {DOMElement} node input/textarea to focus
	 */

	function focusNode(node) {
	  // IE8 can throw "Can't move focus to the control because it is invisible,
	  // not enabled, or of a type that does not accept the focus." for all kinds of
	  // reasons that are too expensive and fragile to test.
	  try {
	    node.focus();
	  } catch (e) {}
	}

	module.exports = focusNode;

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	/* eslint-disable fb-www/typeof-undefined */

	/**
	 * Same as document.activeElement but wraps in a try-catch block. In IE it is
	 * not safe to call document.activeElement if there is nothing focused.
	 *
	 * The activeElement will be null only if the document or document body is not
	 * yet defined.
	 *
	 * @param {?DOMDocument} doc Defaults to current document.
	 * @return {?DOMElement}
	 */
	function getActiveElement(doc) /*?DOMElement*/{
	  doc = doc || (typeof document !== 'undefined' ? document : undefined);
	  if (typeof doc === 'undefined') {
	    return null;
	  }
	  try {
	    return doc.activeElement || doc.body;
	  } catch (e) {
	    return doc.body;
	  }
	}

	module.exports = getActiveElement;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (false) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM node.
	 */
	function isNode(object) {
	  var doc = object ? object.ownerDocument || object : document;
	  var defaultView = doc.defaultView || window;
	  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
	}

	module.exports = isNode;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	var isNode = __webpack_require__(43);

	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM text node.
	 */
	function isTextNode(object) {
	  return isNode(object) && object.nodeType == 3;
	}

	module.exports = isTextNode;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 * 
	 */

	/*eslint-disable no-self-compare */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    // Added the nonzero y check to make Flow happy, but it is redundant
	    return x !== 0 || y !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (is(objA, objB)) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(4);
	var invariant = __webpack_require__(42);
	var ReactPropTypesSecret = __webpack_require__(47);

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	/** @license React v16.2.0
	 * react-dom.production.min.js
	 *
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	/*
	 Modernizr 3.0.0pre (Custom Build) | MIT
	*/
	'use strict';var aa=__webpack_require__(1),l=__webpack_require__(38),B=__webpack_require__(11),C=__webpack_require__(4),ba=__webpack_require__(37),da=__webpack_require__(41),ea=__webpack_require__(45),fa=__webpack_require__(39),ia=__webpack_require__(40),D=__webpack_require__(9);
	function E(a){for(var b=arguments.length-1,c="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,d=0;d<b;d++)c+="\x26args[]\x3d"+encodeURIComponent(arguments[d+1]);b=Error(c+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}aa?void 0:E("227");
	var oa={children:!0,dangerouslySetInnerHTML:!0,defaultValue:!0,defaultChecked:!0,innerHTML:!0,suppressContentEditableWarning:!0,suppressHydrationWarning:!0,style:!0};function pa(a,b){return(a&b)===b}
	var ta={MUST_USE_PROPERTY:1,HAS_BOOLEAN_VALUE:4,HAS_NUMERIC_VALUE:8,HAS_POSITIVE_NUMERIC_VALUE:24,HAS_OVERLOADED_BOOLEAN_VALUE:32,HAS_STRING_BOOLEAN_VALUE:64,injectDOMPropertyConfig:function(a){var b=ta,c=a.Properties||{},d=a.DOMAttributeNamespaces||{},e=a.DOMAttributeNames||{};a=a.DOMMutationMethods||{};for(var f in c){ua.hasOwnProperty(f)?E("48",f):void 0;var g=f.toLowerCase(),h=c[f];g={attributeName:g,attributeNamespace:null,propertyName:f,mutationMethod:null,mustUseProperty:pa(h,b.MUST_USE_PROPERTY),
	hasBooleanValue:pa(h,b.HAS_BOOLEAN_VALUE),hasNumericValue:pa(h,b.HAS_NUMERIC_VALUE),hasPositiveNumericValue:pa(h,b.HAS_POSITIVE_NUMERIC_VALUE),hasOverloadedBooleanValue:pa(h,b.HAS_OVERLOADED_BOOLEAN_VALUE),hasStringBooleanValue:pa(h,b.HAS_STRING_BOOLEAN_VALUE)};1>=g.hasBooleanValue+g.hasNumericValue+g.hasOverloadedBooleanValue?void 0:E("50",f);e.hasOwnProperty(f)&&(g.attributeName=e[f]);d.hasOwnProperty(f)&&(g.attributeNamespace=d[f]);a.hasOwnProperty(f)&&(g.mutationMethod=a[f]);ua[f]=g}}},ua={};
	function va(a,b){if(oa.hasOwnProperty(a)||2<a.length&&("o"===a[0]||"O"===a[0])&&("n"===a[1]||"N"===a[1]))return!1;if(null===b)return!0;switch(typeof b){case "boolean":return oa.hasOwnProperty(a)?a=!0:(b=wa(a))?a=b.hasBooleanValue||b.hasStringBooleanValue||b.hasOverloadedBooleanValue:(a=a.toLowerCase().slice(0,5),a="data-"===a||"aria-"===a),a;case "undefined":case "number":case "string":case "object":return!0;default:return!1}}function wa(a){return ua.hasOwnProperty(a)?ua[a]:null}
	var xa=ta,ya=xa.MUST_USE_PROPERTY,K=xa.HAS_BOOLEAN_VALUE,za=xa.HAS_NUMERIC_VALUE,Aa=xa.HAS_POSITIVE_NUMERIC_VALUE,Ba=xa.HAS_OVERLOADED_BOOLEAN_VALUE,Ca=xa.HAS_STRING_BOOLEAN_VALUE,Da={Properties:{allowFullScreen:K,async:K,autoFocus:K,autoPlay:K,capture:Ba,checked:ya|K,cols:Aa,contentEditable:Ca,controls:K,"default":K,defer:K,disabled:K,download:Ba,draggable:Ca,formNoValidate:K,hidden:K,loop:K,multiple:ya|K,muted:ya|K,noValidate:K,open:K,playsInline:K,readOnly:K,required:K,reversed:K,rows:Aa,rowSpan:za,
	scoped:K,seamless:K,selected:ya|K,size:Aa,start:za,span:Aa,spellCheck:Ca,style:0,tabIndex:0,itemScope:K,acceptCharset:0,className:0,htmlFor:0,httpEquiv:0,value:Ca},DOMAttributeNames:{acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"},DOMMutationMethods:{value:function(a,b){if(null==b)return a.removeAttribute("value");"number"!==a.type||!1===a.hasAttribute("value")?a.setAttribute("value",""+b):a.validity&&!a.validity.badInput&&a.ownerDocument.activeElement!==a&&
	a.setAttribute("value",""+b)}}},Ea=xa.HAS_STRING_BOOLEAN_VALUE,M={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},Ga={Properties:{autoReverse:Ea,externalResourcesRequired:Ea,preserveAlpha:Ea},DOMAttributeNames:{autoReverse:"autoReverse",externalResourcesRequired:"externalResourcesRequired",preserveAlpha:"preserveAlpha"},DOMAttributeNamespaces:{xlinkActuate:M.xlink,xlinkArcrole:M.xlink,xlinkHref:M.xlink,xlinkRole:M.xlink,xlinkShow:M.xlink,xlinkTitle:M.xlink,xlinkType:M.xlink,
	xmlBase:M.xml,xmlLang:M.xml,xmlSpace:M.xml}},Ha=/[\-\:]([a-z])/g;function Ia(a){return a[1].toUpperCase()}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode x-height xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xmlns:xlink xml:lang xml:space".split(" ").forEach(function(a){var b=a.replace(Ha,
	Ia);Ga.Properties[b]=0;Ga.DOMAttributeNames[b]=a});xa.injectDOMPropertyConfig(Da);xa.injectDOMPropertyConfig(Ga);
	var P={_caughtError:null,_hasCaughtError:!1,_rethrowError:null,_hasRethrowError:!1,injection:{injectErrorUtils:function(a){"function"!==typeof a.invokeGuardedCallback?E("197"):void 0;Ja=a.invokeGuardedCallback}},invokeGuardedCallback:function(a,b,c,d,e,f,g,h,k){Ja.apply(P,arguments)},invokeGuardedCallbackAndCatchFirstError:function(a,b,c,d,e,f,g,h,k){P.invokeGuardedCallback.apply(this,arguments);if(P.hasCaughtError()){var q=P.clearCaughtError();P._hasRethrowError||(P._hasRethrowError=!0,P._rethrowError=
	q)}},rethrowCaughtError:function(){return Ka.apply(P,arguments)},hasCaughtError:function(){return P._hasCaughtError},clearCaughtError:function(){if(P._hasCaughtError){var a=P._caughtError;P._caughtError=null;P._hasCaughtError=!1;return a}E("198")}};function Ja(a,b,c,d,e,f,g,h,k){P._hasCaughtError=!1;P._caughtError=null;var q=Array.prototype.slice.call(arguments,3);try{b.apply(c,q)}catch(v){P._caughtError=v,P._hasCaughtError=!0}}
	function Ka(){if(P._hasRethrowError){var a=P._rethrowError;P._rethrowError=null;P._hasRethrowError=!1;throw a;}}var La=null,Ma={};
	function Na(){if(La)for(var a in Ma){var b=Ma[a],c=La.indexOf(a);-1<c?void 0:E("96",a);if(!Oa[c]){b.extractEvents?void 0:E("97",a);Oa[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;Pa.hasOwnProperty(h)?E("99",h):void 0;Pa[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&Qa(k[e],g,h);e=!0}else f.registrationName?(Qa(f.registrationName,g,h),e=!0):e=!1;e?void 0:E("98",d,a)}}}}
	function Qa(a,b,c){Ra[a]?E("100",a):void 0;Ra[a]=b;Sa[a]=b.eventTypes[c].dependencies}var Oa=[],Pa={},Ra={},Sa={};function Ta(a){La?E("101"):void 0;La=Array.prototype.slice.call(a);Na()}function Ua(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];Ma.hasOwnProperty(c)&&Ma[c]===d||(Ma[c]?E("102",c):void 0,Ma[c]=d,b=!0)}b&&Na()}
	var Va=Object.freeze({plugins:Oa,eventNameDispatchConfigs:Pa,registrationNameModules:Ra,registrationNameDependencies:Sa,possibleRegistrationNames:null,injectEventPluginOrder:Ta,injectEventPluginsByName:Ua}),Wa=null,Xa=null,Ya=null;function Za(a,b,c,d){b=a.type||"unknown-event";a.currentTarget=Ya(d);P.invokeGuardedCallbackAndCatchFirstError(b,c,void 0,a);a.currentTarget=null}
	function $a(a,b){null==b?E("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}function ab(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}var bb=null;
	function cb(a,b){if(a){var c=a._dispatchListeners,d=a._dispatchInstances;if(Array.isArray(c))for(var e=0;e<c.length&&!a.isPropagationStopped();e++)Za(a,b,c[e],d[e]);else c&&Za(a,b,c,d);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a)}}function db(a){return cb(a,!0)}function gb(a){return cb(a,!1)}var hb={injectEventPluginOrder:Ta,injectEventPluginsByName:Ua};
	function ib(a,b){var c=a.stateNode;if(!c)return null;var d=Wa(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;c&&"function"!==typeof c?E("231",b,typeof c):void 0;
	return c}function jb(a,b,c,d){for(var e,f=0;f<Oa.length;f++){var g=Oa[f];g&&(g=g.extractEvents(a,b,c,d))&&(e=$a(e,g))}return e}function kb(a){a&&(bb=$a(bb,a))}function lb(a){var b=bb;bb=null;b&&(a?ab(b,db):ab(b,gb),bb?E("95"):void 0,P.rethrowCaughtError())}var mb=Object.freeze({injection:hb,getListener:ib,extractEvents:jb,enqueueEvents:kb,processEventQueue:lb}),nb=Math.random().toString(36).slice(2),Q="__reactInternalInstance$"+nb,ob="__reactEventHandlers$"+nb;
	function pb(a){if(a[Q])return a[Q];for(var b=[];!a[Q];)if(b.push(a),a.parentNode)a=a.parentNode;else return null;var c=void 0,d=a[Q];if(5===d.tag||6===d.tag)return d;for(;a&&(d=a[Q]);a=b.pop())c=d;return c}function qb(a){if(5===a.tag||6===a.tag)return a.stateNode;E("33")}function rb(a){return a[ob]||null}
	var sb=Object.freeze({precacheFiberNode:function(a,b){b[Q]=a},getClosestInstanceFromNode:pb,getInstanceFromNode:function(a){a=a[Q];return!a||5!==a.tag&&6!==a.tag?null:a},getNodeFromInstance:qb,getFiberCurrentPropsFromNode:rb,updateFiberProps:function(a,b){a[ob]=b}});function tb(a){do a=a["return"];while(a&&5!==a.tag);return a?a:null}function ub(a,b,c){for(var d=[];a;)d.push(a),a=tb(a);for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c)}
	function vb(a,b,c){if(b=ib(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=$a(c._dispatchListeners,b),c._dispatchInstances=$a(c._dispatchInstances,a)}function wb(a){a&&a.dispatchConfig.phasedRegistrationNames&&ub(a._targetInst,vb,a)}function xb(a){if(a&&a.dispatchConfig.phasedRegistrationNames){var b=a._targetInst;b=b?tb(b):null;ub(b,vb,a)}}
	function yb(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=ib(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=$a(c._dispatchListeners,b),c._dispatchInstances=$a(c._dispatchInstances,a))}function zb(a){a&&a.dispatchConfig.registrationName&&yb(a._targetInst,null,a)}function Ab(a){ab(a,wb)}
	function Bb(a,b,c,d){if(c&&d)a:{var e=c;for(var f=d,g=0,h=e;h;h=tb(h))g++;h=0;for(var k=f;k;k=tb(k))h++;for(;0<g-h;)e=tb(e),g--;for(;0<h-g;)f=tb(f),h--;for(;g--;){if(e===f||e===f.alternate)break a;e=tb(e);f=tb(f)}e=null}else e=null;f=e;for(e=[];c&&c!==f;){g=c.alternate;if(null!==g&&g===f)break;e.push(c);c=tb(c)}for(c=[];d&&d!==f;){g=d.alternate;if(null!==g&&g===f)break;c.push(d);d=tb(d)}for(d=0;d<e.length;d++)yb(e[d],"bubbled",a);for(a=c.length;0<a--;)yb(c[a],"captured",b)}
	var Cb=Object.freeze({accumulateTwoPhaseDispatches:Ab,accumulateTwoPhaseDispatchesSkipTarget:function(a){ab(a,xb)},accumulateEnterLeaveDispatches:Bb,accumulateDirectDispatches:function(a){ab(a,zb)}}),Db=null;function Eb(){!Db&&l.canUseDOM&&(Db="textContent"in document.documentElement?"textContent":"innerText");return Db}var S={_root:null,_startText:null,_fallbackText:null};
	function Fb(){if(S._fallbackText)return S._fallbackText;var a,b=S._startText,c=b.length,d,e=Gb(),f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);S._fallbackText=e.slice(a,1<d?1-d:void 0);return S._fallbackText}function Gb(){return"value"in S._root?S._root.value:S._root[Eb()]}
	var Hb="dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),Ib={type:null,target:null,currentTarget:C.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
	function T(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?C.thatReturnsTrue:C.thatReturnsFalse;this.isPropagationStopped=C.thatReturnsFalse;return this}
	B(T.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=C.thatReturnsTrue)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=C.thatReturnsTrue)},persist:function(){this.isPersistent=C.thatReturnsTrue},isPersistent:C.thatReturnsFalse,
	destructor:function(){var a=this.constructor.Interface,b;for(b in a)this[b]=null;for(a=0;a<Hb.length;a++)this[Hb[a]]=null}});T.Interface=Ib;T.augmentClass=function(a,b){function c(){}c.prototype=this.prototype;var d=new c;B(d,a.prototype);a.prototype=d;a.prototype.constructor=a;a.Interface=B({},this.Interface,b);a.augmentClass=this.augmentClass;Jb(a)};Jb(T);function Kb(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}
	function Lb(a){a instanceof this?void 0:E("223");a.destructor();10>this.eventPool.length&&this.eventPool.push(a)}function Jb(a){a.eventPool=[];a.getPooled=Kb;a.release=Lb}function Mb(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(Mb,{data:null});function Nb(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(Nb,{data:null});var Pb=[9,13,27,32],Vb=l.canUseDOM&&"CompositionEvent"in window,Wb=null;l.canUseDOM&&"documentMode"in document&&(Wb=document.documentMode);var Xb;
	if(Xb=l.canUseDOM&&"TextEvent"in window&&!Wb){var Yb=window.opera;Xb=!("object"===typeof Yb&&"function"===typeof Yb.version&&12>=parseInt(Yb.version(),10))}
	var Zb=Xb,$b=l.canUseDOM&&(!Vb||Wb&&8<Wb&&11>=Wb),ac=String.fromCharCode(32),bc={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["topCompositionEnd","topKeyPress","topTextInput","topPaste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"topBlur topCompositionEnd topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
	captured:"onCompositionStartCapture"},dependencies:"topBlur topCompositionStart topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"topBlur topCompositionUpdate topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")}},cc=!1;
	function dc(a,b){switch(a){case "topKeyUp":return-1!==Pb.indexOf(b.keyCode);case "topKeyDown":return 229!==b.keyCode;case "topKeyPress":case "topMouseDown":case "topBlur":return!0;default:return!1}}function ec(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var fc=!1;function gc(a,b){switch(a){case "topCompositionEnd":return ec(b);case "topKeyPress":if(32!==b.which)return null;cc=!0;return ac;case "topTextInput":return a=b.data,a===ac&&cc?null:a;default:return null}}
	function hc(a,b){if(fc)return"topCompositionEnd"===a||!Vb&&dc(a,b)?(a=Fb(),S._root=null,S._startText=null,S._fallbackText=null,fc=!1,a):null;switch(a){case "topPaste":return null;case "topKeyPress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "topCompositionEnd":return $b?null:b.data;default:return null}}
	var ic={eventTypes:bc,extractEvents:function(a,b,c,d){var e;if(Vb)b:{switch(a){case "topCompositionStart":var f=bc.compositionStart;break b;case "topCompositionEnd":f=bc.compositionEnd;break b;case "topCompositionUpdate":f=bc.compositionUpdate;break b}f=void 0}else fc?dc(a,c)&&(f=bc.compositionEnd):"topKeyDown"===a&&229===c.keyCode&&(f=bc.compositionStart);f?($b&&(fc||f!==bc.compositionStart?f===bc.compositionEnd&&fc&&(e=Fb()):(S._root=d,S._startText=Gb(),fc=!0)),f=Mb.getPooled(f,b,c,d),e?f.data=
	e:(e=ec(c),null!==e&&(f.data=e)),Ab(f),e=f):e=null;(a=Zb?gc(a,c):hc(a,c))?(b=Nb.getPooled(bc.beforeInput,b,c,d),b.data=a,Ab(b)):b=null;return[e,b]}},jc=null,kc=null,lc=null;function mc(a){if(a=Xa(a)){jc&&"function"===typeof jc.restoreControlledState?void 0:E("194");var b=Wa(a.stateNode);jc.restoreControlledState(a.stateNode,a.type,b)}}var nc={injectFiberControlledHostComponent:function(a){jc=a}};function oc(a){kc?lc?lc.push(a):lc=[a]:kc=a}
	function pc(){if(kc){var a=kc,b=lc;lc=kc=null;mc(a);if(b)for(a=0;a<b.length;a++)mc(b[a])}}var qc=Object.freeze({injection:nc,enqueueStateRestore:oc,restoreStateIfNeeded:pc});function rc(a,b){return a(b)}var sc=!1;function tc(a,b){if(sc)return rc(a,b);sc=!0;try{return rc(a,b)}finally{sc=!1,pc()}}var uc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};
	function vc(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!uc[a.type]:"textarea"===b?!0:!1}function wc(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var xc;l.canUseDOM&&(xc=document.implementation&&document.implementation.hasFeature&&!0!==document.implementation.hasFeature("",""));
	function yc(a,b){if(!l.canUseDOM||b&&!("addEventListener"in document))return!1;b="on"+a;var c=b in document;c||(c=document.createElement("div"),c.setAttribute(b,"return;"),c="function"===typeof c[b]);!c&&xc&&"wheel"===a&&(c=document.implementation.hasFeature("Events.wheel","3.0"));return c}function zc(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
	function Ac(a){var b=zc(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"function"===typeof c.get&&"function"===typeof c.set)return Object.defineProperty(a,b,{enumerable:c.enumerable,configurable:!0,get:function(){return c.get.call(this)},set:function(a){d=""+a;c.set.call(this,a)}}),{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=null;delete a[b]}}}
	function Bc(a){a._valueTracker||(a._valueTracker=Ac(a))}function Cc(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=zc(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}var Dc={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"topBlur topChange topClick topFocus topInput topKeyDown topKeyUp topSelectionChange".split(" ")}};
	function Ec(a,b,c){a=T.getPooled(Dc.change,a,b,c);a.type="change";oc(c);Ab(a);return a}var Fc=null,Gc=null;function Hc(a){kb(a);lb(!1)}function Ic(a){var b=qb(a);if(Cc(b))return a}function Jc(a,b){if("topChange"===a)return b}var Kc=!1;l.canUseDOM&&(Kc=yc("input")&&(!document.documentMode||9<document.documentMode));function Lc(){Fc&&(Fc.detachEvent("onpropertychange",Mc),Gc=Fc=null)}function Mc(a){"value"===a.propertyName&&Ic(Gc)&&(a=Ec(Gc,a,wc(a)),tc(Hc,a))}
	function Nc(a,b,c){"topFocus"===a?(Lc(),Fc=b,Gc=c,Fc.attachEvent("onpropertychange",Mc)):"topBlur"===a&&Lc()}function Oc(a){if("topSelectionChange"===a||"topKeyUp"===a||"topKeyDown"===a)return Ic(Gc)}function Pc(a,b){if("topClick"===a)return Ic(b)}function $c(a,b){if("topInput"===a||"topChange"===a)return Ic(b)}
	var ad={eventTypes:Dc,_isInputEventSupported:Kc,extractEvents:function(a,b,c,d){var e=b?qb(b):window,f=e.nodeName&&e.nodeName.toLowerCase();if("select"===f||"input"===f&&"file"===e.type)var g=Jc;else if(vc(e))if(Kc)g=$c;else{g=Oc;var h=Nc}else f=e.nodeName,!f||"input"!==f.toLowerCase()||"checkbox"!==e.type&&"radio"!==e.type||(g=Pc);if(g&&(g=g(a,b)))return Ec(g,c,d);h&&h(a,e,b);"topBlur"===a&&null!=b&&(a=b._wrapperState||e._wrapperState)&&a.controlled&&"number"===e.type&&(a=""+e.value,e.getAttribute("value")!==
	a&&e.setAttribute("value",a))}};function bd(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(bd,{view:null,detail:null});var cd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function dd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=cd[a])?!!b[a]:!1}function ed(){return dd}function fd(a,b,c,d){return T.call(this,a,b,c,d)}
	bd.augmentClass(fd,{screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:ed,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)}});
	var gd={mouseEnter:{registrationName:"onMouseEnter",dependencies:["topMouseOut","topMouseOver"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["topMouseOut","topMouseOver"]}},hd={eventTypes:gd,extractEvents:function(a,b,c,d){if("topMouseOver"===a&&(c.relatedTarget||c.fromElement)||"topMouseOut"!==a&&"topMouseOver"!==a)return null;var e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||e.parentWindow:window;"topMouseOut"===a?(a=b,b=(b=c.relatedTarget||c.toElement)?pb(b):null):a=null;if(a===
	b)return null;var f=null==a?e:qb(a);e=null==b?e:qb(b);var g=fd.getPooled(gd.mouseLeave,a,c,d);g.type="mouseleave";g.target=f;g.relatedTarget=e;c=fd.getPooled(gd.mouseEnter,b,c,d);c.type="mouseenter";c.target=e;c.relatedTarget=f;Bb(g,c,a,b);return[g,c]}},id=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;function jd(a){a=a.type;return"string"===typeof a?a:"function"===typeof a?a.displayName||a.name:null}
	function kd(a){var b=a;if(a.alternate)for(;b["return"];)b=b["return"];else{if(0!==(b.effectTag&2))return 1;for(;b["return"];)if(b=b["return"],0!==(b.effectTag&2))return 1}return 3===b.tag?2:3}function ld(a){return(a=a._reactInternalFiber)?2===kd(a):!1}function md(a){2!==kd(a)?E("188"):void 0}
	function nd(a){var b=a.alternate;if(!b)return b=kd(a),3===b?E("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c["return"],f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var g=e.child;g;){if(g===c)return md(e),a;if(g===d)return md(e),b;g=g.sibling}E("188")}if(c["return"]!==d["return"])c=e,d=f;else{g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}g?
	void 0:E("189")}}c.alternate!==d?E("190"):void 0}3!==c.tag?E("188"):void 0;return c.stateNode.current===c?a:b}function od(a){a=nd(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b["return"]||b["return"]===a)return null;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}return null}
	function pd(a){a=nd(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child&&4!==b.tag)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b["return"]||b["return"]===a)return null;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}return null}var qd=[];
	function rd(a){var b=a.targetInst;do{if(!b){a.ancestors.push(b);break}var c;for(c=b;c["return"];)c=c["return"];c=3!==c.tag?null:c.stateNode.containerInfo;if(!c)break;a.ancestors.push(b);b=pb(c)}while(b);for(c=0;c<a.ancestors.length;c++)b=a.ancestors[c],sd(a.topLevelType,b,a.nativeEvent,wc(a.nativeEvent))}var td=!0,sd=void 0;function ud(a){td=!!a}function U(a,b,c){return c?ba.listen(c,b,vd.bind(null,a)):null}function wd(a,b,c){return c?ba.capture(c,b,vd.bind(null,a)):null}
	function vd(a,b){if(td){var c=wc(b);c=pb(c);null===c||"number"!==typeof c.tag||2===kd(c)||(c=null);if(qd.length){var d=qd.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{tc(rd,a)}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>qd.length&&qd.push(a)}}}
	var xd=Object.freeze({get _enabled(){return td},get _handleTopLevel(){return sd},setHandleTopLevel:function(a){sd=a},setEnabled:ud,isEnabled:function(){return td},trapBubbledEvent:U,trapCapturedEvent:wd,dispatchEvent:vd});function yd(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;c["ms"+a]="MS"+b;c["O"+a]="o"+b.toLowerCase();return c}
	var zd={animationend:yd("Animation","AnimationEnd"),animationiteration:yd("Animation","AnimationIteration"),animationstart:yd("Animation","AnimationStart"),transitionend:yd("Transition","TransitionEnd")},Ad={},Bd={};l.canUseDOM&&(Bd=document.createElement("div").style,"AnimationEvent"in window||(delete zd.animationend.animation,delete zd.animationiteration.animation,delete zd.animationstart.animation),"TransitionEvent"in window||delete zd.transitionend.transition);
	function Cd(a){if(Ad[a])return Ad[a];if(!zd[a])return a;var b=zd[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Bd)return Ad[a]=b[c];return""}
	var Dd={topAbort:"abort",topAnimationEnd:Cd("animationend")||"animationend",topAnimationIteration:Cd("animationiteration")||"animationiteration",topAnimationStart:Cd("animationstart")||"animationstart",topBlur:"blur",topCancel:"cancel",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topChange:"change",topClick:"click",topClose:"close",topCompositionEnd:"compositionend",topCompositionStart:"compositionstart",topCompositionUpdate:"compositionupdate",topContextMenu:"contextmenu",topCopy:"copy",
	topCut:"cut",topDoubleClick:"dblclick",topDrag:"drag",topDragEnd:"dragend",topDragEnter:"dragenter",topDragExit:"dragexit",topDragLeave:"dragleave",topDragOver:"dragover",topDragStart:"dragstart",topDrop:"drop",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topFocus:"focus",topInput:"input",topKeyDown:"keydown",topKeyPress:"keypress",topKeyUp:"keyup",topLoadedData:"loadeddata",topLoad:"load",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",
	topMouseDown:"mousedown",topMouseMove:"mousemove",topMouseOut:"mouseout",topMouseOver:"mouseover",topMouseUp:"mouseup",topPaste:"paste",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topScroll:"scroll",topSeeked:"seeked",topSeeking:"seeking",topSelectionChange:"selectionchange",topStalled:"stalled",topSuspend:"suspend",topTextInput:"textInput",topTimeUpdate:"timeupdate",topToggle:"toggle",topTouchCancel:"touchcancel",topTouchEnd:"touchend",topTouchMove:"touchmove",
	topTouchStart:"touchstart",topTransitionEnd:Cd("transitionend")||"transitionend",topVolumeChange:"volumechange",topWaiting:"waiting",topWheel:"wheel"},Ed={},Fd=0,Gd="_reactListenersID"+(""+Math.random()).slice(2);function Hd(a){Object.prototype.hasOwnProperty.call(a,Gd)||(a[Gd]=Fd++,Ed[a[Gd]]={});return Ed[a[Gd]]}function Id(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
	function Jd(a,b){var c=Id(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Id(c)}}function Kd(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&"text"===a.type||"textarea"===b||"true"===a.contentEditable)}
	var Ld=l.canUseDOM&&"documentMode"in document&&11>=document.documentMode,Md={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"topBlur topContextMenu topFocus topKeyDown topKeyUp topMouseDown topMouseUp topSelectionChange".split(" ")}},Nd=null,Od=null,Pd=null,Qd=!1;
	function Rd(a,b){if(Qd||null==Nd||Nd!==da())return null;var c=Nd;"selectionStart"in c&&Kd(c)?c={start:c.selectionStart,end:c.selectionEnd}:window.getSelection?(c=window.getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}):c=void 0;return Pd&&ea(Pd,c)?null:(Pd=c,a=T.getPooled(Md.select,Od,a,b),a.type="select",a.target=Nd,Ab(a),a)}
	var Sd={eventTypes:Md,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument,f;if(!(f=!e)){a:{e=Hd(e);f=Sa.onSelect;for(var g=0;g<f.length;g++){var h=f[g];if(!e.hasOwnProperty(h)||!e[h]){e=!1;break a}}e=!0}f=!e}if(f)return null;e=b?qb(b):window;switch(a){case "topFocus":if(vc(e)||"true"===e.contentEditable)Nd=e,Od=b,Pd=null;break;case "topBlur":Pd=Od=Nd=null;break;case "topMouseDown":Qd=!0;break;case "topContextMenu":case "topMouseUp":return Qd=!1,Rd(c,d);case "topSelectionChange":if(Ld)break;
	case "topKeyDown":case "topKeyUp":return Rd(c,d)}return null}};function Td(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(Td,{animationName:null,elapsedTime:null,pseudoElement:null});function Ud(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(Ud,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}});function Vd(a,b,c,d){return T.call(this,a,b,c,d)}bd.augmentClass(Vd,{relatedTarget:null});
	function Wd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;return 32<=a||13===a?a:0}
	var Xd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Yd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
	116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"};function Zd(a,b,c,d){return T.call(this,a,b,c,d)}
	bd.augmentClass(Zd,{key:function(a){if(a.key){var b=Xd[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=Wd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Yd[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:ed,charCode:function(a){return"keypress"===a.type?Wd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
	a.type?Wd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}});function $d(a,b,c,d){return T.call(this,a,b,c,d)}fd.augmentClass($d,{dataTransfer:null});function ae(a,b,c,d){return T.call(this,a,b,c,d)}bd.augmentClass(ae,{touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:ed});function be(a,b,c,d){return T.call(this,a,b,c,d)}T.augmentClass(be,{propertyName:null,elapsedTime:null,pseudoElement:null});
	function ce(a,b,c,d){return T.call(this,a,b,c,d)}fd.augmentClass(ce,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null});var de={},ee={};
	"abort animationEnd animationIteration animationStart blur cancel canPlay canPlayThrough click close contextMenu copy cut doubleClick drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error focus input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing progress rateChange reset scroll seeked seeking stalled submit suspend timeUpdate toggle touchCancel touchEnd touchMove touchStart transitionEnd volumeChange waiting wheel".split(" ").forEach(function(a){var b=a[0].toUpperCase()+
	a.slice(1),c="on"+b;b="top"+b;c={phasedRegistrationNames:{bubbled:c,captured:c+"Capture"},dependencies:[b]};de[a]=c;ee[b]=c});
	var fe={eventTypes:de,extractEvents:function(a,b,c,d){var e=ee[a];if(!e)return null;switch(a){case "topKeyPress":if(0===Wd(c))return null;case "topKeyDown":case "topKeyUp":a=Zd;break;case "topBlur":case "topFocus":a=Vd;break;case "topClick":if(2===c.button)return null;case "topDoubleClick":case "topMouseDown":case "topMouseMove":case "topMouseUp":case "topMouseOut":case "topMouseOver":case "topContextMenu":a=fd;break;case "topDrag":case "topDragEnd":case "topDragEnter":case "topDragExit":case "topDragLeave":case "topDragOver":case "topDragStart":case "topDrop":a=
	$d;break;case "topTouchCancel":case "topTouchEnd":case "topTouchMove":case "topTouchStart":a=ae;break;case "topAnimationEnd":case "topAnimationIteration":case "topAnimationStart":a=Td;break;case "topTransitionEnd":a=be;break;case "topScroll":a=bd;break;case "topWheel":a=ce;break;case "topCopy":case "topCut":case "topPaste":a=Ud;break;default:a=T}b=a.getPooled(e,b,c,d);Ab(b);return b}};sd=function(a,b,c,d){a=jb(a,b,c,d);kb(a);lb(!1)};hb.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
	Wa=sb.getFiberCurrentPropsFromNode;Xa=sb.getInstanceFromNode;Ya=sb.getNodeFromInstance;hb.injectEventPluginsByName({SimpleEventPlugin:fe,EnterLeaveEventPlugin:hd,ChangeEventPlugin:ad,SelectEventPlugin:Sd,BeforeInputEventPlugin:ic});var ge=[],he=-1;function V(a){0>he||(a.current=ge[he],ge[he]=null,he--)}function W(a,b){he++;ge[he]=a.current;a.current=b}new Set;var ie={current:D},X={current:!1},je=D;function ke(a){return le(a)?je:ie.current}
	function me(a,b){var c=a.type.contextTypes;if(!c)return D;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function le(a){return 2===a.tag&&null!=a.type.childContextTypes}function ne(a){le(a)&&(V(X,a),V(ie,a))}
	function oe(a,b,c){null!=ie.cursor?E("168"):void 0;W(ie,b,a);W(X,c,a)}function pe(a,b){var c=a.stateNode,d=a.type.childContextTypes;if("function"!==typeof c.getChildContext)return b;c=c.getChildContext();for(var e in c)e in d?void 0:E("108",jd(a)||"Unknown",e);return B({},b,c)}function qe(a){if(!le(a))return!1;var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||D;je=ie.current;W(ie,b,a);W(X,X.current,a);return!0}
	function re(a,b){var c=a.stateNode;c?void 0:E("169");if(b){var d=pe(a,je);c.__reactInternalMemoizedMergedChildContext=d;V(X,a);V(ie,a);W(ie,d,a)}else V(X,a);W(X,b,a)}
	function Y(a,b,c){this.tag=a;this.key=b;this.stateNode=this.type=null;this.sibling=this.child=this["return"]=null;this.index=0;this.memoizedState=this.updateQueue=this.memoizedProps=this.pendingProps=this.ref=null;this.internalContextTag=c;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.expirationTime=0;this.alternate=null}
	function se(a,b,c){var d=a.alternate;null===d?(d=new Y(a.tag,a.key,a.internalContextTag),d.type=a.type,d.stateNode=a.stateNode,d.alternate=a,a.alternate=d):(d.effectTag=0,d.nextEffect=null,d.firstEffect=null,d.lastEffect=null);d.expirationTime=c;d.pendingProps=b;d.child=a.child;d.memoizedProps=a.memoizedProps;d.memoizedState=a.memoizedState;d.updateQueue=a.updateQueue;d.sibling=a.sibling;d.index=a.index;d.ref=a.ref;return d}
	function te(a,b,c){var d=void 0,e=a.type,f=a.key;"function"===typeof e?(d=e.prototype&&e.prototype.isReactComponent?new Y(2,f,b):new Y(0,f,b),d.type=e,d.pendingProps=a.props):"string"===typeof e?(d=new Y(5,f,b),d.type=e,d.pendingProps=a.props):"object"===typeof e&&null!==e&&"number"===typeof e.tag?(d=e,d.pendingProps=a.props):E("130",null==e?e:typeof e,"");d.expirationTime=c;return d}function ue(a,b,c,d){b=new Y(10,d,b);b.pendingProps=a;b.expirationTime=c;return b}
	function ve(a,b,c){b=new Y(6,null,b);b.pendingProps=a;b.expirationTime=c;return b}function we(a,b,c){b=new Y(7,a.key,b);b.type=a.handler;b.pendingProps=a;b.expirationTime=c;return b}function xe(a,b,c){a=new Y(9,null,b);a.expirationTime=c;return a}function ye(a,b,c){b=new Y(4,a.key,b);b.pendingProps=a.children||[];b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}var ze=null,Ae=null;
	function Be(a){return function(b){try{return a(b)}catch(c){}}}function Ce(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return!0;try{var c=b.inject(a);ze=Be(function(a){return b.onCommitFiberRoot(c,a)});Ae=Be(function(a){return b.onCommitFiberUnmount(c,a)})}catch(d){}return!0}function De(a){"function"===typeof ze&&ze(a)}function Ee(a){"function"===typeof Ae&&Ae(a)}
	function Fe(a){return{baseState:a,expirationTime:0,first:null,last:null,callbackList:null,hasForceUpdate:!1,isInitialized:!1}}function Ge(a,b){null===a.last?a.first=a.last=b:(a.last.next=b,a.last=b);if(0===a.expirationTime||a.expirationTime>b.expirationTime)a.expirationTime=b.expirationTime}
	function He(a,b){var c=a.alternate,d=a.updateQueue;null===d&&(d=a.updateQueue=Fe(null));null!==c?(a=c.updateQueue,null===a&&(a=c.updateQueue=Fe(null))):a=null;a=a!==d?a:null;null===a?Ge(d,b):null===d.last||null===a.last?(Ge(d,b),Ge(a,b)):(Ge(d,b),a.last=b)}function Ie(a,b,c,d){a=a.partialState;return"function"===typeof a?a.call(b,c,d):a}
	function Je(a,b,c,d,e,f){null!==a&&a.updateQueue===c&&(c=b.updateQueue={baseState:c.baseState,expirationTime:c.expirationTime,first:c.first,last:c.last,isInitialized:c.isInitialized,callbackList:null,hasForceUpdate:!1});c.expirationTime=0;c.isInitialized?a=c.baseState:(a=c.baseState=b.memoizedState,c.isInitialized=!0);for(var g=!0,h=c.first,k=!1;null!==h;){var q=h.expirationTime;if(q>f){var v=c.expirationTime;if(0===v||v>q)c.expirationTime=q;k||(k=!0,c.baseState=a)}else{k||(c.first=h.next,null===
	c.first&&(c.last=null));if(h.isReplace)a=Ie(h,d,a,e),g=!0;else if(q=Ie(h,d,a,e))a=g?B({},a,q):B(a,q),g=!1;h.isForced&&(c.hasForceUpdate=!0);null!==h.callback&&(q=c.callbackList,null===q&&(q=c.callbackList=[]),q.push(h))}h=h.next}null!==c.callbackList?b.effectTag|=32:null!==c.first||c.hasForceUpdate||(b.updateQueue=null);k||(c.baseState=a);return a}
	function Ke(a,b){var c=a.callbackList;if(null!==c)for(a.callbackList=null,a=0;a<c.length;a++){var d=c[a],e=d.callback;d.callback=null;"function"!==typeof e?E("191",e):void 0;e.call(b)}}
	function Le(a,b,c,d){function e(a,b){b.updater=f;a.stateNode=b;b._reactInternalFiber=a}var f={isMounted:ld,enqueueSetState:function(c,d,e){c=c._reactInternalFiber;e=void 0===e?null:e;var g=b(c);He(c,{expirationTime:g,partialState:d,callback:e,isReplace:!1,isForced:!1,nextCallback:null,next:null});a(c,g)},enqueueReplaceState:function(c,d,e){c=c._reactInternalFiber;e=void 0===e?null:e;var g=b(c);He(c,{expirationTime:g,partialState:d,callback:e,isReplace:!0,isForced:!1,nextCallback:null,next:null});
	a(c,g)},enqueueForceUpdate:function(c,d){c=c._reactInternalFiber;d=void 0===d?null:d;var e=b(c);He(c,{expirationTime:e,partialState:null,callback:d,isReplace:!1,isForced:!0,nextCallback:null,next:null});a(c,e)}};return{adoptClassInstance:e,constructClassInstance:function(a,b){var c=a.type,d=ke(a),f=2===a.tag&&null!=a.type.contextTypes,g=f?me(a,d):D;b=new c(b,g);e(a,b);f&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=d,a.__reactInternalMemoizedMaskedChildContext=g);return b},mountClassInstance:function(a,
	b){var c=a.alternate,d=a.stateNode,e=d.state||null,g=a.pendingProps;g?void 0:E("158");var h=ke(a);d.props=g;d.state=a.memoizedState=e;d.refs=D;d.context=me(a,h);null!=a.type&&null!=a.type.prototype&&!0===a.type.prototype.unstable_isAsyncReactComponent&&(a.internalContextTag|=1);"function"===typeof d.componentWillMount&&(e=d.state,d.componentWillMount(),e!==d.state&&f.enqueueReplaceState(d,d.state,null),e=a.updateQueue,null!==e&&(d.state=Je(c,a,e,d,g,b)));"function"===typeof d.componentDidMount&&(a.effectTag|=
	4)},updateClassInstance:function(a,b,e){var g=b.stateNode;g.props=b.memoizedProps;g.state=b.memoizedState;var h=b.memoizedProps,k=b.pendingProps;k||(k=h,null==k?E("159"):void 0);var u=g.context,z=ke(b);z=me(b,z);"function"!==typeof g.componentWillReceiveProps||h===k&&u===z||(u=g.state,g.componentWillReceiveProps(k,z),g.state!==u&&f.enqueueReplaceState(g,g.state,null));u=b.memoizedState;e=null!==b.updateQueue?Je(a,b,b.updateQueue,g,k,e):u;if(!(h!==k||u!==e||X.current||null!==b.updateQueue&&b.updateQueue.hasForceUpdate))return"function"!==
	typeof g.componentDidUpdate||h===a.memoizedProps&&u===a.memoizedState||(b.effectTag|=4),!1;var G=k;if(null===h||null!==b.updateQueue&&b.updateQueue.hasForceUpdate)G=!0;else{var I=b.stateNode,L=b.type;G="function"===typeof I.shouldComponentUpdate?I.shouldComponentUpdate(G,e,z):L.prototype&&L.prototype.isPureReactComponent?!ea(h,G)||!ea(u,e):!0}G?("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(k,e,z),"function"===typeof g.componentDidUpdate&&(b.effectTag|=4)):("function"!==typeof g.componentDidUpdate||
	h===a.memoizedProps&&u===a.memoizedState||(b.effectTag|=4),c(b,k),d(b,e));g.props=k;g.state=e;g.context=z;return G}}}var Qe="function"===typeof Symbol&&Symbol["for"],Re=Qe?Symbol["for"]("react.element"):60103,Se=Qe?Symbol["for"]("react.call"):60104,Te=Qe?Symbol["for"]("react.return"):60105,Ue=Qe?Symbol["for"]("react.portal"):60106,Ve=Qe?Symbol["for"]("react.fragment"):60107,We="function"===typeof Symbol&&Symbol.iterator;
	function Xe(a){if(null===a||"undefined"===typeof a)return null;a=We&&a[We]||a["@@iterator"];return"function"===typeof a?a:null}var Ye=Array.isArray;
	function Ze(a,b){var c=b.ref;if(null!==c&&"function"!==typeof c){if(b._owner){b=b._owner;var d=void 0;b&&(2!==b.tag?E("110"):void 0,d=b.stateNode);d?void 0:E("147",c);var e=""+c;if(null!==a&&null!==a.ref&&a.ref._stringRef===e)return a.ref;a=function(a){var b=d.refs===D?d.refs={}:d.refs;null===a?delete b[e]:b[e]=a};a._stringRef=e;return a}"string"!==typeof c?E("148"):void 0;b._owner?void 0:E("149",c)}return c}
	function $e(a,b){"textarea"!==a.type&&E("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"")}
	function af(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b,c){a=se(a,b,c);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
	2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=ve(c,a.internalContextTag,d),b["return"]=a,b;b=e(b,c,d);b["return"]=a;return b}function k(a,b,c,d){if(null!==b&&b.type===c.type)return d=e(b,c.props,d),d.ref=Ze(b,c),d["return"]=a,d;d=te(c,a.internalContextTag,d);d.ref=Ze(b,c);d["return"]=a;return d}function q(a,b,c,d){if(null===b||7!==b.tag)return b=we(c,a.internalContextTag,d),b["return"]=a,b;b=e(b,c,d);
	b["return"]=a;return b}function v(a,b,c,d){if(null===b||9!==b.tag)return b=xe(c,a.internalContextTag,d),b.type=c.value,b["return"]=a,b;b=e(b,null,d);b.type=c.value;b["return"]=a;return b}function y(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=ye(c,a.internalContextTag,d),b["return"]=a,b;b=e(b,c.children||[],d);b["return"]=a;return b}function u(a,b,c,d,f){if(null===b||10!==b.tag)return b=ue(c,a.internalContextTag,
	d,f),b["return"]=a,b;b=e(b,c,d);b["return"]=a;return b}function z(a,b,c){if("string"===typeof b||"number"===typeof b)return b=ve(""+b,a.internalContextTag,c),b["return"]=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case Re:if(b.type===Ve)return b=ue(b.props.children,a.internalContextTag,c,b.key),b["return"]=a,b;c=te(b,a.internalContextTag,c);c.ref=Ze(null,b);c["return"]=a;return c;case Se:return b=we(b,a.internalContextTag,c),b["return"]=a,b;case Te:return c=xe(b,a.internalContextTag,
	c),c.type=b.value,c["return"]=a,c;case Ue:return b=ye(b,a.internalContextTag,c),b["return"]=a,b}if(Ye(b)||Xe(b))return b=ue(b,a.internalContextTag,c,null),b["return"]=a,b;$e(a,b)}return null}function G(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case Re:return c.key===e?c.type===Ve?u(a,b,c.props.children,d,e):k(a,b,c,d):null;case Se:return c.key===e?q(a,b,c,d):null;case Te:return null===
	e?v(a,b,c,d):null;case Ue:return c.key===e?y(a,b,c,d):null}if(Ye(c)||Xe(c))return null!==e?null:u(a,b,c,d,null);$e(a,c)}return null}function I(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case Re:return a=a.get(null===d.key?c:d.key)||null,d.type===Ve?u(b,a,d.props.children,e,d.key):k(b,a,d,e);case Se:return a=a.get(null===d.key?c:d.key)||null,q(b,a,d,e);case Te:return a=a.get(c)||null,v(b,a,d,e);case Ue:return a=
	a.get(null===d.key?c:d.key)||null,y(b,a,d,e)}if(Ye(d)||Xe(d))return a=a.get(c)||null,u(b,a,d,e,null);$e(b,d)}return null}function L(e,g,m,A){for(var h=null,r=null,n=g,w=g=0,k=null;null!==n&&w<m.length;w++){n.index>w?(k=n,n=null):k=n.sibling;var x=G(e,n,m[w],A);if(null===x){null===n&&(n=k);break}a&&n&&null===x.alternate&&b(e,n);g=f(x,g,w);null===r?h=x:r.sibling=x;r=x;n=k}if(w===m.length)return c(e,n),h;if(null===n){for(;w<m.length;w++)if(n=z(e,m[w],A))g=f(n,g,w),null===r?h=n:r.sibling=n,r=n;return h}for(n=
	d(e,n);w<m.length;w++)if(k=I(n,e,w,m[w],A)){if(a&&null!==k.alternate)n["delete"](null===k.key?w:k.key);g=f(k,g,w);null===r?h=k:r.sibling=k;r=k}a&&n.forEach(function(a){return b(e,a)});return h}function N(e,g,m,A){var h=Xe(m);"function"!==typeof h?E("150"):void 0;m=h.call(m);null==m?E("151"):void 0;for(var r=h=null,n=g,w=g=0,k=null,x=m.next();null!==n&&!x.done;w++,x=m.next()){n.index>w?(k=n,n=null):k=n.sibling;var J=G(e,n,x.value,A);if(null===J){n||(n=k);break}a&&n&&null===J.alternate&&b(e,n);g=f(J,
	g,w);null===r?h=J:r.sibling=J;r=J;n=k}if(x.done)return c(e,n),h;if(null===n){for(;!x.done;w++,x=m.next())x=z(e,x.value,A),null!==x&&(g=f(x,g,w),null===r?h=x:r.sibling=x,r=x);return h}for(n=d(e,n);!x.done;w++,x=m.next())if(x=I(n,e,w,x.value,A),null!==x){if(a&&null!==x.alternate)n["delete"](null===x.key?w:x.key);g=f(x,g,w);null===r?h=x:r.sibling=x;r=x}a&&n.forEach(function(a){return b(e,a)});return h}return function(a,d,f,h){"object"===typeof f&&null!==f&&f.type===Ve&&null===f.key&&(f=f.props.children);
	var m="object"===typeof f&&null!==f;if(m)switch(f.$$typeof){case Re:a:{var r=f.key;for(m=d;null!==m;){if(m.key===r)if(10===m.tag?f.type===Ve:m.type===f.type){c(a,m.sibling);d=e(m,f.type===Ve?f.props.children:f.props,h);d.ref=Ze(m,f);d["return"]=a;a=d;break a}else{c(a,m);break}else b(a,m);m=m.sibling}f.type===Ve?(d=ue(f.props.children,a.internalContextTag,h,f.key),d["return"]=a,a=d):(h=te(f,a.internalContextTag,h),h.ref=Ze(d,f),h["return"]=a,a=h)}return g(a);case Se:a:{for(m=f.key;null!==d;){if(d.key===
	m)if(7===d.tag){c(a,d.sibling);d=e(d,f,h);d["return"]=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=we(f,a.internalContextTag,h);d["return"]=a;a=d}return g(a);case Te:a:{if(null!==d)if(9===d.tag){c(a,d.sibling);d=e(d,null,h);d.type=f.value;d["return"]=a;a=d;break a}else c(a,d);d=xe(f,a.internalContextTag,h);d.type=f.value;d["return"]=a;a=d}return g(a);case Ue:a:{for(m=f.key;null!==d;){if(d.key===m)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===
	f.implementation){c(a,d.sibling);d=e(d,f.children||[],h);d["return"]=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=ye(f,a.internalContextTag,h);d["return"]=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f,h)):(c(a,d),d=ve(f,a.internalContextTag,h)),d["return"]=a,a=d,g(a);if(Ye(f))return L(a,d,f,h);if(Xe(f))return N(a,d,f,h);m&&$e(a,f);if("undefined"===typeof f)switch(a.tag){case 2:case 1:h=a.type,E("152",h.displayName||
	h.name||"Component")}return c(a,d)}}var bf=af(!0),cf=af(!1);
	function df(a,b,c,d,e){function f(a,b,c){var d=b.expirationTime;b.child=null===a?cf(b,null,c,d):bf(b,a.child,c,d)}function g(a,b){var c=b.ref;null===c||a&&a.ref===c||(b.effectTag|=128)}function h(a,b,c,d){g(a,b);if(!c)return d&&re(b,!1),q(a,b);c=b.stateNode;id.current=b;var e=c.render();b.effectTag|=1;f(a,b,e);b.memoizedState=c.state;b.memoizedProps=c.props;d&&re(b,!0);return b.child}function k(a){var b=a.stateNode;b.pendingContext?oe(a,b.pendingContext,b.pendingContext!==b.context):b.context&&oe(a,
	b.context,!1);I(a,b.containerInfo)}function q(a,b){null!==a&&b.child!==a.child?E("153"):void 0;if(null!==b.child){a=b.child;var c=se(a,a.pendingProps,a.expirationTime);b.child=c;for(c["return"]=b;null!==a.sibling;)a=a.sibling,c=c.sibling=se(a,a.pendingProps,a.expirationTime),c["return"]=b;c.sibling=null}return b.child}function v(a,b){switch(b.tag){case 3:k(b);break;case 2:qe(b);break;case 4:I(b,b.stateNode.containerInfo)}return null}var y=a.shouldSetTextContent,u=a.useSyncScheduling,z=a.shouldDeprioritizeSubtree,
	G=b.pushHostContext,I=b.pushHostContainer,L=c.enterHydrationState,N=c.resetHydrationState,J=c.tryToClaimNextHydratableInstance;a=Le(d,e,function(a,b){a.memoizedProps=b},function(a,b){a.memoizedState=b});var w=a.adoptClassInstance,m=a.constructClassInstance,A=a.mountClassInstance,Ob=a.updateClassInstance;return{beginWork:function(a,b,c){if(0===b.expirationTime||b.expirationTime>c)return v(a,b);switch(b.tag){case 0:null!==a?E("155"):void 0;var d=b.type,e=b.pendingProps,r=ke(b);r=me(b,r);d=d(e,r);b.effectTag|=
	1;"object"===typeof d&&null!==d&&"function"===typeof d.render?(b.tag=2,e=qe(b),w(b,d),A(b,c),b=h(a,b,!0,e)):(b.tag=1,f(a,b,d),b.memoizedProps=e,b=b.child);return b;case 1:a:{e=b.type;c=b.pendingProps;d=b.memoizedProps;if(X.current)null===c&&(c=d);else if(null===c||d===c){b=q(a,b);break a}d=ke(b);d=me(b,d);e=e(c,d);b.effectTag|=1;f(a,b,e);b.memoizedProps=c;b=b.child}return b;case 2:return e=qe(b),d=void 0,null===a?b.stateNode?E("153"):(m(b,b.pendingProps),A(b,c),d=!0):d=Ob(a,b,c),h(a,b,d,e);case 3:return k(b),
	e=b.updateQueue,null!==e?(d=b.memoizedState,e=Je(a,b,e,null,null,c),d===e?(N(),b=q(a,b)):(d=e.element,r=b.stateNode,(null===a||null===a.child)&&r.hydrate&&L(b)?(b.effectTag|=2,b.child=cf(b,null,d,c)):(N(),f(a,b,d)),b.memoizedState=e,b=b.child)):(N(),b=q(a,b)),b;case 5:G(b);null===a&&J(b);e=b.type;var n=b.memoizedProps;d=b.pendingProps;null===d&&(d=n,null===d?E("154"):void 0);r=null!==a?a.memoizedProps:null;X.current||null!==d&&n!==d?(n=d.children,y(e,d)?n=null:r&&y(e,r)&&(b.effectTag|=16),g(a,b),
	2147483647!==c&&!u&&z(e,d)?(b.expirationTime=2147483647,b=null):(f(a,b,n),b.memoizedProps=d,b=b.child)):b=q(a,b);return b;case 6:return null===a&&J(b),a=b.pendingProps,null===a&&(a=b.memoizedProps),b.memoizedProps=a,null;case 8:b.tag=7;case 7:e=b.pendingProps;if(X.current)null===e&&(e=a&&a.memoizedProps,null===e?E("154"):void 0);else if(null===e||b.memoizedProps===e)e=b.memoizedProps;d=e.children;b.stateNode=null===a?cf(b,b.stateNode,d,c):bf(b,b.stateNode,d,c);b.memoizedProps=e;return b.stateNode;
	case 9:return null;case 4:a:{I(b,b.stateNode.containerInfo);e=b.pendingProps;if(X.current)null===e&&(e=a&&a.memoizedProps,null==e?E("154"):void 0);else if(null===e||b.memoizedProps===e){b=q(a,b);break a}null===a?b.child=bf(b,null,e,c):f(a,b,e);b.memoizedProps=e;b=b.child}return b;case 10:a:{c=b.pendingProps;if(X.current)null===c&&(c=b.memoizedProps);else if(null===c||b.memoizedProps===c){b=q(a,b);break a}f(a,b,c);b.memoizedProps=c;b=b.child}return b;default:E("156")}},beginFailedWork:function(a,b,
	c){switch(b.tag){case 2:qe(b);break;case 3:k(b);break;default:E("157")}b.effectTag|=64;null===a?b.child=null:b.child!==a.child&&(b.child=a.child);if(0===b.expirationTime||b.expirationTime>c)return v(a,b);b.firstEffect=null;b.lastEffect=null;b.child=null===a?cf(b,null,null,c):bf(b,a.child,null,c);2===b.tag&&(a=b.stateNode,b.memoizedProps=a.props,b.memoizedState=a.state);return b.child}}}
	function ef(a,b,c){function d(a){a.effectTag|=4}var e=a.createInstance,f=a.createTextInstance,g=a.appendInitialChild,h=a.finalizeInitialChildren,k=a.prepareUpdate,q=a.persistence,v=b.getRootHostContainer,y=b.popHostContext,u=b.getHostContext,z=b.popHostContainer,G=c.prepareToHydrateHostInstance,I=c.prepareToHydrateHostTextInstance,L=c.popHydrationState,N=void 0,J=void 0,w=void 0;a.mutation?(N=function(){},J=function(a,b,c){(b.updateQueue=c)&&d(b)},w=function(a,b,c,e){c!==e&&d(b)}):q?E("235"):E("236");
	return{completeWork:function(a,b,c){var m=b.pendingProps;if(null===m)m=b.memoizedProps;else if(2147483647!==b.expirationTime||2147483647===c)b.pendingProps=null;switch(b.tag){case 1:return null;case 2:return ne(b),null;case 3:z(b);V(X,b);V(ie,b);m=b.stateNode;m.pendingContext&&(m.context=m.pendingContext,m.pendingContext=null);if(null===a||null===a.child)L(b),b.effectTag&=-3;N(b);return null;case 5:y(b);c=v();var A=b.type;if(null!==a&&null!=b.stateNode){var p=a.memoizedProps,q=b.stateNode,x=u();q=
	k(q,A,p,m,c,x);J(a,b,q,A,p,m,c);a.ref!==b.ref&&(b.effectTag|=128)}else{if(!m)return null===b.stateNode?E("166"):void 0,null;a=u();if(L(b))G(b,c,a)&&d(b);else{a=e(A,m,c,a,b);a:for(p=b.child;null!==p;){if(5===p.tag||6===p.tag)g(a,p.stateNode);else if(4!==p.tag&&null!==p.child){p.child["return"]=p;p=p.child;continue}if(p===b)break;for(;null===p.sibling;){if(null===p["return"]||p["return"]===b)break a;p=p["return"]}p.sibling["return"]=p["return"];p=p.sibling}h(a,A,m,c)&&d(b);b.stateNode=a}null!==b.ref&&
	(b.effectTag|=128)}return null;case 6:if(a&&null!=b.stateNode)w(a,b,a.memoizedProps,m);else{if("string"!==typeof m)return null===b.stateNode?E("166"):void 0,null;a=v();c=u();L(b)?I(b)&&d(b):b.stateNode=f(m,a,c,b)}return null;case 7:(m=b.memoizedProps)?void 0:E("165");b.tag=8;A=[];a:for((p=b.stateNode)&&(p["return"]=b);null!==p;){if(5===p.tag||6===p.tag||4===p.tag)E("247");else if(9===p.tag)A.push(p.type);else if(null!==p.child){p.child["return"]=p;p=p.child;continue}for(;null===p.sibling;){if(null===
	p["return"]||p["return"]===b)break a;p=p["return"]}p.sibling["return"]=p["return"];p=p.sibling}p=m.handler;m=p(m.props,A);b.child=bf(b,null!==a?a.child:null,m,c);return b.child;case 8:return b.tag=7,null;case 9:return null;case 10:return null;case 4:return z(b),N(b),null;case 0:E("167");default:E("156")}}}}
	function ff(a,b){function c(a){var c=a.ref;if(null!==c)try{c(null)}catch(A){b(a,A)}}function d(a){"function"===typeof Ee&&Ee(a);switch(a.tag){case 2:c(a);var d=a.stateNode;if("function"===typeof d.componentWillUnmount)try{d.props=a.memoizedProps,d.state=a.memoizedState,d.componentWillUnmount()}catch(A){b(a,A)}break;case 5:c(a);break;case 7:e(a.stateNode);break;case 4:k&&g(a)}}function e(a){for(var b=a;;)if(d(b),null===b.child||k&&4===b.tag){if(b===a)break;for(;null===b.sibling;){if(null===b["return"]||
	b["return"]===a)return;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}else b.child["return"]=b,b=b.child}function f(a){return 5===a.tag||3===a.tag||4===a.tag}function g(a){for(var b=a,c=!1,f=void 0,g=void 0;;){if(!c){c=b["return"];a:for(;;){null===c?E("160"):void 0;switch(c.tag){case 5:f=c.stateNode;g=!1;break a;case 3:f=c.stateNode.containerInfo;g=!0;break a;case 4:f=c.stateNode.containerInfo;g=!0;break a}c=c["return"]}c=!0}if(5===b.tag||6===b.tag)e(b),g?J(f,b.stateNode):N(f,b.stateNode);
	else if(4===b.tag?f=b.stateNode.containerInfo:d(b),null!==b.child){b.child["return"]=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b["return"]||b["return"]===a)return;b=b["return"];4===b.tag&&(c=!1)}b.sibling["return"]=b["return"];b=b.sibling}}var h=a.getPublicInstance,k=a.mutation;a=a.persistence;k||(a?E("235"):E("236"));var q=k.commitMount,v=k.commitUpdate,y=k.resetTextContent,u=k.commitTextUpdate,z=k.appendChild,G=k.appendChildToContainer,I=k.insertBefore,L=k.insertInContainerBefore,
	N=k.removeChild,J=k.removeChildFromContainer;return{commitResetTextContent:function(a){y(a.stateNode)},commitPlacement:function(a){a:{for(var b=a["return"];null!==b;){if(f(b)){var c=b;break a}b=b["return"]}E("160");c=void 0}var d=b=void 0;switch(c.tag){case 5:b=c.stateNode;d=!1;break;case 3:b=c.stateNode.containerInfo;d=!0;break;case 4:b=c.stateNode.containerInfo;d=!0;break;default:E("161")}c.effectTag&16&&(y(b),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c["return"]||f(c["return"])){c=
	null;break a}c=c["return"]}c.sibling["return"]=c["return"];for(c=c.sibling;5!==c.tag&&6!==c.tag;){if(c.effectTag&2)continue b;if(null===c.child||4===c.tag)continue b;else c.child["return"]=c,c=c.child}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){if(5===e.tag||6===e.tag)c?d?L(b,e.stateNode,c):I(b,e.stateNode,c):d?G(b,e.stateNode):z(b,e.stateNode);else if(4!==e.tag&&null!==e.child){e.child["return"]=e;e=e.child;continue}if(e===a)break;for(;null===e.sibling;){if(null===e["return"]||e["return"]===
	a)return;e=e["return"]}e.sibling["return"]=e["return"];e=e.sibling}},commitDeletion:function(a){g(a);a["return"]=null;a.child=null;a.alternate&&(a.alternate.child=null,a.alternate["return"]=null)},commitWork:function(a,b){switch(b.tag){case 2:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&v(c,f,e,a,d,b)}break;case 6:null===b.stateNode?E("162"):void 0;c=b.memoizedProps;u(b.stateNode,null!==a?a.memoizedProps:
	c,c);break;case 3:break;default:E("163")}},commitLifeCycles:function(a,b){switch(b.tag){case 2:var c=b.stateNode;if(b.effectTag&4)if(null===a)c.props=b.memoizedProps,c.state=b.memoizedState,c.componentDidMount();else{var d=a.memoizedProps;a=a.memoizedState;c.props=b.memoizedProps;c.state=b.memoizedState;c.componentDidUpdate(d,a)}b=b.updateQueue;null!==b&&Ke(b,c);break;case 3:c=b.updateQueue;null!==c&&Ke(c,null!==b.child?b.child.stateNode:null);break;case 5:c=b.stateNode;null===a&&b.effectTag&4&&q(c,
	b.type,b.memoizedProps,b);break;case 6:break;case 4:break;default:E("163")}},commitAttachRef:function(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:b(h(c));break;default:b(c)}}},commitDetachRef:function(a){a=a.ref;null!==a&&a(null)}}}var gf={};
	function hf(a){function b(a){a===gf?E("174"):void 0;return a}var c=a.getChildHostContext,d=a.getRootHostContext,e={current:gf},f={current:gf},g={current:gf};return{getHostContext:function(){return b(e.current)},getRootHostContainer:function(){return b(g.current)},popHostContainer:function(a){V(e,a);V(f,a);V(g,a)},popHostContext:function(a){f.current===a&&(V(e,a),V(f,a))},pushHostContainer:function(a,b){W(g,b,a);b=d(b);W(f,a,a);W(e,b,a)},pushHostContext:function(a){var d=b(g.current),h=b(e.current);
	d=c(h,a.type,d);h!==d&&(W(f,a,a),W(e,d,a))},resetHostContainer:function(){e.current=gf;g.current=gf}}}
	function jf(a){function b(a,b){var c=new Y(5,null,0);c.type="DELETED";c.stateNode=b;c["return"]=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}function c(a,b){switch(a.tag){case 5:return b=f(b,a.type,a.pendingProps),null!==b?(a.stateNode=b,!0):!1;case 6:return b=g(b,a.pendingProps),null!==b?(a.stateNode=b,!0):!1;default:return!1}}function d(a){for(a=a["return"];null!==a&&5!==a.tag&&3!==a.tag;)a=a["return"];y=a}var e=a.shouldSetTextContent;
	a=a.hydration;if(!a)return{enterHydrationState:function(){return!1},resetHydrationState:function(){},tryToClaimNextHydratableInstance:function(){},prepareToHydrateHostInstance:function(){E("175")},prepareToHydrateHostTextInstance:function(){E("176")},popHydrationState:function(){return!1}};var f=a.canHydrateInstance,g=a.canHydrateTextInstance,h=a.getNextHydratableSibling,k=a.getFirstHydratableChild,q=a.hydrateInstance,v=a.hydrateTextInstance,y=null,u=null,z=!1;return{enterHydrationState:function(a){u=
	k(a.stateNode.containerInfo);y=a;return z=!0},resetHydrationState:function(){u=y=null;z=!1},tryToClaimNextHydratableInstance:function(a){if(z){var d=u;if(d){if(!c(a,d)){d=h(d);if(!d||!c(a,d)){a.effectTag|=2;z=!1;y=a;return}b(y,u)}y=a;u=k(d)}else a.effectTag|=2,z=!1,y=a}},prepareToHydrateHostInstance:function(a,b,c){b=q(a.stateNode,a.type,a.memoizedProps,b,c,a);a.updateQueue=b;return null!==b?!0:!1},prepareToHydrateHostTextInstance:function(a){return v(a.stateNode,a.memoizedProps,a)},popHydrationState:function(a){if(a!==
	y)return!1;if(!z)return d(a),z=!0,!1;var c=a.type;if(5!==a.tag||"head"!==c&&"body"!==c&&!e(c,a.memoizedProps))for(c=u;c;)b(a,c),c=h(c);d(a);u=y?h(a.stateNode):null;return!0}}}
	function kf(a){function b(a){Qb=ja=!0;var b=a.stateNode;b.current===a?E("177"):void 0;b.isReadyForCommit=!1;id.current=null;if(1<a.effectTag)if(null!==a.lastEffect){a.lastEffect.nextEffect=a;var c=a.firstEffect}else c=a;else c=a.firstEffect;yg();for(t=c;null!==t;){var d=!1,e=void 0;try{for(;null!==t;){var f=t.effectTag;f&16&&zg(t);if(f&128){var g=t.alternate;null!==g&&Ag(g)}switch(f&-242){case 2:Ne(t);t.effectTag&=-3;break;case 6:Ne(t);t.effectTag&=-3;Oe(t.alternate,t);break;case 4:Oe(t.alternate,
	t);break;case 8:Sc=!0,Bg(t),Sc=!1}t=t.nextEffect}}catch(Tc){d=!0,e=Tc}d&&(null===t?E("178"):void 0,h(t,e),null!==t&&(t=t.nextEffect))}Cg();b.current=a;for(t=c;null!==t;){c=!1;d=void 0;try{for(;null!==t;){var k=t.effectTag;k&36&&Dg(t.alternate,t);k&128&&Eg(t);if(k&64)switch(e=t,f=void 0,null!==R&&(f=R.get(e),R["delete"](e),null==f&&null!==e.alternate&&(e=e.alternate,f=R.get(e),R["delete"](e))),null==f?E("184"):void 0,e.tag){case 2:e.stateNode.componentDidCatch(f.error,{componentStack:f.componentStack});
	break;case 3:null===ca&&(ca=f.error);break;default:E("157")}var Qc=t.nextEffect;t.nextEffect=null;t=Qc}}catch(Tc){c=!0,d=Tc}c&&(null===t?E("178"):void 0,h(t,d),null!==t&&(t=t.nextEffect))}ja=Qb=!1;"function"===typeof De&&De(a.stateNode);ha&&(ha.forEach(G),ha=null);null!==ca&&(a=ca,ca=null,Ob(a));b=b.current.expirationTime;0===b&&(qa=R=null);return b}function c(a){for(;;){var b=Fg(a.alternate,a,H),c=a["return"],d=a.sibling;var e=a;if(2147483647===H||2147483647!==e.expirationTime){if(2!==e.tag&&3!==
	e.tag)var f=0;else f=e.updateQueue,f=null===f?0:f.expirationTime;for(var g=e.child;null!==g;)0!==g.expirationTime&&(0===f||f>g.expirationTime)&&(f=g.expirationTime),g=g.sibling;e.expirationTime=f}if(null!==b)return b;null!==c&&(null===c.firstEffect&&(c.firstEffect=a.firstEffect),null!==a.lastEffect&&(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),1<a.effectTag&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));if(null!==d)return d;
	if(null!==c)a=c;else{a.stateNode.isReadyForCommit=!0;break}}return null}function d(a){var b=rg(a.alternate,a,H);null===b&&(b=c(a));id.current=null;return b}function e(a){var b=Gg(a.alternate,a,H);null===b&&(b=c(a));id.current=null;return b}function f(a){if(null!==R){if(!(0===H||H>a))if(H<=Uc)for(;null!==F;)F=k(F)?e(F):d(F);else for(;null!==F&&!A();)F=k(F)?e(F):d(F)}else if(!(0===H||H>a))if(H<=Uc)for(;null!==F;)F=d(F);else for(;null!==F&&!A();)F=d(F)}function g(a,b){ja?E("243"):void 0;ja=!0;a.isReadyForCommit=
	!1;if(a!==ra||b!==H||null===F){for(;-1<he;)ge[he]=null,he--;je=D;ie.current=D;X.current=!1;x();ra=a;H=b;F=se(ra.current,null,b)}var c=!1,d=null;try{f(b)}catch(Rc){c=!0,d=Rc}for(;c;){if(eb){ca=d;break}var g=F;if(null===g)eb=!0;else{var k=h(g,d);null===k?E("183"):void 0;if(!eb){try{c=k;d=b;for(k=c;null!==g;){switch(g.tag){case 2:ne(g);break;case 5:qg(g);break;case 3:p(g);break;case 4:p(g)}if(g===k||g.alternate===k)break;g=g["return"]}F=e(c);f(d)}catch(Rc){c=!0;d=Rc;continue}break}}}b=ca;eb=ja=!1;ca=
	null;null!==b&&Ob(b);return a.isReadyForCommit?a.current.alternate:null}function h(a,b){var c=id.current=null,d=!1,e=!1,f=null;if(3===a.tag)c=a,q(a)&&(eb=!0);else for(var g=a["return"];null!==g&&null===c;){2===g.tag?"function"===typeof g.stateNode.componentDidCatch&&(d=!0,f=jd(g),c=g,e=!0):3===g.tag&&(c=g);if(q(g)){if(Sc||null!==ha&&(ha.has(g)||null!==g.alternate&&ha.has(g.alternate)))return null;c=null;e=!1}g=g["return"]}if(null!==c){null===qa&&(qa=new Set);qa.add(c);var h="";g=a;do{a:switch(g.tag){case 0:case 1:case 2:case 5:var k=
	g._debugOwner,Qc=g._debugSource;var m=jd(g);var n=null;k&&(n=jd(k));k=Qc;m="\n    in "+(m||"Unknown")+(k?" (at "+k.fileName.replace(/^.*[\\\/]/,"")+":"+k.lineNumber+")":n?" (created by "+n+")":"");break a;default:m=""}h+=m;g=g["return"]}while(g);g=h;a=jd(a);null===R&&(R=new Map);b={componentName:a,componentStack:g,error:b,errorBoundary:d?c.stateNode:null,errorBoundaryFound:d,errorBoundaryName:f,willRetry:e};R.set(c,b);try{var p=b.error;p&&p.suppressReactErrorLogging||console.error(p)}catch(Vc){Vc&&
	Vc.suppressReactErrorLogging||console.error(Vc)}Qb?(null===ha&&(ha=new Set),ha.add(c)):G(c);return c}null===ca&&(ca=b);return null}function k(a){return null!==R&&(R.has(a)||null!==a.alternate&&R.has(a.alternate))}function q(a){return null!==qa&&(qa.has(a)||null!==a.alternate&&qa.has(a.alternate))}function v(){return 20*(((I()+100)/20|0)+1)}function y(a){return 0!==ka?ka:ja?Qb?1:H:!Hg||a.internalContextTag&1?v():1}function u(a,b){return z(a,b,!1)}function z(a,b){for(;null!==a;){if(0===a.expirationTime||
	a.expirationTime>b)a.expirationTime=b;null!==a.alternate&&(0===a.alternate.expirationTime||a.alternate.expirationTime>b)&&(a.alternate.expirationTime=b);if(null===a["return"])if(3===a.tag){var c=a.stateNode;!ja&&c===ra&&b<H&&(F=ra=null,H=0);var d=c,e=b;Rb>Ig&&E("185");if(null===d.nextScheduledRoot)d.remainingExpirationTime=e,null===O?(sa=O=d,d.nextScheduledRoot=d):(O=O.nextScheduledRoot=d,O.nextScheduledRoot=sa);else{var f=d.remainingExpirationTime;if(0===f||e<f)d.remainingExpirationTime=e}Fa||(la?
	Sb&&(ma=d,na=1,m(ma,na)):1===e?w(1,null):L(e));!ja&&c===ra&&b<H&&(F=ra=null,H=0)}else break;a=a["return"]}}function G(a){z(a,1,!0)}function I(){return Uc=((Wc()-Pe)/10|0)+2}function L(a){if(0!==Tb){if(a>Tb)return;Jg(Xc)}var b=Wc()-Pe;Tb=a;Xc=Kg(J,{timeout:10*(a-2)-b})}function N(){var a=0,b=null;if(null!==O)for(var c=O,d=sa;null!==d;){var e=d.remainingExpirationTime;if(0===e){null===c||null===O?E("244"):void 0;if(d===d.nextScheduledRoot){sa=O=d.nextScheduledRoot=null;break}else if(d===sa)sa=e=d.nextScheduledRoot,
	O.nextScheduledRoot=e,d.nextScheduledRoot=null;else if(d===O){O=c;O.nextScheduledRoot=sa;d.nextScheduledRoot=null;break}else c.nextScheduledRoot=d.nextScheduledRoot,d.nextScheduledRoot=null;d=c.nextScheduledRoot}else{if(0===a||e<a)a=e,b=d;if(d===O)break;c=d;d=d.nextScheduledRoot}}c=ma;null!==c&&c===b?Rb++:Rb=0;ma=b;na=a}function J(a){w(0,a)}function w(a,b){fb=b;for(N();null!==ma&&0!==na&&(0===a||na<=a)&&!Yc;)m(ma,na),N();null!==fb&&(Tb=0,Xc=-1);0!==na&&L(na);fb=null;Yc=!1;Rb=0;if(Ub)throw a=Zc,Zc=
	null,Ub=!1,a;}function m(a,c){Fa?E("245"):void 0;Fa=!0;if(c<=I()){var d=a.finishedWork;null!==d?(a.finishedWork=null,a.remainingExpirationTime=b(d)):(a.finishedWork=null,d=g(a,c),null!==d&&(a.remainingExpirationTime=b(d)))}else d=a.finishedWork,null!==d?(a.finishedWork=null,a.remainingExpirationTime=b(d)):(a.finishedWork=null,d=g(a,c),null!==d&&(A()?a.finishedWork=d:a.remainingExpirationTime=b(d)));Fa=!1}function A(){return null===fb||fb.timeRemaining()>Lg?!1:Yc=!0}function Ob(a){null===ma?E("246"):
	void 0;ma.remainingExpirationTime=0;Ub||(Ub=!0,Zc=a)}var r=hf(a),n=jf(a),p=r.popHostContainer,qg=r.popHostContext,x=r.resetHostContainer,Me=df(a,r,n,u,y),rg=Me.beginWork,Gg=Me.beginFailedWork,Fg=ef(a,r,n).completeWork;r=ff(a,h);var zg=r.commitResetTextContent,Ne=r.commitPlacement,Bg=r.commitDeletion,Oe=r.commitWork,Dg=r.commitLifeCycles,Eg=r.commitAttachRef,Ag=r.commitDetachRef,Wc=a.now,Kg=a.scheduleDeferredCallback,Jg=a.cancelDeferredCallback,Hg=a.useSyncScheduling,yg=a.prepareForCommit,Cg=a.resetAfterCommit,
	Pe=Wc(),Uc=2,ka=0,ja=!1,F=null,ra=null,H=0,t=null,R=null,qa=null,ha=null,ca=null,eb=!1,Qb=!1,Sc=!1,sa=null,O=null,Tb=0,Xc=-1,Fa=!1,ma=null,na=0,Yc=!1,Ub=!1,Zc=null,fb=null,la=!1,Sb=!1,Ig=1E3,Rb=0,Lg=1;return{computeAsyncExpiration:v,computeExpirationForFiber:y,scheduleWork:u,batchedUpdates:function(a,b){var c=la;la=!0;try{return a(b)}finally{(la=c)||Fa||w(1,null)}},unbatchedUpdates:function(a){if(la&&!Sb){Sb=!0;try{return a()}finally{Sb=!1}}return a()},flushSync:function(a){var b=la;la=!0;try{a:{var c=
	ka;ka=1;try{var d=a();break a}finally{ka=c}d=void 0}return d}finally{la=b,Fa?E("187"):void 0,w(1,null)}},deferredUpdates:function(a){var b=ka;ka=v();try{return a()}finally{ka=b}}}}
	function lf(a){function b(a){a=od(a);return null===a?null:a.stateNode}var c=a.getPublicInstance;a=kf(a);var d=a.computeAsyncExpiration,e=a.computeExpirationForFiber,f=a.scheduleWork;return{createContainer:function(a,b){var c=new Y(3,null,0);a={current:c,containerInfo:a,pendingChildren:null,remainingExpirationTime:0,isReadyForCommit:!1,finishedWork:null,context:null,pendingContext:null,hydrate:b,nextScheduledRoot:null};return c.stateNode=a},updateContainer:function(a,b,c,q){var g=b.current;if(c){c=
	c._reactInternalFiber;var h;b:{2===kd(c)&&2===c.tag?void 0:E("170");for(h=c;3!==h.tag;){if(le(h)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}(h=h["return"])?void 0:E("171")}h=h.stateNode.context}c=le(c)?pe(c,h):h}else c=D;null===b.context?b.context=c:b.pendingContext=c;b=q;b=void 0===b?null:b;q=null!=a&&null!=a.type&&null!=a.type.prototype&&!0===a.type.prototype.unstable_isAsyncReactComponent?d():e(g);He(g,{expirationTime:q,partialState:{element:a},callback:b,isReplace:!1,isForced:!1,
	nextCallback:null,next:null});f(g,q)},batchedUpdates:a.batchedUpdates,unbatchedUpdates:a.unbatchedUpdates,deferredUpdates:a.deferredUpdates,flushSync:a.flushSync,getPublicRootInstance:function(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return c(a.child.stateNode);default:return a.child.stateNode}},findHostInstance:b,findHostInstanceWithNoPortals:function(a){a=pd(a);return null===a?null:a.stateNode},injectIntoDevTools:function(a){var c=a.findFiberByHostInstance;return Ce(B({},
	a,{findHostInstanceByFiber:function(a){return b(a)},findFiberByHostInstance:function(a){return c?c(a):null}}))}}}var mf=Object.freeze({default:lf}),nf=mf&&lf||mf,of=nf["default"]?nf["default"]:nf;function pf(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:Ue,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}var qf="object"===typeof performance&&"function"===typeof performance.now,rf=void 0;rf=qf?function(){return performance.now()}:function(){return Date.now()};
	var sf=void 0,tf=void 0;
	if(l.canUseDOM)if("function"!==typeof requestIdleCallback||"function"!==typeof cancelIdleCallback){var uf=null,vf=!1,wf=-1,xf=!1,yf=0,zf=33,Af=33,Bf;Bf=qf?{didTimeout:!1,timeRemaining:function(){var a=yf-performance.now();return 0<a?a:0}}:{didTimeout:!1,timeRemaining:function(){var a=yf-Date.now();return 0<a?a:0}};var Cf="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",function(a){if(a.source===window&&a.data===Cf){vf=!1;a=rf();if(0>=yf-a)if(-1!==wf&&wf<=
	a)Bf.didTimeout=!0;else{xf||(xf=!0,requestAnimationFrame(Df));return}else Bf.didTimeout=!1;wf=-1;a=uf;uf=null;null!==a&&a(Bf)}},!1);var Df=function(a){xf=!1;var b=a-yf+Af;b<Af&&zf<Af?(8>b&&(b=8),Af=b<zf?zf:b):zf=b;yf=a+Af;vf||(vf=!0,window.postMessage(Cf,"*"))};sf=function(a,b){uf=a;null!=b&&"number"===typeof b.timeout&&(wf=rf()+b.timeout);xf||(xf=!0,requestAnimationFrame(Df));return 0};tf=function(){uf=null;vf=!1;wf=-1}}else sf=window.requestIdleCallback,tf=window.cancelIdleCallback;else sf=function(a){return setTimeout(function(){a({timeRemaining:function(){return Infinity}})})},
	tf=function(a){clearTimeout(a)};var Ef=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ff={},Gf={};
	function Hf(a){if(Gf.hasOwnProperty(a))return!0;if(Ff.hasOwnProperty(a))return!1;if(Ef.test(a))return Gf[a]=!0;Ff[a]=!0;return!1}
	function If(a,b,c){var d=wa(b);if(d&&va(b,c)){var e=d.mutationMethod;e?e(a,c):null==c||d.hasBooleanValue&&!c||d.hasNumericValue&&isNaN(c)||d.hasPositiveNumericValue&&1>c||d.hasOverloadedBooleanValue&&!1===c?Jf(a,b):d.mustUseProperty?a[d.propertyName]=c:(b=d.attributeName,(e=d.attributeNamespace)?a.setAttributeNS(e,b,""+c):d.hasBooleanValue||d.hasOverloadedBooleanValue&&!0===c?a.setAttribute(b,""):a.setAttribute(b,""+c))}else Kf(a,b,va(b,c)?c:null)}
	function Kf(a,b,c){Hf(b)&&(null==c?a.removeAttribute(b):a.setAttribute(b,""+c))}function Jf(a,b){var c=wa(b);c?(b=c.mutationMethod)?b(a,void 0):c.mustUseProperty?a[c.propertyName]=c.hasBooleanValue?!1:"":a.removeAttribute(c.attributeName):a.removeAttribute(b)}
	function Lf(a,b){var c=b.value,d=b.checked;return B({type:void 0,step:void 0,min:void 0,max:void 0},b,{defaultChecked:void 0,defaultValue:void 0,value:null!=c?c:a._wrapperState.initialValue,checked:null!=d?d:a._wrapperState.initialChecked})}function Mf(a,b){var c=b.defaultValue;a._wrapperState={initialChecked:null!=b.checked?b.checked:b.defaultChecked,initialValue:null!=b.value?b.value:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}
	function Nf(a,b){b=b.checked;null!=b&&If(a,"checked",b)}function Of(a,b){Nf(a,b);var c=b.value;if(null!=c)if(0===c&&""===a.value)a.value="0";else if("number"===b.type){if(b=parseFloat(a.value)||0,c!=b||c==b&&a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else null==b.value&&null!=b.defaultValue&&a.defaultValue!==""+b.defaultValue&&(a.defaultValue=""+b.defaultValue),null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
	function Pf(a,b){switch(b.type){case "submit":case "reset":break;case "color":case "date":case "datetime":case "datetime-local":case "month":case "time":case "week":a.value="";a.value=a.defaultValue;break;default:a.value=a.value}b=a.name;""!==b&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!a.defaultChecked;""!==b&&(a.name=b)}function Qf(a){var b="";aa.Children.forEach(a,function(a){null==a||"string"!==typeof a&&"number"!==typeof a||(b+=a)});return b}
	function Rf(a,b){a=B({children:void 0},b);if(b=Qf(b.children))a.children=b;return a}function Sf(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+c;b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
	function Tf(a,b){var c=b.value;a._wrapperState={initialValue:null!=c?c:b.defaultValue,wasMultiple:!!b.multiple}}function Uf(a,b){null!=b.dangerouslySetInnerHTML?E("91"):void 0;return B({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function Vf(a,b){var c=b.value;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?E("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:E("93"),b=b[0]),c=""+b),null==c&&(c=""));a._wrapperState={initialValue:""+c}}
	function Wf(a,b){var c=b.value;null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&(a.defaultValue=c));null!=b.defaultValue&&(a.defaultValue=b.defaultValue)}function Xf(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b)}var Yf={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
	function Zf(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function $f(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?Zf(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
	var ag=void 0,bg=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==Yf.svg||"innerHTML"in a)a.innerHTML=b;else{ag=ag||document.createElement("div");ag.innerHTML="\x3csvg\x3e"+b+"\x3c/svg\x3e";for(b=ag.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
	function cg(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
	var dg={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,
	stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},eg=["Webkit","ms","Moz","O"];Object.keys(dg).forEach(function(a){eg.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);dg[b]=dg[a]})});
	function fg(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--");var e=c;var f=b[c];e=null==f||"boolean"===typeof f||""===f?"":d||"number"!==typeof f||0===f||dg.hasOwnProperty(e)&&dg[e]?(""+f).trim():f+"px";"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var gg=B({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
	function hg(a,b,c){b&&(gg[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?E("137",a,c()):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?E("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:E("61")),null!=b.style&&"object"!==typeof b.style?E("62",c()):void 0)}
	function ig(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var jg=Yf.html,kg=C.thatReturns("");
	function lg(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=Hd(a);b=Sa[b];for(var d=0;d<b.length;d++){var e=b[d];c.hasOwnProperty(e)&&c[e]||("topScroll"===e?wd("topScroll","scroll",a):"topFocus"===e||"topBlur"===e?(wd("topFocus","focus",a),wd("topBlur","blur",a),c.topBlur=!0,c.topFocus=!0):"topCancel"===e?(yc("cancel",!0)&&wd("topCancel","cancel",a),c.topCancel=!0):"topClose"===e?(yc("close",!0)&&wd("topClose","close",a),c.topClose=!0):Dd.hasOwnProperty(e)&&U(e,Dd[e],a),c[e]=!0)}}
	var mg={topAbort:"abort",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topSeeked:"seeked",topSeeking:"seeking",topStalled:"stalled",topSuspend:"suspend",topTimeUpdate:"timeupdate",topVolumeChange:"volumechange",
	topWaiting:"waiting"};function ng(a,b,c,d){c=9===c.nodeType?c:c.ownerDocument;d===jg&&(d=Zf(a));d===jg?"script"===a?(a=c.createElement("div"),a.innerHTML="\x3cscript\x3e\x3c/script\x3e",a=a.removeChild(a.firstChild)):a="string"===typeof b.is?c.createElement(a,{is:b.is}):c.createElement(a):a=c.createElementNS(d,a);return a}function og(a,b){return(9===b.nodeType?b:b.ownerDocument).createTextNode(a)}
	function pg(a,b,c,d){var e=ig(b,c);switch(b){case "iframe":case "object":U("topLoad","load",a);var f=c;break;case "video":case "audio":for(f in mg)mg.hasOwnProperty(f)&&U(f,mg[f],a);f=c;break;case "source":U("topError","error",a);f=c;break;case "img":case "image":U("topError","error",a);U("topLoad","load",a);f=c;break;case "form":U("topReset","reset",a);U("topSubmit","submit",a);f=c;break;case "details":U("topToggle","toggle",a);f=c;break;case "input":Mf(a,c);f=Lf(a,c);U("topInvalid","invalid",a);
	lg(d,"onChange");break;case "option":f=Rf(a,c);break;case "select":Tf(a,c);f=B({},c,{value:void 0});U("topInvalid","invalid",a);lg(d,"onChange");break;case "textarea":Vf(a,c);f=Uf(a,c);U("topInvalid","invalid",a);lg(d,"onChange");break;default:f=c}hg(b,f,kg);var g=f,h;for(h in g)if(g.hasOwnProperty(h)){var k=g[h];"style"===h?fg(a,k,kg):"dangerouslySetInnerHTML"===h?(k=k?k.__html:void 0,null!=k&&bg(a,k)):"children"===h?"string"===typeof k?("textarea"!==b||""!==k)&&cg(a,k):"number"===typeof k&&cg(a,
	""+k):"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&"autoFocus"!==h&&(Ra.hasOwnProperty(h)?null!=k&&lg(d,h):e?Kf(a,h,k):null!=k&&If(a,h,k))}switch(b){case "input":Bc(a);Pf(a,c);break;case "textarea":Bc(a);Xf(a,c);break;case "option":null!=c.value&&a.setAttribute("value",c.value);break;case "select":a.multiple=!!c.multiple;b=c.value;null!=b?Sf(a,!!c.multiple,b,!1):null!=c.defaultValue&&Sf(a,!!c.multiple,c.defaultValue,!0);break;default:"function"===typeof f.onClick&&(a.onclick=
	C)}}
	function sg(a,b,c,d,e){var f=null;switch(b){case "input":c=Lf(a,c);d=Lf(a,d);f=[];break;case "option":c=Rf(a,c);d=Rf(a,d);f=[];break;case "select":c=B({},c,{value:void 0});d=B({},d,{value:void 0});f=[];break;case "textarea":c=Uf(a,c);d=Uf(a,d);f=[];break;default:"function"!==typeof c.onClick&&"function"===typeof d.onClick&&(a.onclick=C)}hg(b,d,kg);var g,h;a=null;for(g in c)if(!d.hasOwnProperty(g)&&c.hasOwnProperty(g)&&null!=c[g])if("style"===g)for(h in b=c[g],b)b.hasOwnProperty(h)&&(a||(a={}),a[h]=
	"");else"dangerouslySetInnerHTML"!==g&&"children"!==g&&"suppressContentEditableWarning"!==g&&"suppressHydrationWarning"!==g&&"autoFocus"!==g&&(Ra.hasOwnProperty(g)?f||(f=[]):(f=f||[]).push(g,null));for(g in d){var k=d[g];b=null!=c?c[g]:void 0;if(d.hasOwnProperty(g)&&k!==b&&(null!=k||null!=b))if("style"===g)if(b){for(h in b)!b.hasOwnProperty(h)||k&&k.hasOwnProperty(h)||(a||(a={}),a[h]="");for(h in k)k.hasOwnProperty(h)&&b[h]!==k[h]&&(a||(a={}),a[h]=k[h])}else a||(f||(f=[]),f.push(g,a)),a=k;else"dangerouslySetInnerHTML"===
	g?(k=k?k.__html:void 0,b=b?b.__html:void 0,null!=k&&b!==k&&(f=f||[]).push(g,""+k)):"children"===g?b===k||"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(g,""+k):"suppressContentEditableWarning"!==g&&"suppressHydrationWarning"!==g&&(Ra.hasOwnProperty(g)?(null!=k&&lg(e,g),f||b===k||(f=[])):(f=f||[]).push(g,k))}a&&(f=f||[]).push("style",a);return f}
	function tg(a,b,c,d,e){"input"===c&&"radio"===e.type&&null!=e.name&&Nf(a,e);ig(c,d);d=ig(c,e);for(var f=0;f<b.length;f+=2){var g=b[f],h=b[f+1];"style"===g?fg(a,h,kg):"dangerouslySetInnerHTML"===g?bg(a,h):"children"===g?cg(a,h):d?null!=h?Kf(a,g,h):a.removeAttribute(g):null!=h?If(a,g,h):Jf(a,g)}switch(c){case "input":Of(a,e);break;case "textarea":Wf(a,e);break;case "select":a._wrapperState.initialValue=void 0,b=a._wrapperState.wasMultiple,a._wrapperState.wasMultiple=!!e.multiple,c=e.value,null!=c?Sf(a,
	!!e.multiple,c,!1):b!==!!e.multiple&&(null!=e.defaultValue?Sf(a,!!e.multiple,e.defaultValue,!0):Sf(a,!!e.multiple,e.multiple?[]:"",!1))}}
	function ug(a,b,c,d,e){switch(b){case "iframe":case "object":U("topLoad","load",a);break;case "video":case "audio":for(var f in mg)mg.hasOwnProperty(f)&&U(f,mg[f],a);break;case "source":U("topError","error",a);break;case "img":case "image":U("topError","error",a);U("topLoad","load",a);break;case "form":U("topReset","reset",a);U("topSubmit","submit",a);break;case "details":U("topToggle","toggle",a);break;case "input":Mf(a,c);U("topInvalid","invalid",a);lg(e,"onChange");break;case "select":Tf(a,c);
	U("topInvalid","invalid",a);lg(e,"onChange");break;case "textarea":Vf(a,c),U("topInvalid","invalid",a),lg(e,"onChange")}hg(b,c,kg);d=null;for(var g in c)c.hasOwnProperty(g)&&(f=c[g],"children"===g?"string"===typeof f?a.textContent!==f&&(d=["children",f]):"number"===typeof f&&a.textContent!==""+f&&(d=["children",""+f]):Ra.hasOwnProperty(g)&&null!=f&&lg(e,g));switch(b){case "input":Bc(a);Pf(a,c);break;case "textarea":Bc(a);Xf(a,c);break;case "select":case "option":break;default:"function"===typeof c.onClick&&
	(a.onclick=C)}return d}function vg(a,b){return a.nodeValue!==b}
	var wg=Object.freeze({createElement:ng,createTextNode:og,setInitialProperties:pg,diffProperties:sg,updateProperties:tg,diffHydratedProperties:ug,diffHydratedText:vg,warnForUnmatchedText:function(){},warnForDeletedHydratableElement:function(){},warnForDeletedHydratableText:function(){},warnForInsertedHydratedElement:function(){},warnForInsertedHydratedText:function(){},restoreControlledState:function(a,b,c){switch(b){case "input":Of(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=
	c.parentNode;c=c.querySelectorAll("input[name\x3d"+JSON.stringify(""+b)+'][type\x3d"radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=rb(d);e?void 0:E("90");Cc(d);Of(d,e)}}}break;case "textarea":Wf(a,c);break;case "select":b=c.value,null!=b&&Sf(a,!!c.multiple,b,!1)}}});nc.injectFiberControlledHostComponent(wg);var xg=null,Mg=null;function Ng(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}
	function Og(a){a=a?9===a.nodeType?a.documentElement:a.firstChild:null;return!(!a||1!==a.nodeType||!a.hasAttribute("data-reactroot"))}
	var Z=of({getRootHostContext:function(a){var b=a.nodeType;switch(b){case 9:case 11:a=(a=a.documentElement)?a.namespaceURI:$f(null,"");break;default:b=8===b?a.parentNode:a,a=b.namespaceURI||null,b=b.tagName,a=$f(a,b)}return a},getChildHostContext:function(a,b){return $f(a,b)},getPublicInstance:function(a){return a},prepareForCommit:function(){xg=td;var a=da();if(Kd(a)){if("selectionStart"in a)var b={start:a.selectionStart,end:a.selectionEnd};else a:{var c=window.getSelection&&window.getSelection();
	if(c&&0!==c.rangeCount){b=c.anchorNode;var d=c.anchorOffset,e=c.focusNode;c=c.focusOffset;try{b.nodeType,e.nodeType}catch(z){b=null;break a}var f=0,g=-1,h=-1,k=0,q=0,v=a,y=null;b:for(;;){for(var u;;){v!==b||0!==d&&3!==v.nodeType||(g=f+d);v!==e||0!==c&&3!==v.nodeType||(h=f+c);3===v.nodeType&&(f+=v.nodeValue.length);if(null===(u=v.firstChild))break;y=v;v=u}for(;;){if(v===a)break b;y===b&&++k===d&&(g=f);y===e&&++q===c&&(h=f);if(null!==(u=v.nextSibling))break;v=y;y=v.parentNode}v=u}b=-1===g||-1===h?null:
	{start:g,end:h}}else b=null}b=b||{start:0,end:0}}else b=null;Mg={focusedElem:a,selectionRange:b};ud(!1)},resetAfterCommit:function(){var a=Mg,b=da(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&fa(document.documentElement,c)){if(Kd(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(window.getSelection){b=window.getSelection();var e=c[Eb()].length;a=Math.min(d.start,e);d=void 0===d.end?a:Math.min(d.end,e);!b.extend&&a>
	d&&(e=d,d=a,a=e);e=Jd(c,a);var f=Jd(c,d);if(e&&f&&(1!==b.rangeCount||b.anchorNode!==e.node||b.anchorOffset!==e.offset||b.focusNode!==f.node||b.focusOffset!==f.offset)){var g=document.createRange();g.setStart(e.node,e.offset);b.removeAllRanges();a>d?(b.addRange(g),b.extend(f.node,f.offset)):(g.setEnd(f.node,f.offset),b.addRange(g))}}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});ia(c);for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=
	a.top}Mg=null;ud(xg);xg=null},createInstance:function(a,b,c,d,e){a=ng(a,b,c,d);a[Q]=e;a[ob]=b;return a},appendInitialChild:function(a,b){a.appendChild(b)},finalizeInitialChildren:function(a,b,c,d){pg(a,b,c,d);a:{switch(b){case "button":case "input":case "select":case "textarea":a=!!c.autoFocus;break a}a=!1}return a},prepareUpdate:function(a,b,c,d,e){return sg(a,b,c,d,e)},shouldSetTextContent:function(a,b){return"textarea"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===
	typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&"string"===typeof b.dangerouslySetInnerHTML.__html},shouldDeprioritizeSubtree:function(a,b){return!!b.hidden},createTextInstance:function(a,b,c,d){a=og(a,b);a[Q]=d;return a},now:rf,mutation:{commitMount:function(a){a.focus()},commitUpdate:function(a,b,c,d,e){a[ob]=e;tg(a,b,c,d,e)},resetTextContent:function(a){a.textContent=""},commitTextUpdate:function(a,b,c){a.nodeValue=c},appendChild:function(a,b){a.appendChild(b)},appendChildToContainer:function(a,
	b){8===a.nodeType?a.parentNode.insertBefore(b,a):a.appendChild(b)},insertBefore:function(a,b,c){a.insertBefore(b,c)},insertInContainerBefore:function(a,b,c){8===a.nodeType?a.parentNode.insertBefore(b,c):a.insertBefore(b,c)},removeChild:function(a,b){a.removeChild(b)},removeChildFromContainer:function(a,b){8===a.nodeType?a.parentNode.removeChild(b):a.removeChild(b)}},hydration:{canHydrateInstance:function(a,b){return 1!==a.nodeType||b.toLowerCase()!==a.nodeName.toLowerCase()?null:a},canHydrateTextInstance:function(a,
	b){return""===b||3!==a.nodeType?null:a},getNextHydratableSibling:function(a){for(a=a.nextSibling;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a},getFirstHydratableChild:function(a){for(a=a.firstChild;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a},hydrateInstance:function(a,b,c,d,e,f){a[Q]=f;a[ob]=c;return ug(a,b,c,e,d)},hydrateTextInstance:function(a,b,c){a[Q]=c;return vg(a,b)},didNotMatchHydratedContainerTextInstance:function(){},didNotMatchHydratedTextInstance:function(){},
	didNotHydrateContainerInstance:function(){},didNotHydrateInstance:function(){},didNotFindHydratableContainerInstance:function(){},didNotFindHydratableContainerTextInstance:function(){},didNotFindHydratableInstance:function(){},didNotFindHydratableTextInstance:function(){}},scheduleDeferredCallback:sf,cancelDeferredCallback:tf,useSyncScheduling:!0});rc=Z.batchedUpdates;
	function Pg(a,b,c,d,e){Ng(c)?void 0:E("200");var f=c._reactRootContainer;if(f)Z.updateContainer(b,f,a,e);else{d=d||Og(c);if(!d)for(f=void 0;f=c.lastChild;)c.removeChild(f);var g=Z.createContainer(c,d);f=c._reactRootContainer=g;Z.unbatchedUpdates(function(){Z.updateContainer(b,g,a,e)})}return Z.getPublicRootInstance(f)}function Qg(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;Ng(b)?void 0:E("200");return pf(a,b,null,c)}
	function Rg(a,b){this._reactRootContainer=Z.createContainer(a,b)}Rg.prototype.render=function(a,b){Z.updateContainer(a,this._reactRootContainer,null,b)};Rg.prototype.unmount=function(a){Z.updateContainer(null,this._reactRootContainer,null,a)};
	var Sg={createPortal:Qg,findDOMNode:function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternalFiber;if(b)return Z.findHostInstance(b);"function"===typeof a.render?E("188"):E("213",Object.keys(a))},hydrate:function(a,b,c){return Pg(null,a,b,!0,c)},render:function(a,b,c){return Pg(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){null==a||void 0===a._reactInternalFiber?E("38"):void 0;return Pg(a,b,c,!1,d)},unmountComponentAtNode:function(a){Ng(a)?void 0:
	E("40");return a._reactRootContainer?(Z.unbatchedUpdates(function(){Pg(null,null,a,!1,function(){a._reactRootContainer=null})}),!0):!1},unstable_createPortal:Qg,unstable_batchedUpdates:tc,unstable_deferredUpdates:Z.deferredUpdates,flushSync:Z.flushSync,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{EventPluginHub:mb,EventPluginRegistry:Va,EventPropagators:Cb,ReactControlledComponent:qc,ReactDOMComponentTree:sb,ReactDOMEventListener:xd}};
	Z.injectIntoDevTools({findFiberByHostInstance:pb,bundleType:0,version:"16.2.0",rendererPackageName:"react-dom"});var Tg=Object.freeze({default:Sg}),Ug=Tg&&Sg||Tg;module.exports=Ug["default"]?Ug["default"]:Ug;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function checkDCE() {
	  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
	  if (
	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
	  ) {
	    return;
	  }
	  if (false) {
	    // This branch is unreachable because this function is only called
	    // in production, but the condition is true only in development.
	    // Therefore if the branch is still here, dead code elimination wasn't
	    // properly applied.
	    // Don't change the message. React DevTools relies on it. Also make sure
	    // this message doesn't occur elsewhere in this function, or it will cause
	    // a false positive.
	    throw new Error('^_^');
	  }
	  try {
	    // Verify that the code above has been dead code eliminated (DCE'd).
	    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
	  } catch (err) {
	    // DevTools shouldn't crash React, no matter what.
	    // We should still report in case we break this code.
	    console.error(err);
	  }
	}

	if (true) {
	  // DCE check should happen before ReactDOM bundle executes so that
	  // DevTools can report bad minification during injection.
	  checkDCE();
	  module.exports = __webpack_require__(48);
	} else {
	  module.exports = require('./cjs/react-dom.development.js');
	}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(53)


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/* eslint-disable global-require */

	if (true) {
	  module.exports = __webpack_require__(52);
	} else {
	  module.exports = require('./AppContainer.dev');
	}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* eslint-disable react/prop-types */

	var React = __webpack_require__(1);

	var Component = React.Component;

	var AppContainer = function (_Component) {
	  _inherits(AppContainer, _Component);

	  function AppContainer() {
	    _classCallCheck(this, AppContainer);

	    return _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).apply(this, arguments));
	  }

	  _createClass(AppContainer, [{
	    key: 'render',
	    value: function render() {
	      if (this.props.component) {
	        return React.createElement(this.props.component, this.props.props);
	      }

	      return React.Children.only(this.props.children);
	    }
	  }]);

	  return AppContainer;
	}(Component);

	module.exports = AppContainer;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/* eslint-disable global-require */

	if (true) {
	  module.exports = __webpack_require__(54);
	} else {
	  module.exports = require('./index.dev');
	}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports.AppContainer = __webpack_require__(51);

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	/** @license React v16.2.0
	 * react.production.min.js
	 *
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';var m=__webpack_require__(11),n=__webpack_require__(9),p=__webpack_require__(4),q="function"===typeof Symbol&&Symbol["for"],r=q?Symbol["for"]("react.element"):60103,t=q?Symbol["for"]("react.call"):60104,u=q?Symbol["for"]("react.return"):60105,v=q?Symbol["for"]("react.portal"):60106,w=q?Symbol["for"]("react.fragment"):60107,x="function"===typeof Symbol&&Symbol.iterator;
	function y(a){for(var b=arguments.length-1,e="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,c=0;c<b;c++)e+="\x26args[]\x3d"+encodeURIComponent(arguments[c+1]);b=Error(e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}
	var z={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function A(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}A.prototype.isReactComponent={};A.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?y("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};A.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
	function B(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}function C(){}C.prototype=A.prototype;var D=B.prototype=new C;D.constructor=B;m(D,A.prototype);D.isPureReactComponent=!0;function E(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}var F=E.prototype=new C;F.constructor=E;m(F,A.prototype);F.unstable_isAsyncReactComponent=!0;F.render=function(){return this.props.children};var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
	function J(a,b,e){var c,d={},g=null,k=null;if(null!=b)for(c in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)H.call(b,c)&&!I.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var h=Array(f),l=0;l<f;l++)h[l]=arguments[l+2];d.children=h}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:r,type:a,key:g,ref:k,props:d,_owner:G.current}}function K(a){return"object"===typeof a&&null!==a&&a.$$typeof===r}
	function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var L=/\/+/g,M=[];function N(a,b,e,c){if(M.length){var d=M.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}function O(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>M.length&&M.push(a)}
	function P(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case r:case t:case u:case v:g=!0}}if(g)return e(c,a,""===b?"."+Q(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+Q(d,k);g+=P(d,f,e,c)}else if(null===a||"undefined"===typeof a?f=null:(f=x&&a[x]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=
	f.call(a),k=0;!(d=a.next()).done;)d=d.value,f=b+Q(d,k++),g+=P(d,f,e,c);else"object"===d&&(e=""+a,y("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function R(a,b){a.func.call(a.context,b,a.count++)}
	function S(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?T(a,c,e,p.thatReturnsArgument):null!=a&&(K(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(L,"$\x26/")+"/")+e,a={$$typeof:r,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}),c.push(a))}function T(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(L,"$\x26/")+"/");b=N(b,g,c,d);null==a||P(a,"",S,b);O(b)}
	var U={Children:{map:function(a,b,e){if(null==a)return a;var c=[];T(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=N(null,null,b,e);null==a||P(a,"",R,b);O(b)},count:function(a){return null==a?0:P(a,"",p.thatReturnsNull,null)},toArray:function(a){var b=[];T(a,b,null,p.thatReturnsArgument);return b},only:function(a){K(a)?void 0:y("143");return a}},Component:A,PureComponent:B,unstable_AsyncComponent:E,Fragment:w,createElement:J,cloneElement:function(a,b,e){var c=m({},a.props),
	d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)H.call(b,h)&&!I.hasOwnProperty(h)&&(c[h]=void 0===b[h]&&void 0!==f?f[h]:b[h])}var h=arguments.length-2;if(1===h)c.children=e;else if(1<h){f=Array(h);for(var l=0;l<h;l++)f[l]=arguments[l+2];c.children=f}return{$$typeof:r,type:a.type,key:d,ref:g,props:c,_owner:k}},createFactory:function(a){var b=J.bind(null,a);b.type=a;return b},
	isValidElement:K,version:"16.2.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:G,assign:m}},V=Object.freeze({default:U}),W=V&&U||V;module.exports=W["default"]?W["default"]:W;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(56)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/index.js!./index.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var rng;

	var crypto = global.crypto || global.msCrypto; // for IE 11
	if (crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}

	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return _rnds;
	  };
	}

	module.exports = rng;


	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 59 */
/***/ (function(module, exports) {

	'use strict'

	module.exports = function (ac, value) {
	  value = (value || value === 0) ? value : 1
	  var buffer = ac.createBuffer(1, 2, ac.sampleRate)
	  var data = buffer.getChannelData(0)
	  data[0] = data[1] = value
	  var source = ac.createBufferSource()
	  source.buffer = buffer
	  source.loop = true
	  return source
	}


/***/ }),
/* 60 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ })
/******/ ]);