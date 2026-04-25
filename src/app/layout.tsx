import { type Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { ReactScan } from '@/components/eagle/react-scan';

export const metadata: Metadata = {
	title: '@prodbyeagle',
	description:
		'a passionate developer building performant, accessible, and modern web experiences.',
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
			'a passionate developer building performant, accessible, and modern web experiences.',
		url: 'https://prodbyeagle.dev',
		siteName: 'prodbyeagle',
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary',
		title: 'prodbyeagle',
		description:
			'a passionate developer building performant, accessible, and modern web experiences.',
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
				className={`${inter.variable} antialiased font-sans font-medium tracking-tight bg-background text-text`}>
				{children}
				<ReactScan />
			</body>
		</html>
	);
}
