import Link from 'next/link';

import { WordReveal } from '@/components/word-reveal';

const SOCIALS = [
	{ title: 'YouTube', url: '/yt', note: 'videos & livestreams' },
	{ title: 'GitHub', url: '/github', note: 'projects & code' },
	{ title: 'Threads', url: '/threads', note: 'quick updates' },
	{ title: 'Modrinth', url: '/modrinth', note: 'minecraft releases' },
];

export default function SocialsPage() {
	return (
		<div className='pt-14'>
			<header className='px-6 md:px-12 lg:px-24 pb-12 space-y-6'>
				<Link
					href='/'
					className='text-sm text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-2'>
					<span className='text-base' aria-hidden='true'>
						←
					</span>
					home
				</Link>

				<div className='space-y-3 max-w-2xl'>
					<h1 className='text-4xl md:text-5xl font-bold'>
						<WordReveal
							text='socials'
							speed={0.05}
							letter
							position='bottom'
						/>
					</h1>

					<WordReveal
						speed={0.03}
						className='text-text-secondary text-lg leading-relaxed'
						text='A single place for everywhere else. Choose the platform that fits—each link opens the thing I actually use.'
					/>
				</div>
			</header>

			<main className='px-6 md:px-12 lg:px-24 pb-24'>
				<div className='space-y-4'>
					{SOCIALS.map((social) => (
						<a
							key={social.title}
							href={social.url}
							target='_blank'
							rel='noopener noreferrer'
							className='group flex items-center justify-between border border-border-secondary rounded-md px-6 py-4 transition-colors hover:border-border-primary hover:bg-muted/30'>
							<div>
								<p className='text-2xl font-medium text-text-primary'>
									{social.title}
								</p>
								<p className='text-sm text-text-tertiary mt-1'>
									{social.note}
								</p>
							</div>
							<span
								aria-hidden='true'
								className='text-lg text-text-secondary transition-colors group-hover:text-text-primary'>
								↗
							</span>
						</a>
					))}
				</div>
			</main>
		</div>
	);
}
