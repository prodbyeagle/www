'use client';

import { MotionConfig, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';

import { AnimatedLink } from '@/components/animated-link';
import { Intro } from '@/components/intro';
import { NameSwap } from '@/components/name-swap';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const ABOUT_PARAGRAPHS = [
	'i make small tools for my mac, usually to fix a tiny annoyance or see if an idea works. simple software, little details, mostly for myself.',
	'the rest is music: making beats, getting lost in drums, or playing the same track again. this is where those two worlds meet.',
] as const;

export default function Home() {
	const year = new Date().getFullYear();
	const reduceMotion = useReducedMotion();

	const enterOffset = reduceMotion ? 0 : 12;

	return (
		<MotionConfig reducedMotion='user'>
			<main className='flex min-h-svh w-full items-center justify-center px-6 py-12 text-left sm:px-10 sm:py-16'>
				<m.div
					className='mx-auto w-full max-w-lg'
					initial='hidden'
					animate='visible'
					variants={{
						hidden: {},
						visible: {
							transition: {
								delayChildren: 0.08,
								staggerChildren: reduceMotion ? 0 : 0.08,
							},
						},
					}}>
					<header className='mb-10'>
						<m.h1
							className='text-2xl font-semibold text-text'
							variants={{
								hidden: { opacity: 0, y: enterOffset },
								visible: { opacity: 1, y: 0 },
							}}
							transition={{ duration: 0.55, ease: EASE_OUT }}>
							<NameSwap />
						</m.h1>

						<m.div
							className='mt-5 max-w-md space-y-5 break-words text-base leading-relaxed text-text-secondary'
							variants={{
								hidden: { opacity: 0, y: enterOffset },
								visible: { opacity: 1, y: 0 },
							}}
							transition={{ duration: 0.55, ease: EASE_OUT }}>
							<Intro paragraphs={ABOUT_PARAGRAPHS} />
						</m.div>
					</header>

					<m.footer
						className='flex flex-col items-start gap-3 border-t border-text-tertiary/15 pt-5 text-sm text-text-tertiary'
						initial={{ opacity: 0, y: enterOffset }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-48px' }}
						transition={{
							duration: 0.5,
							ease: EASE_OUT,
						}}>
						<p>&copy; {year} noah. all rights reserved.</p>
						<nav className='flex flex-wrap justify-start gap-x-5 gap-y-2'>
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
					</m.footer>
				</m.div>
			</main>
		</MotionConfig>
	);
}
