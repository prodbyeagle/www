'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

import { ProjectCard } from '@/components/project-card';
import { SectionHeader } from '@/components/section-header';
import { SocialItem } from '@/components/social-item';
import { Tag } from '@/components/tag';
import { WordReveal } from '@/components/word-reveal';

import { PROJECTS } from '@/lib/projects';

const SOCIALS = [
	{ title: 'GitHub', url: '/github', note: 'projects & code' },
	{ title: 'YouTube', url: '/yt', note: 'videos & livestreams' },
	{ title: 'Threads', url: '/threads', note: 'quick updates' },
	{ title: 'Modrinth', url: '/modrinth', note: 'minecraft releases' },
];

export default function Home() {
	const [nameHovered, setNameHovered] = useState(false);

	return (
		<main className='space-y-20'>
			{/* ── Hero ─────────────────────────────────── */}
			<section className='relative'>
				{/* Warm amber glow blob */}
				<div
					className='absolute -top-16 -left-16 w-96 h-96 rounded-full pointer-events-none select-none'
					style={{
						background:
							'radial-gradient(circle, oklch(0.92 0.08 70 / 0.55) 0%, transparent 65%)',
						filter: 'blur(52px)',
					}}
				/>

				{/* Status badge */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, ease: 'easeOut' }}
					className='relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(0.88_0.010_85)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] text-xs text-[oklch(0.52_0.012_60)] mb-7 select-none'>
					<span className='relative flex size-2 shrink-0'>
						<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.65_0.18_145)] opacity-60' />
						<span className='relative inline-flex rounded-full size-2 bg-[oklch(0.58_0.20_145)]' />
					</span>
					building things in 2026
				</motion.div>

				{/* Name — hover to reveal handle */}
				<h1
					className='relative z-10 text-4xl font-bold mb-4 cursor-default'
					onMouseEnter={() => setNameHovered(true)}
					onMouseLeave={() => setNameHovered(false)}>
					<WordReveal
						key={nameHovered ? 'handle' : 'name'}
						text={nameHovered ? 'prodbyeagle' : 'noah / eagle'}
						letter
						speed={0.04}
						duration={0.4}
						position='bottom'
					/>
				</h1>

				{/* Bio */}
				<p className='relative z-10 text-sm text-[oklch(0.52_0.012_60)] leading-relaxed max-w-prose mb-6'>
					<WordReveal
						speed={0.025}
						duration={0.6}
						text='a hobby developer and music producer passionate about crafting fast, accessible web experiences and modern tools.'
					/>
				</p>

				{/* Skill tags */}
				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.1, duration: 0.5 }}
					className='relative z-10 flex flex-wrap gap-2'>
					<Tag variant='accent'>hobby dev</Tag>
					<Tag variant='default'>music producer</Tag>
					<Tag variant='muted'>typescript</Tag>
					<Tag variant='muted'>next.js</Tag>
					<Tag variant='muted'>kotlin</Tag>
				</motion.div>
			</section>

			{/* ── Projects ─────────────────────────────── */}
			<section>
				<SectionHeader
					title='projects'
					subtitle='things i built or tinkered with'
					count={PROJECTS.length}
				/>
				<div>
					{PROJECTS.map((project, i) => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-20px' }}
							transition={{
								delay: i * 0.05,
								duration: 0.35,
								ease: 'easeOut',
							}}>
							<ProjectCard project={project} />
						</motion.div>
					))}
				</div>
			</section>

			{/* ── Socials ──────────────────────────────── */}
			<section>
				<SectionHeader title='socials' subtitle='everywhere else i exist' id='socials' />
				<div>
					{SOCIALS.map((social, i) => (
						<motion.div
							key={social.title}
							initial={{ opacity: 0, x: -12 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.07, duration: 0.35, ease: 'easeOut' }}>
							<SocialItem title={social.title} url={social.url} note={social.note} />
						</motion.div>
					))}
				</div>
			</section>

			{/* ── Footer ───────────────────────────────── */}
			<motion.footer
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className='pt-6 pb-2 border-t border-[oklch(0.90_0.010_85)] flex items-center justify-between gap-4'>
				<p className='text-xs text-[oklch(0.68_0.010_60)]'>built with next.js & tailwind</p>
				<p className='text-xs text-[oklch(0.75_0.010_60)]'>© 2026 eagle</p>
			</motion.footer>
		</main>
	);
}
