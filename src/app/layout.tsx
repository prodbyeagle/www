import { type Metadata, type Viewport } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { ReactScan } from '@/components/eagle/react-scan';

const SITE_URL = 'https://prodbyeagle.dev';
const SITE_NAME = 'prodbyeagle';
const SITE_TITLE = 'noah — hobby developer & music producer';
const SITE_DESCRIPTION =
	'noah (prodbyeagle) — hobby developer and music producer crafting fast, accessible web experiences and modern tools.';
export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: SITE_TITLE,
		template: '%s — prodbyeagle',
	},
	description: SITE_DESCRIPTION,
	applicationName: SITE_NAME,
	authors: [{ name: 'noah', url: SITE_URL }],
	creator: 'noah',
	publisher: 'noah',
	keywords: [
		'prodbyeagle',
		'noah',
		'developer',
		'music producer',
		'frontend',
		'next.js',
		'typescript',
		'eaglecord',
	],
	category: 'technology',
	alternates: {
		canonical: '/',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
	icons: {
		icon: {
			url: 'https://cdn.discordapp.com/emojis/1385016033831555233.gif',
			type: 'image/gif',
		},
	},
	openGraph: {
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		url: SITE_URL,
		siteName: SITE_NAME,
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		creator: '@prodbyeagle',
	},
};

export const viewport: Viewport = {
	colorScheme: 'light',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#f6f1e6' },
		{ media: '(prefers-color-scheme: dark)', color: '#0d0d0d' },
	],
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
