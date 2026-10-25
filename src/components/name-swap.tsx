'use client';

import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { useState } from 'react';

import { WordReveal } from '@/components/word-reveal';

const PRIMARY = 'noah';
const ALT = 'prodbyeagle';

export function NameSwap() {
	const [hovered, setHovered] = useState(false);
	const text = hovered ? ALT : PRIMARY;

	return (
		<span
			className='relative inline-block cursor-default align-baseline'
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}>
			<AnimatePresence mode='wait' initial={false}>
				<m.span
					key={text}
					className='inline-block whitespace-nowrap'
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, filter: 'blur(4px)' }}
					transition={{
						duration: 0.25,
						ease: [0.4, 0, 0.2, 1],
					}}>
					<WordReveal
						text={text}
						letter
						delay={0.18}
						speed={0.05}
						duration={0.7}
						position='bottom'
					/>
				</m.span>
			</AnimatePresence>
		</span>
	);
}
