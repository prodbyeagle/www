import { type Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Geist_Mono } from 'next/font/google';

import './globals.css';

import { DottedBackground } from '@/components/eagle/dotted';
import { ReactScan } from '@/components/eagle/react-scan';
import { ThemeToggle } from '@/components/eagle/theme-toggle';

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

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${geistMono.variable} antialiased font-mono tracking-tight cursor-default select-none relative`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem>
					<div className='sticky top-4 z-50 w-full px-4 flex justify-end pointer-events-none'>
						<div className='pointer-events-auto'>
							<ThemeToggle />
						</div>
					</div>

					<div className='fixed inset-0 -z-10'>
						<DottedBackground
							dotColor='var(--ring)'
							spacing={28}
							dotSize={2}
						/>
					</div>

					<div className='container mx-auto relative z-0'>
						{children}
					</div>
				</ThemeProvider>
				<ReactScan />
			</body>
		</html>
	);
}
