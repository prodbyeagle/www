'use client';

import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from 'motion/react';
import Image from 'next/image';
import { useId, useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface HoverCardProps {
	children: ReactNode;
	content: ReactNode;
	image?: string;
	imageAlt?: string;
	imageRounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
	icon?: ReactNode;
	className?: string;
	underline?: boolean;
}

const ROUNDED_MAP = {
	none: '',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	full: 'rounded-full',
} as const;

const SPRING = { stiffness: 200, damping: 18, mass: 0.6 };

export function HoverCard({
	children,
	content,
	image,
	imageAlt = '',
	imageRounded = 'none',
	icon,
	className,
	underline = true,
}: HoverCardProps) {
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLSpanElement>(null);
	const id = useId();

	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, SPRING);
	const sy = useSpring(y, SPRING);

	const rotate = useTransform(sx, [-30, 30], [-4, 4]);

	function handleMove(e: MouseEvent<HTMLSpanElement>) {
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

	return (
		<span
			ref={triggerRef}
			className={cn(
				'relative inline cursor-default align-baseline',
				className
			)}
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={handleLeave}
			onMouseMove={handleMove}
			aria-describedby={open ? id : undefined}>
			{icon ? (
				<span className='mr-1.5 inline-flex h-[1em] w-[1em] translate-y-[0.15em] items-center justify-center text-text'>
					{icon}
				</span>
			) : image ? (
				<span
					className={cn(
						'relative mr-1.5 inline-block h-[1em] w-[1em] translate-y-[0.15em] overflow-hidden',
						ROUNDED_MAP[imageRounded]
					)}>
					<Image
						src={image}
						alt={imageAlt}
						fill
						unoptimized
						sizes='1em'
						className='object-cover'
					/>
				</span>
			) : null}
			<span
				className={cn(
					'transition-colors duration-300',
					underline &&
						'underline decoration-text-tertiary/40 decoration-dotted underline-offset-4 hover:decoration-text-tertiary/80'
				)}>
				{children}
			</span>

			<AnimatePresence>
				{open && (
					<motion.span
						id={id}
						role='tooltip'
						style={{ x: sx, y: sy, rotate }}
						initial={{ opacity: 0, y: 4, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 4, scale: 0.96 }}
						transition={{
							duration: 0.25,
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
