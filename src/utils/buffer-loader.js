// @flow
/* eslint-disable no-console */
export const BufferLoader = function BufferLoader(
	context: Object, 
	sampleList: Array<string|ArrayBuffer>, 
	callback: Function
) {
  this.context = context;
  this.sampleList = sampleList;
  this.onload = callback;
  this.bufferList = [];
  this.loadCount = 0;
};

BufferLoader.prototype.loadBuffer = function loadBuffer(sample, index) {

	const self = this;
	if(typeof(sample)==="string")
	{
		const request = new XMLHttpRequest();
		request.open('GET', sample, true);
		request.responseType = 'arraybuffer';
		
		request.onload = function onload() {
			self.context.decodeAudioData(
				request.response,
				(buffer) => {
					if (!buffer) {
						console.error(`error decoding file data: ${sample}`);
						return;
					}
					self.bufferList[index] = buffer;
					if (++self.loadCount === self.sampleList.length) {
						self.onload(self.bufferList);
					}
				},
				(error) => {
					console.error('decodeAudioData error', error);
				}
				);
		};
		
		request.onerror = function onError() {
			console.error('BufferLoader: XHR error');
		};
		
		request.send();
	}
	else{
		self.context.decodeAudioData(sample, buffer => {
			self.bufferList[index] = buffer;
			if (++self.loadCount === self.sampleList.length) {
				self.onload(self.bufferList);
			}
		})	
	}
};

BufferLoader.prototype.load = function load() {
  for (let i = 0; i < this.sampleList.length; ++i) {
    this.loadBuffer(this.sampleList[i], i);
  }
};
