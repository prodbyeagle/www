import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='min-h-[60vh] flex flex-col items-center justify-center text-center gap-6'>
			<div className='space-y-2'>
				<p className='text-5xl font-bold text-[oklch(0.22_0.015_60)]'>404</p>
				<p className='text-sm text-[oklch(0.52_0.012_60)]'>page not found</p>
			</div>

			<p className='text-sm text-[oklch(0.60_0.010_60)] max-w-xs leading-relaxed'>
				this page does not exist. head back to safer ground.
			</p>

			<Link
				href='/'
				className='text-sm text-[oklch(0.22_0.015_60)] underline underline-offset-4 hover:text-[oklch(0.45_0.10_65)] transition-colors duration-150'>
				go home
			</Link>
		</div>
	);
}
