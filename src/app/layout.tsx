import { type Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { ReactScan } from '@/components/eagle/react-scan';

export const metadata: Metadata = {
	title: '@prodbyeagle',
	description:
		'a hobby developer and music producer passionate about crafting fast, accessible web experiences and modern tools.',
	icons: {
		icon: {
			url: 'https://cdn.discordapp.com/emojis/1385016033831555233.gif',
			type: 'image/gif',
		},
	},
	metadataBase: new URL('https://prodbyeagle.dev'),
	openGraph: {
		title: 'prodbyeagle',
		description:
			'a hobby developer and music producer passionate about crafting fast, accessible web experiences and modern tools.',
		url: 'https://prodbyeagle.dev',
		siteName: 'prodbyeagle',
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary',
		title: 'prodbyeagle',
		description:
			'a hobby developer and music producer passionate about crafting fast, accessible web experiences and modern tools.',
		creator: 'prodbyeagle',
	},
};

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${inter.variable} font-sans antialiased cursor-default select-none`}
				style={{ letterSpacing: '-0.15px' }}>
				<div className='max-w-2xl mx-auto px-6 py-16'>{children}</div>
				<ReactScan />
			</body>
		</html>
	);
}
