'use client';

import { motion } from 'motion/react';

interface WordRevealProps {
	text: string;
	speed?: number;
	duration?: number;
	position?: 'top' | 'bottom' | 'left' | 'right';
	letter?: boolean;
	className?: string;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}

const positionOffset = {
	top: { y: -10 },
	bottom: { y: 10 },
	left: { x: -10 },
	right: { x: 10 },
};

export function WordReveal({
	text,
	speed = 0.2,
	duration = 0.7,
	position = 'bottom',
	letter = false,
	className,
	onMouseEnter,
	onMouseLeave,
}: WordRevealProps) {
	const tokens = letter ? text.split('') : text.split(' ');
	const initial = positionOffset[position];

	return (
		<span
			className={className}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			aria-label={text}>
			{tokens.map((token, i) => (
				<motion.span
					key={i}
					initial={{ opacity: 0, filter: 'blur(5px)', ...initial }}
					animate={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }}
					transition={{
						delay: i * speed,
						duration,
						ease: [0.4, 0, 0.2, 1],
					}}
					style={{ display: 'inline-block' }}>
					{letter
						? token === ' '
							? '\u00A0'
							: token
						: i < tokens.length - 1
							? token + '\u00A0'
							: token}
				</motion.span>
			))}
		</span>
	);
}
