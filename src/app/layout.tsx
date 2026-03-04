import { type Metadata } from 'next';
import { Outfit, Syne } from 'next/font/google';

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

const syne = Syne({
	variable: '--font-syne',
	subsets: ['latin'],
	weight: ['400', '700', '800'],
});

const outfit = Outfit({
	variable: '--font-outfit',
	subsets: ['latin'],
	weight: ['300', '400', '500', '600'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${syne.variable} ${outfit.variable} antialiased cursor-default select-none`}
				style={{ fontFamily: 'var(--font-outfit)' }}>
				{children}
				<ReactScan />
			</body>
		</html>
	);
}
