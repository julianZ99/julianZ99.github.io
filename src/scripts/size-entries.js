function sizeEntries() {
	const ul = document.querySelector('ul');
	const main = document.querySelector('main');
	if (!ul || !main) return;

	const items = ul.querySelectorAll('li:not(.placeholder)');
	const mainHeight = main.clientHeight;
	const slotHeight = Math.floor((mainHeight - 4) / 5);

	for (const li of items) {
		li.style.height = slotHeight + 'px';
	}

	const existing = ul.querySelectorAll('li.placeholder');
	for (const e of existing) e.remove();

	const remaining = 5 - items.length;
	if (remaining > 0) {
		const p = document.createElement('li');
		p.className = 'placeholder';

		const h4 = document.createElement('h4');
		h4.className = 'title';
		h4.innerHTML = 'Working on more things<span class="dots"></span>';
		p.appendChild(h4);
		ul.appendChild(p);
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', sizeEntries);
} else {
	sizeEntries();
}
window.addEventListener('resize', sizeEntries);
