'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface AnimatedLinkProps
	extends Omit<ComponentPropsWithoutRef<typeof Link>, 'children'> {
	children: ReactNode;
	external?: boolean;
}

export function AnimatedLink({
	children,
	className,
	external,
	...props
}: AnimatedLinkProps) {
	const externalProps = external
		? { target: '_blank', rel: 'noopener noreferrer' }
		: {};

	return (
		<Link
			{...props}
			{...externalProps}
			className={cn(
				'group relative inline-block rounded-sm text-text transition-colors duration-300 hover:text-text/70 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2',
				className
			)}>
			<span className='relative inline-block'>
				{children}
				<span
					aria-hidden
					className='pointer-events-none absolute -bottom-px left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:origin-left group-hover:scale-x-100'
				/>
			</span>
		</Link>
	);
}
