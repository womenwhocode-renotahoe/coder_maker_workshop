function percent(value, a, b) {
	if(value <= a) return 0;
	if(value >= b) return 1;
	return Math.round(100 * (value - a) / (b - a));
}
