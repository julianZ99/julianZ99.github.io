export function getProjectImage(repo, type) {
	if (!repo) return null;
	const base = `https://raw.githubusercontent.com/${repo}/main/media`;
	if (type === 'icon') return `${base}/icon.png`;
	if (type === 'banner') return `${base}/banner.png`;
	return null;
}
