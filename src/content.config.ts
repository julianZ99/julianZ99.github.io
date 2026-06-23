import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
		schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			heroImage: z.optional(z.string()),
			icon: z.optional(z.string()),
			githubRepo: z.optional(z.string()),
			updatedDate: z.optional(z.coerce.date()),
		}),
});

export const collections = { posts };
