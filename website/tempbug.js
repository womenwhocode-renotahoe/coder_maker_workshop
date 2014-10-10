document.addEventListener('DOMContentLoaded', function() {
	// Grab the value element
	var value = document.getElementById('value');

	// Initialize the Pinoccio API with a read-only token
	// https://docs.pinocc.io/api.html#readonly-token
	var api = pinoccioAPI('afb296a1436ea5746c9adaaf2af55d94');

	// Initialize the sync stream with {stale:1}
	// https://docs.pinocc.io/api.html#realtime-stream-of-changes
	var s = api.sync({stale:1});

	// When the sync stream gets data
	s.on('data', function(data){
	  // If it's the value we want, set the value element text
	  if (data.type === 'temp' && data.troop === '3' && data.scout === '1') {
	    value.innerHTML = data.value.f;
	  }
	})
});