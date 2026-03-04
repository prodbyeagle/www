'use client';

import { useEffect, useState } from 'react';

import { PROJECTS } from '@/lib/projects';
import type { Project } from '@/types';

const CACHE_KEY = 'pbe:sorted-projects';

// In-memory cache — avoids re-parsing sessionStorage on every render
let memoryCache: Project[] | null = null;

function extractOwnerRepo(githubUrl: string): { owner: string; repo: string } | null {
	const match = githubUrl.match(/github\.com\/([^/]+)\/([^/#?]+)/);
	if (!match) return null;
	return { owner: match[1], repo: match[2] };
}

function readSessionCache(): Project[] | null {
	try {
		const raw = sessionStorage.getItem(CACHE_KEY);
		if (!raw) return null;
		return JSON.parse(raw) as Project[];
	} catch {
		return null;
	}
}

function writeSessionCache(projects: Project[]): void {
	try {
		sessionStorage.setItem(CACHE_KEY, JSON.stringify(projects));
	} catch {
		// sessionStorage unavailable — skip silently
	}
}

async function fetchSorted(): Promise<Project[]> {
	// 1. In-memory cache (same page lifecycle)
	if (memoryCache) return memoryCache;

	// 2. sessionStorage cache (survives page reload within the same session)
	const sessionCached = readSessionCache();
	if (sessionCached) {
		memoryCache = sessionCached;
		return sessionCached;
	}

	// 3. Fetch from GitHub API
	const results = await Promise.allSettled(
		PROJECTS.map(async (project) => {
			if (!project.githubUrl) return null;
			const parsed = extractOwnerRepo(project.githubUrl);
			if (!parsed) return null;
			const res = await fetch(
				`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
				{ headers: { Accept: 'application/vnd.github+json' } }
			);
			if (!res.ok) return null;
			const json = await res.json();
			return (json.pushed_at as string) ?? null;
		})
	);

	// Pair each project with its pushed_at (null if failed/missing)
	const pairs = PROJECTS.map((project, i) => {
		const result = results[i];
		const pushedAt: string | null =
			result.status === 'fulfilled' ? result.value : null;
		return { project, pushedAt };
	});

	// Dated entries sorted descending; undated preserve original relative order
	const dated = pairs
		.filter((p) => p.pushedAt !== null)
		.sort((a, b) => new Date(b.pushedAt!).getTime() - new Date(a.pushedAt!).getTime());
	const undated = pairs.filter((p) => p.pushedAt === null);

	const sorted = [...dated, ...undated].map((p) => p.project);

	memoryCache = sorted;
	writeSessionCache(sorted);
	return sorted;
}

export function useSortedProjects(): Project[] {
	const [projects, setProjects] = useState<Project[]>(PROJECTS);

	useEffect(() => {
		fetchSorted().then(setProjects).catch(() => {
			// On unexpected error keep original order
		});
	}, []);

	return projects;
}
