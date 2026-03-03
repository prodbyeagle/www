import Link from 'next/link';

import { cn } from '@/lib/utils';
import type { Project } from '@/types';

import { Tag } from './tag';

interface ProjectCardProps {
	project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
	const primaryLink = project.githubUrl ?? project.url;

	const inner = (
		<div
			className={cn(
				'group flex flex-col gap-1.5 py-4',
				'border-b border-[oklch(0.90_0.010_85)]',
				primaryLink && 'cursor-pointer'
			)}>
			<div className='flex items-center justify-between gap-4'>
				<h3
					className={cn(
						'text-sm font-semibold text-[oklch(0.22_0.015_60)] leading-tight',
						primaryLink &&
							'group-hover:text-[oklch(0.45_0.10_65)] transition-colors duration-150'
					)}>
					{project.title}
				</h3>
				{primaryLink && (
					<span
						aria-hidden='true'
						className='shrink-0 text-sm text-[oklch(0.68_0.010_60)] opacity-0 group-hover:opacity-100 group-hover:text-[oklch(0.45_0.10_65)] transition-[opacity,color] duration-150'>
						↗
					</span>
				)}
			</div>

			<p className='text-xs text-[oklch(0.55_0.012_60)] leading-relaxed'>
				{project.description}
			</p>

			{project.tags?.length > 0 && (
				<div className='flex flex-wrap gap-1.5 mt-0.5'>
					{project.tags.slice(0, 5).map((tag) => (
						<Tag key={tag} variant='default'>
							{tag}
						</Tag>
					))}
					{project.deprecated && <Tag variant='muted'>deprecated</Tag>}
				</div>
			)}
		</div>
	);

	if (primaryLink) {
		return (
			<Link
				href={primaryLink}
				target='_blank'
				rel='noopener noreferrer'
				aria-label={project.title}>
				{inner}
			</Link>
		);
	}

	return inner;
}
