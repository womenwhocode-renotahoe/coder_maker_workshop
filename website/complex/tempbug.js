document.addEventListener('DOMContentLoaded', function() {
	var config = {
		troop: 3,
		scout: 1,
	}
	
	// Initialize the Pinoccio API with a read-only token
	// https://docs.pinocc.io/api.html#readonly-token
	var api = pinoccioAPI('6d160c6dd00821d891cc3f955b63fe89');
	
	// Grab the thermometer element
	var thermometer = document.getElementById('thermometer');
	
	// Initialize the sync stream with { stale: 1 }
	// https://docs.pinocc.io/api.html#realtime-stream-of-changes
	var s = api.sync({ stale: 1 });
	
	s.on('data', function(data) {
		// If it's not the value we want, return
		if (data.type !== 'temp') return;
		if (data.troop != config.troop) return;
		if (data.scout != config.scout) return;
		
		var value = data.value.f;
		
		// set the thermometer height and value
		thermometer.style.height = percent(value, 40, 100) + '%';
		thermometer.innerHTML = value;
		
		// adjust background
		if(value > 70) {
			document.body.classList.add('hot');
			document.body.classList.remove('cold');
		}
		else {
			document.body.classList.add('cold');
			document.body.classList.remove('hot');
		}
	})
});
