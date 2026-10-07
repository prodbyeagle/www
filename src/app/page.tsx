'use client';

import * as motion from 'motion/react-client';

import { AnimatedLink } from '@/components/animated-link';
import { Intro } from '@/components/intro';
import { NameSwap } from '@/components/name-swap';

const FADE_EASE = [0.4, 0, 0.2, 1] as const;

export default function Home() {
	const year = new Date().getFullYear();
	const commitHash = process.env.NEXT_PUBLIC_COMMIT_SHA?.slice(0, 7);

	return (
		<main className='min-h-screen w-full px-6 py-20 sm:px-10 sm:py-28 md:px-16 lg:px-24'>
			<div className='mx-auto max-w-2xl'>
				<header className='mb-16'>
					<motion.h1
						className='text-2xl font-semibold text-text'
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: FADE_EASE }}>
						<NameSwap />
					</motion.h1>

					<div className='mt-4 max-w-lg space-y-6 break-words text-base leading-relaxed text-text-secondary'>
						<p>
							<Intro />
						</p>
						<p>
							I like software that feels simple and does one thing
							well. Most of what I build starts with a tiny
							annoyance, a curious idea, or something I wish my
							mac could do. Then comes the fun part: figuring it
							out and getting the little details right.
						</p>
						<p>
							Music takes up the rest of the space. Sometimes that
							means making a beat, moving samples around, or
							spending far too long on the drums. Sometimes it
							just means putting on headphones and playing the
							same track again.
						</p>
						<p>
							This is my little corner of the internet. A bit of
							code, a lot of music, and whatever catches my
							interest along the way. If you want to keep in
							touch, you can find me below.
						</p>
					</div>
				</header>

				<motion.footer
					className='grid gap-4 border-t border-text-tertiary/15 pt-6 text-sm text-text-tertiary sm:grid-cols-[1fr_auto] sm:items-center'
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
					{commitHash ? (
						<p className='text-xs text-text-tertiary/70 sm:col-span-2 sm:justify-self-end'>
							@{commitHash}
						</p>
					) : null}
				</motion.footer>
			</div>
		</main>
	);
}
