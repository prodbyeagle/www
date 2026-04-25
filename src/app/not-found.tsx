'use client';

import * as motion from 'motion/react-client';

import { AnimatedLink } from '@/components/animated-link';
import { WordReveal } from '@/components/word-reveal';

const FADE_EASE = [0.4, 0, 0.2, 1] as const;

export default function NotFound() {
	return (
		<div className='min-h-screen w-full px-6 py-20 sm:px-10 sm:py-28 md:px-16 lg:px-24'>
			<div className='mx-auto max-w-2xl'>
				<motion.h1
					className='mb-4 text-2xl font-semibold text-text'
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: FADE_EASE }}>
					404
				</motion.h1>

				<div className='mb-8 max-w-lg text-base leading-relaxed text-text-secondary'>
					<WordReveal
						text='this page does not exist. nothing here.'
						speed={0.04}
						duration={0.6}
						delay={0.15}
					/>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.5,
						delay: 0.6,
						ease: FADE_EASE,
					}}>
					<AnimatedLink
						href='/'
						className='text-base text-text'>
						← home
					</AnimatedLink>
				</motion.div>
			</div>
		</div>
	);
}
