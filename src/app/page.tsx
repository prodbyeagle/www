'use client';

import Link from 'next/link';
import { useState } from 'react';

import { BentoGrid } from '@/components/bento-grid';
import { BentoGridItem } from '@/components/bento-grid-item';
import { ProjectCard } from '@/components/project-card';
import { Separator } from '@/components/ui/separator';
import { WordReveal } from '@/components/word-reveal';

import { PROJECTS } from '@/lib/projects';

export default function Home() {
	const [hovered, setHovered] = useState(false);

	return (
		<div className='pt-14'>
			<header className='pb-8 px-6 md:px-12 lg:px-24'>
				<div className='flex items-center gap-4'>
					<h1 className='text-3xl md:text-4xl font-bold'>
						<WordReveal
							onMouseEnter={() => setHovered(true)}
							onMouseLeave={() => setHovered(false)}
							letter
							position='bottom'
							speed={hovered ? 0.15 : 0.25}
							text={hovered ? 'prodbyeagle' : 'noah / eagle'}
						/>
					</h1>
				</div>
			</header>

			<main className='px-6 md:px-12 lg:px-24 pb-24'>
				<section className='mb-8'>
					<div className='max-w-2xl space-y-4'>
						<WordReveal
							speed={0.03}
							className='text-text-secondary'
							text='a hobby developer and music producer passionate about crafting fast, accessible web experiences and modern tools.'
						/>
					</div>
				</section>

				<section className='mb-16'>
					<h2 className='text-xl font-medium mb-6'>
						projects /{' '}
						<Link
							href='/socials'
							className='hover:underline text-destructive'>
							socials
						</Link>
					</h2>

					<Separator className='my-6' />

					<BentoGrid>
						{PROJECTS.map((project, i) => (
							<BentoGridItem
								key={project.title}
								className={i % 4 === 0 ? 'md:col-span-2' : ''}>
								<ProjectCard project={project} />
							</BentoGridItem>
						))}
					</BentoGrid>
				</section>
			</main>
		</div>
	);
}
