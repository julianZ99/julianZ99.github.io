document.addEventListener('DOMContentLoaded', () => {
	const main = document.querySelector('main');
	if (!main) return;
	const indicator = document.createElement('div');
	indicator.className = 'scroll-indicator';
	document.body.appendChild(indicator);
	const update = () => {
		const rect = main.getBoundingClientRect();
		const overflows = main.scrollHeight > main.clientHeight;
		const atBottom = main.scrollTop + main.clientHeight >= main.scrollHeight - 60;
		if (overflows && !atBottom) {
			indicator.style.display = 'block';
			indicator.style.left = rect.right - 20 + 'px';
			indicator.style.top = rect.bottom - 20 + 'px';
		} else {
			indicator.style.display = 'none';
		}
	};
	update();
	main.addEventListener('scroll', update);
	window.addEventListener('resize', update);
});
