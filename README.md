# julianZ99 personal page

My personal github site: a terminal-styled blog where each entry is a **post**. A post
can be a write-up, a note, or a project. The layout adapts to whatever fields it
has, so nothing forces an entry to be a GitHub repo.

Built with [Astro](https://astro.build/), statically generated and deployed to
GitHub Pages.

## Features

- **Posts collection**: Markdown/MDX entries with a typed frontmatter schema.
- **Flexible entries**: optional hero image, list icon and repo link; an entry
  with none of those is just a plain blog post.
- **Terminal aesthetic**: green-on-black palette, self-hosted pixel fonts
  (Terminess Nerd Font for body, Press Start 2P for headings), animated background.
- **RSS feed** at `/rss.xml` and an auto-generated sitemap.

## Writing a post

Create a Markdown file in [`src/content/posts/`](src/content/posts/). The file
name becomes the URL slug (`/posts/<slug>/`).

Minimum frontmatter:

```yaml
---
title: 'Post title'
description: 'One line that sums it up.'
pubDate: 'Jun 22 2026'
---
```

All other fields are optional and independent:

```yaml
heroImage: 'https://…/banner.png'   # image shown inside the post (with a separator)
icon: 'https://…/icon.png'          # small icon next to the entry in the list
githubRepo: 'user/repository'       # repo link + last-commit date
```

Images are never fetched automatically. If you don't set `heroImage` / `icon`,
nothing is shown.

The schema lives in [`src/content.config.ts`](src/content.config.ts).

## Project structure

```text
├── public/
│   └── assets/fonts/        # self-hosted fonts (Terminess, Press Start 2P)
├── src/
│   ├── components/          # Header, Footer, BaseHead, background animation…
│   ├── content/posts/       # the posts (Markdown)
│   ├── layouts/             # PostLayout.astro
│   ├── lib/                 # github.js (last-commit date helper)
│   ├── pages/               # /, /posts, /posts/[slug], /whoami, rss.xml
│   ├── scripts/             # bg-animation.js, size-entries.js
│   ├── styles/global.css    # all styling
│   ├── consts.ts            # site title / description
│   └── content.config.ts    # posts collection schema
└── astro.config.mjs
```

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |

Requires Node `>=22.12.0`.

## Credits & license

- Theme originally based on [Bear Blog](https://github.com/HermanMartinus/bearblog/)
  via the Astro blog starter, heavily customised since.
- Fonts: [Terminess Nerd Font](https://github.com/ryanoasis/nerd-fonts) and
  [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P), both under
  the SIL Open Font License.

Code is released under the MIT License. Post content is © julianZ99.
