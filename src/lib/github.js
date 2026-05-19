export async function getLastCommitDate(repo) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.length) return null;
    const dateStr = data[0].commit?.committer?.date;
    return dateStr ? new Date(dateStr) : null;
  } catch {
    return null;
  }
}
