'use client';

import * as motion from 'motion/react-client';

import { AnimatedLink } from '@/components/animated-link';
import { HoverCard } from '@/components/hover-card';
import { NameSwap } from '@/components/name-swap';

import { PROJECTS } from '@/lib/projects';

const FADE_EASE = [0.4, 0, 0.2, 1] as const;

export default function Home() {
	const year = new Date().getFullYear();

	return (
		<div className='min-h-screen w-full px-6 py-20 sm:px-10 sm:py-28 md:px-16 lg:px-24'>
			<div className='mx-auto max-w-2xl'>
				<header className='mb-16'>
					<motion.h1
						className='text-2xl font-semibold text-text'
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: FADE_EASE }}>
						<NameSwap />
					</motion.h1>

					<motion.div
						className='mt-4 max-w-lg text-base leading-relaxed text-text-secondary'
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							delay: 0.25,
							ease: FADE_EASE,
						}}>
						hobby{' '}
						<HoverCard
							image='https://github.com/prodbyeagle.png'
							imageAlt=''
							imageRounded='full'
							content='just vibecoding tools for mac. mostly personal use.'>
							developer
						</HoverCard>{' '}
						and{' '}
						<HoverCard
							image='https://cdn.discordapp.com/emojis/1385016033831555233.gif'
							imageAlt=''
							content='making all types of beats in my freetime.'>
							music producer
						</HoverCard>{' '}
						crafting fast, accessible web experiences and modern tools.
					</motion.div>
				</header>

				<motion.section
					className='mb-16'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.5,
						delay: 0.6,
						ease: FADE_EASE,
					}}>
					<h2 className='mb-6 text-sm uppercase tracking-widest text-text-tertiary'>
						selected work
					</h2>

					<ul className='divide-y divide-text-tertiary/15'>
						{PROJECTS.map((project, i) => {
							const href =
								project.url ?? project.githubUrl ?? '#';
							const isExternal = Boolean(
								project.url ?? project.githubUrl
							);
							return (
								<motion.li
									key={project.title}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										delay: 0.7 + i * 0.06,
										ease: FADE_EASE,
									}}
									className='py-4'>
									<div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6'>
										<HoverCard
											underline={false}
											content={project.description}>
											<AnimatedLink
												href={href}
												external={isExternal}
												className='text-base text-text'>
												{project.title}
											</AnimatedLink>
										</HoverCard>
										<span className='text-sm text-text-tertiary sm:text-right'>
											{project.languages?.join(' · ')}
										</span>
									</div>
								</motion.li>
							);
						})}
					</ul>
				</motion.section>

				<motion.footer
					className='flex flex-col gap-4 border-t border-text-tertiary/15 pt-6 text-sm text-text-tertiary sm:flex-row sm:items-center sm:justify-between'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.5,
						delay: 0.9,
						ease: FADE_EASE,
					}}>
					<p>&copy; {year} noah. all rights reserved.</p>
					<nav className='flex flex-wrap gap-x-5 gap-y-2'>
						<AnimatedLink
							href='/github'
							external
							className='text-sm text-text-tertiary hover:text-text'>
							github
						</AnimatedLink>
						<AnimatedLink
							href='/yt'
							external
							className='text-sm text-text-tertiary hover:text-text'>
							youtube
						</AnimatedLink>
						<AnimatedLink
							href='/threads'
							external
							className='text-sm text-text-tertiary hover:text-text'>
							threads
						</AnimatedLink>
						<AnimatedLink
							href='/instagram'
							external
							className='text-sm text-text-tertiary hover:text-text'>
							instagram
						</AnimatedLink>
					</nav>
				</motion.footer>
			</div>
		</div>
	);
}
