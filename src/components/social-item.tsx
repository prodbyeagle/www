interface SocialItemProps {
	title: string;
	url: string;
	note: string;
}

export function SocialItem({ title, url, note }: SocialItemProps) {
	return (
		<a
			href={url}
			target='_blank'
			rel='noopener noreferrer'
			className='group flex items-center justify-between py-3.5 border-b border-[oklch(0.90_0.010_85)] last:border-0 transition-colors duration-150'>
			<div className='flex flex-col gap-0.5'>
				<span className='text-sm font-medium text-[oklch(0.22_0.015_60)] group-hover:text-[oklch(0.45_0.10_65)] transition-colors duration-150'>
					{title}
				</span>
				<span className='text-xs text-[oklch(0.60_0.010_60)]'>{note}</span>
			</div>
			<span
				aria-hidden='true'
				className='text-sm text-[oklch(0.70_0.010_60)] group-hover:text-[oklch(0.45_0.10_65)] transition-colors duration-150'>
				↗
			</span>
		</a>
	);
}
