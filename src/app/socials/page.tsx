'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const SOCIALS = [
	{
		title: 'GitHub',
		url: 'https://github.com/prodbyeagle',
		note: 'projects & code',
	},
	{ title: 'YouTube', url: '/yt', note: 'videos & livestreams' },
	{ title: 'Threads', url: '/threads', note: 'quick updates' },
	{ title: 'Modrinth', url: '/modrinth', note: 'minecraft releases' },
];

export default function SocialsPage() {
	return (
		<div className='min-h-screen px-6 md:px-16 lg:px-24'>
			<div className='pt-20 pb-16'>
				<Link
					href='/'
					className='mb-10 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground'>
					← back
				</Link>

				<motion.h1
					className='mt-6 text-[clamp(2.5rem,8vw,5rem)] font-black leading-none tracking-tighter text-foreground'
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
					socials.
				</motion.h1>
			</div>

			<main className='pb-24'>
				<ul className='space-y-2'>
					{SOCIALS.map((social, i) => (
						<motion.li
							key={social.title}
							initial={{ opacity: 0, x: -8 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{
								duration: 0.4,
								delay: 0.1 + i * 0.07,
								ease: [0.4, 0, 0.2, 1],
							}}>
							<a
								href={social.url}
								target='_blank'
								rel='noopener noreferrer'
								className='group flex items-center justify-between rounded-xl border border-border bg-card px-6 py-5 transition-all duration-200 hover:border-primary/40 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5'>
								<div>
									<p className='text-sm font-semibold'>
										{social.title}
									</p>
									<p className='mt-0.5 text-xs text-muted-foreground'>
										{social.note}
									</p>
								</div>
								<ArrowUpRight className='size-4 text-muted-foreground opacity-0 transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100' />
							</a>
						</motion.li>
					))}
				</ul>
			</main>
		</div>
	);
}
