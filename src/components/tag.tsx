import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type TagVariant = 'default' | 'accent' | 'muted';

interface TagProps {
	children: ReactNode;
	variant?: TagVariant;
	className?: string;
}

const variants: Record<TagVariant, string> = {
	default: 'bg-[oklch(0.94_0.008_85)] text-[oklch(0.35_0.012_60)] border-[oklch(0.88_0.010_85)]',
	accent: 'bg-[oklch(0.95_0.04_65)] text-[oklch(0.45_0.10_65)] border-[oklch(0.85_0.08_65)]',
	muted: 'bg-transparent text-[oklch(0.60_0.010_60)] border-[oklch(0.90_0.008_85)]',
};

export function Tag({ children, variant = 'default', className }: TagProps) {
	return (
		<span
			className={cn(
				'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border leading-none',
				variants[variant],
				className
			)}>
			{children}
		</span>
	);
}
