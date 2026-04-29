'use client';

import { motion, type HTMLMotionProps, type Variants } from 'motion/react';

import { cn } from '@/lib/utils';

type Position = 'top' | 'bottom';

interface WordRevealProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
	text: string;
	delay?: number;
	duration?: number;
	speed?: number;
	position?: Position;
	letter?: boolean;
}

const OFFSET: Record<Position, { y: number }> = {
	top: { y: 18 },
	bottom: { y: -18 },
};

export function WordReveal({
	text,
	delay = 0,
	speed = 0.08,
	duration = 1.1,
	position = 'top',
	letter = false,
	className,
	...props
}: WordRevealProps) {
	const offset = OFFSET[position];
	const tokens = letter ? text.split('') : text.split(' ');

	const container: Variants = {
		hidden: {},
		show: {
			transition: {
				delayChildren: delay,
				staggerChildren: speed,
			},
		},
	};

	const child: Variants = {
		hidden: {
			opacity: 0,
			y: offset.y,
			scale: 0.92,
			filter: 'blur(8px)',
		},
		show: {
			opacity: 1,
			y: 0,
			scale: 1,
			filter: 'blur(0px)',
			transition: {
				duration,
				ease: [0.22, 1, 0.36, 1],
				opacity: { duration: duration * 0.6 },
				filter: { duration: duration * 0.5 },
			},
		},
	};

	return (
		<motion.span
			variants={container}
			initial='hidden'
			animate='show'
			className={cn('inline-block', className)}
			{...props}>
			{tokens.map((token, i) => (
				<motion.span
					key={`${token}-${i}`}
					variants={child}
					className={cn(
						'inline-block will-change-transform',
						!letter && 'pr-1'
					)}>
					{letter && token === ' ' ? '\u00A0' : token}
				</motion.span>
			))}
		</motion.span>
	);
}
