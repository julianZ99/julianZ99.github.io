// Types out the text of any [data-typewriter] element on page load and leaves
// a blinking cursor at the end. Works with Astro's ClientRouter by listening to
// astro:page-load (fires on the initial load and after every navigation).

function typeTitle(el) {
	const text = el.dataset.typed ?? el.textContent ?? '';
	el.dataset.typed = text;

	el.textContent = '';
	el.style.visibility = 'visible';

	const textSpan = document.createElement('span');
	const cursor = document.createElement('span');
	cursor.className = 'tw-cursor';
	cursor.setAttribute('aria-hidden', 'true');
	el.append(textSpan, cursor);

	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduce || !text) {
		textSpan.textContent = text;
		return;
	}

	const speed = 60; // ms per character
	let i = 0;
	(function tick() {
		textSpan.textContent = text.slice(0, i);
		if (i++ < text.length) setTimeout(tick, speed);
	})();
}

function run() {
	document.querySelectorAll('[data-typewriter]').forEach(typeTitle);
}

document.addEventListener('astro:page-load', run);
