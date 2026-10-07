'use client';

import * as motion from 'motion/react-client';

import { AnimatedLink } from '@/components/animated-link';
import { Intro } from '@/components/intro';
import { NameSwap } from '@/components/name-swap';

const FADE_EASE = [0.4, 0, 0.2, 1] as const;

const ABOUT_PARAGRAPHS = [
	'i make small tools for my mac, usually to fix a tiny annoyance or see if an idea works. simple software, little details, mostly for myself.',
	'the rest is music: making beats, getting lost in drums, or playing the same track again. this is where those two worlds meet.',
] as const;

export default function Home() {
	const year = new Date().getFullYear();

	return (
		<main className='flex min-h-svh w-full items-center justify-center px-6 py-12 text-center sm:px-10 sm:py-16'>
			<div className='mx-auto w-full max-w-lg'>
				<header className='mb-10'>
					<motion.h1
						className='text-2xl font-semibold text-text'
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: FADE_EASE }}>
						<NameSwap />
					</motion.h1>

					<div className='mx-auto mt-5 max-w-md space-y-5 break-words text-sm leading-relaxed text-text-secondary'>
						<Intro paragraphs={ABOUT_PARAGRAPHS} />
					</div>
				</header>

				<motion.footer
					className='flex flex-col items-center gap-3 border-t border-text-tertiary/15 pt-5 text-xs text-text-tertiary'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.5,
						delay: 0.9,
						ease: FADE_EASE,
					}}>
					<p>&copy; {year} noah. all rights reserved.</p>
					<nav className='flex flex-wrap justify-center gap-x-5 gap-y-2'>
						<AnimatedLink
							href='/github'
							external
							className='text-xs text-text-tertiary hover:text-text'>
							github
						</AnimatedLink>
						<AnimatedLink
							href='/yt'
							external
							className='text-xs text-text-tertiary hover:text-text'>
							youtube
						</AnimatedLink>
						<AnimatedLink
							href='/threads'
							external
							className='text-xs text-text-tertiary hover:text-text'>
							threads
						</AnimatedLink>
						<AnimatedLink
							href='/instagram'
							external
							className='text-xs text-text-tertiary hover:text-text'>
							instagram
						</AnimatedLink>
					</nav>
				</motion.footer>
			</div>
		</main>
	);
}
