import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	devIndicators: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.discordapp.com',
				port: '',
				pathname: '**',
				search: '',
			},
		],
	},
	async redirects() {
		return [
			{
				source: '/github',
				destination: 'https://github.com/prodbyeagle',
				permanent: true,
			},
			{
				source: '/threads',
				destination: 'https://www.threads.net/@prodbyeagle',
				permanent: true,
			},
			{
				source: '/yt',
				destination: 'https://youtube.com/@prodbyeagle',
				permanent: true,
			},
			{
				source: '/modrinth',
				destination: 'https://modrinth.com/user/cow',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
