var Temperature = function(api, troop, scout) {
	this.api = api;
	
	// Grab the value element
	this.value = document.getElementById('value');
	
	// Initialize the sync stream with { stale: 1 }
	// https://docs.pinocc.io/api.html#realtime-stream-of-changes
	var s = this.api.sync({ stale: 1 });
	
	// The functions to run for each update
	this.callbacks = [];
	
	// When the sync stream gets data
	var temperature = this;
	s.on('data', function(data) {
		// If it's not the value we want, return
		if (data.type !== 'temp') return;
		if (data.troop != troop) return;
		if (data.scout != scout) return;
		
		// Call the process method with the value
		temperature.process(data.value.f);
	})
}

Temperature.prototype.color = function(threshold, color) {
	this.callbacks.push(function(value) {
		if (value < threshold) {
			this.value.style.color = color;
		}
	});
	
	return this;
}

Temperature.prototype.process = function(value) {
	// set the value element text
	this.value.innerHTML = value;
	
	for(var i = 0; i < this.callbacks.length; i++) {
		this.callbacks[i].call(this, value);
	}
	
	return this;
}
