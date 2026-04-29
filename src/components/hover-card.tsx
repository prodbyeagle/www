'use client';

import {
	AnimatePresence,
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
	useTransform,
} from 'motion/react';
import Image from 'next/image';
import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface HoverCardProps {
	children: ReactNode;
	content: ReactNode;
	image?: string;
	imageAlt?: string;
	imageRounded?: 'none' | 'sm' | 'full';
	imageUnoptimized?: boolean;
	className?: string;
	underline?: boolean;
}

const ROUNDED_MAP = {
	none: '',
	sm: 'rounded-sm',
	full: 'rounded-full',
} as const;

const SPRING = { stiffness: 200, damping: 18, mass: 0.6 };

export function HoverCard({
	children,
	content,
	image,
	imageAlt = '',
	imageRounded = 'none',
	imageUnoptimized = false,
	className,
	underline = true,
}: HoverCardProps) {
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLSpanElement>(null);
	const id = useId();
	const reduceMotion = useReducedMotion();

	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, SPRING);
	const sy = useSpring(y, SPRING);

	const rotate = useTransform(sx, [-30, 30], [-4, 4]);

	function handleMove(e: MouseEvent<HTMLSpanElement>) {
		if (reduceMotion) return;
		const rect = triggerRef.current?.getBoundingClientRect();
		if (!rect) return;
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		x.set((e.clientX - cx) * 0.4);
		y.set((e.clientY - cy) * 0.4);
	}

	function handleLeave() {
		setOpen(false);
		x.set(0);
		y.set(0);
	}

	function handleKeyDown(e: KeyboardEvent<HTMLSpanElement>) {
		if (e.key === 'Escape' && open) {
			setOpen(false);
			triggerRef.current?.blur();
		}
	}

	return (
		<span
			ref={triggerRef}
			tabIndex={0}
			className={cn(
				'relative inline-block whitespace-nowrap cursor-default align-baseline rounded-sm focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2',
				className
			)}
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={handleLeave}
			onMouseMove={handleMove}
			onFocus={() => setOpen(true)}
			onBlur={handleLeave}
			onKeyDown={handleKeyDown}
			aria-describedby={open ? id : undefined}>
			{image ? (
				<span
					className={cn(
						'relative mx-1 inline-block h-[1em] w-[1em] translate-y-[0.15em] overflow-hidden',
						ROUNDED_MAP[imageRounded]
					)}>
					<Image
						src={image}
						alt={imageAlt}
						fill
						preload
						unoptimized={imageUnoptimized}
						sizes='1em'
						className='object-cover'
					/>
				</span>
			) : null}
			<span
				className={cn(
					'transition-colors duration-300',
					underline &&
						'underline decoration-text-tertiary/70 decoration-dotted underline-offset-4 hover:decoration-text-tertiary'
				)}>
				{children}
			</span>

			<AnimatePresence>
				{open && (
					<motion.span
						id={id}
						role='tooltip'
						style={
							reduceMotion ? undefined : { x: sx, y: sy, rotate }
						}
						initial={
							reduceMotion
								? { opacity: 0 }
								: { opacity: 0, y: 4, scale: 0.96 }
						}
						animate={
							reduceMotion
								? { opacity: 1 }
								: { opacity: 1, y: 0, scale: 1 }
						}
						exit={
							reduceMotion
								? { opacity: 0 }
								: { opacity: 0, y: 4, scale: 0.96 }
						}
						transition={{
							duration: reduceMotion ? 0.1 : 0.25,
							ease: [0.4, 0, 0.2, 1],
						}}
						className='pointer-events-none absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 whitespace-normal rounded-md border border-text-tertiary/15 bg-background px-3 py-2 text-xs font-normal text-text-secondary shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]'>
						<span className='block w-56 max-w-[70vw]'>
							{content}
						</span>
					</motion.span>
				)}
			</AnimatePresence>
		</span>
	);
}
