document.addEventListener('DOMContentLoaded', function() {
	// Initialize the Pinoccio API with a read-only token
	// https://docs.pinocc.io/api.html#readonly-token
	var api = pinoccioAPI('6d160c6dd00821d891cc3f955b63fe89');
	
	// Initialize the Temperature control
	// Parameters: Pinoccio API, Troop number, and Scout number
	temperature = new Temperature(api, 3, 1);
	
	temperature.color(90, 'orangered');
	temperature.color(70, 'coral');
	temperature.color(50, 'lightpink');
});
