import { cn } from '@/lib/utils';

interface SectionHeaderProps {
	title: string;
	subtitle?: string;
	count?: number;
	id?: string;
	className?: string;
}

export function SectionHeader({ title, subtitle, count, id, className }: SectionHeaderProps) {
	return (
		<div id={id} className={cn('mb-8', className)}>
			<div className='flex items-baseline gap-2'>
				<h2 className='text-base font-semibold text-[oklch(0.22_0.015_60)]'>{title}</h2>
				{count !== undefined && (
					<span className='text-xs text-[oklch(0.68_0.010_60)] tabular-nums'>{count}</span>
				)}
			</div>
			{subtitle && <p className='mt-0.5 text-sm text-[oklch(0.52_0.012_60)]'>{subtitle}</p>}
			<div className='mt-3 h-px bg-[oklch(0.90_0.010_85)]' />
		</div>
	);
}
