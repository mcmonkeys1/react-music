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