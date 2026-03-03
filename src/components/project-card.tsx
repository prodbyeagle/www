import Link from 'next/link';

import { cn } from '@/lib/utils';
import type { Project } from '@/types';

import { Tag } from './tag';

interface ProjectCardProps {
	project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
	const primaryLink = project.githubUrl ?? project.url;

	return (
		<div
			className={cn(
				'group relative flex flex-col gap-3 rounded-md p-5 overflow-hidden',
				'bg-[oklch(1_0_0)] border border-[oklch(0.90_0.010_85)]',
				'shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)]',
				'transition-[box-shadow,transform] duration-200',
				primaryLink && [
					'hover:-translate-y-0.5',
					'hover:shadow-[0_6px_16px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.05)]',
				]
			)}>
			{/* Accent top bar — appears on hover */}
			<div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[oklch(0.72_0.12_65)] via-[oklch(0.78_0.16_75)] to-[oklch(0.85_0.12_90)] opacity-0 group-hover:opacity-100 transition-opacity duration-200' />

			<div className='flex items-start justify-between gap-2'>
				<h3 className='text-sm font-semibold text-[oklch(0.22_0.015_60)] leading-tight'>
					{project.title}
				</h3>

				{primaryLink && (
					<Link
						href={primaryLink}
						target='_blank'
						rel='noopener noreferrer'
						aria-label={`Open ${project.title}`}
						className='shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[oklch(0.65_0.010_60)] hover:text-[oklch(0.45_0.10_65)]'>
						<span aria-hidden='true' className='text-sm leading-none'>
							↗
						</span>
					</Link>
				)}
			</div>

			<p className='text-xs text-[oklch(0.52_0.012_60)] leading-relaxed'>{project.description}</p>

			{project.tags?.length > 0 && (
				<div className='flex flex-wrap gap-1.5 mt-auto'>
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
}
