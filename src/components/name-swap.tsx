'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

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
				<motion.span
					key={text}
					className='inline-block whitespace-nowrap'
					initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
					animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
					exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
					transition={{
						duration: 0.45,
						ease: [0.4, 0, 0.2, 1],
					}}>
					{text.split('').map((char, i) => (
						<motion.span
							key={`${char}-${i}`}
							className='inline-block'
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.35,
								delay: i * 0.025,
								ease: [0.4, 0, 0.2, 1],
							}}>
							{char}
						</motion.span>
					))}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}
