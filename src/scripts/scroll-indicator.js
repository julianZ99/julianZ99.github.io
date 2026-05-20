const initScrollIndicator = () => {
	const main = document.querySelector('main');
	if (!main) return;
	let indicator = document.querySelector('.scroll-indicator');
	if (!indicator) {
		indicator = document.createElement('div');
		indicator.className = 'scroll-indicator';
		indicator.textContent = '';
		indicator.tabIndex = 0;
		indicator.setAttribute('role', 'button');
		indicator.setAttribute('aria-label', 'Scroll down');
		document.body.appendChild(indicator);
		indicator.addEventListener('click', () => {
			main.scrollBy({ top: main.clientHeight, left: 0, behavior: 'smooth' });
		});
		indicator.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				main.scrollBy({ top: main.clientHeight, left: 0, behavior: 'smooth' });
			}
		});
	}
	const update = () => {
		const rect = main.getBoundingClientRect();
		const overflows = main.scrollHeight > main.clientHeight;
		const atBottom = main.scrollTop + main.clientHeight >= main.scrollHeight - 60;
		if (overflows && !atBottom) {
			indicator.style.display = 'block';
			indicator.style.left = rect.right - 20 + 'px';
			indicator.style.top = rect.bottom - 28 + 'px';
		} else {
			indicator.style.display = 'none';
		}
	};
	update();
	main.addEventListener('scroll', update);
	window.addEventListener('resize', update);
};

document.addEventListener('astro:page-load', initScrollIndicator);
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initScrollIndicator);
} else {
	initScrollIndicator();
}
