import { Project } from '@/types';

export const PROJECTS: Project[] = [
	{
		title: 'eaglecord',
		description:
			'modded version of vencord that adds small features and tweaks.',
		tags: ['typescript', 'electron'],
		githubUrl: 'https://github.com/prodbyeagle/eagleCord',
	},
	{
		title: 'cli',
		description: 'macos cli toolkit with useful commands.',
		tags: ['shell'],
		githubUrl: 'https://github.com/prodbyeagle/.eagle',
	},
	{
		title: 'www',
		description: 'personal website.',
		tags: ['next.js', 'typescript', 'tailwind'],
		githubUrl: 'https://github.com/prodbyeagle/.www',
	},
];
