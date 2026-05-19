import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			githubRepo: z.string(),
			updatedDate: z.optional(z.coerce.date()),
			heroImage: z.optional(z.string()),
		}),
});

export const collections = { projects };
