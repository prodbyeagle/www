export const metadata = {
	title: 'og preview',
	robots: { index: false, follow: false },
};

export default function OgPreviewPage() {
	const src = `/opengraph-image?v=${Date.now()}`;

	return (
		<div className='min-h-screen w-full px-6 py-20 sm:px-10 sm:py-28 md:px-16 lg:px-24'>
			<div className='mx-auto max-w-4xl'>
				<header className='mb-10'>
					<h1 className='text-2xl font-semibold text-text'>
						opengraph image
					</h1>
					<p className='mt-2 text-sm text-text-secondary'>
						1200 × 630 — rendered live from{' '}
						<code className='rounded bg-text-tertiary/10 px-1.5 py-0.5 text-xs'>
							src/app/opengraph-image.tsx
						</code>
					</p>
				</header>

				<div className='overflow-hidden rounded-md border border-text-tertiary/20 shadow-sm'>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={src}
						alt='OpenGraph preview'
						width={1200}
						height={630}
						className='block h-auto w-full'
					/>
				</div>

				<div className='mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-tertiary'>
					<a
						href='/opengraph-image'
						target='_blank'
						rel='noreferrer'
						className='underline decoration-dotted underline-offset-4 hover:text-text'>
						open raw image ↗
					</a>
					<span>not indexed by search engines</span>
				</div>
			</div>
		</div>
	);
}
