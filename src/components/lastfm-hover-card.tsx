'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { HoverCard } from '@/components/hover-card';
import type { LastTrack } from '@/lib/lastfm';

interface LastFmHoverCardProps {
	children: ReactNode;
	className?: string;
}

const STALE_MS = 10 * 60 * 1000;

function formatRelative(ts: number): string {
	const diff = Math.max(0, Date.now() - ts);
	const minutes = Math.floor(diff / 60000);
	if (minutes < 1) return 'just now';
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	return `${days}d ago`;
}

function trackTimeLabel(track: LastTrack): string {
	if (track.nowPlaying) return 'now playing';
	if (!track.playedAt) return '';
	const rel = formatRelative(track.playedAt);
	return Date.now() - track.playedAt > STALE_MS
		? `last listened ${rel}`
		: rel;
}

function TrackContent({
	track,
	loading,
	error,
}: {
	track: LastTrack | null;
	loading: boolean;
	error: boolean;
}) {
	if (loading && !track) {
		return (
			<span className='block text-text-tertiary'>
				loading…
			</span>
		);
	}
	if (error) {
		return (
			<span className='block text-text-tertiary'>
				couldn&apos;t reach last.fm
			</span>
		);
	}
	if (!track) {
		return (
			<span className='block text-text-tertiary'>
				nothing playing yet
			</span>
		);
	}
	return (
		<span className='flex items-center gap-3'>
			{track.image ? (
				<span className='relative block h-12 w-12 shrink-0 overflow-hidden rounded-sm border border-text-tertiary/15'>
					<Image
						src={track.image}
						alt=''
						fill
						unoptimized
						sizes='48px'
						className='object-cover'
					/>
				</span>
			) : (
				<span className='block h-12 w-12 shrink-0 rounded-sm border border-text-tertiary/15 bg-text-tertiary/5' />
			)}
			<span className='flex min-w-0 flex-col'>
				<span className='truncate text-text'>{track.name}</span>
				<span className='truncate text-text-secondary'>
					{track.artist}
				</span>
				<span className='mt-1 text-text-tertiary'>
					{trackTimeLabel(track)}
				</span>
			</span>
		</span>
	);
}

export function LastFmHoverCard({ children, className }: LastFmHoverCardProps) {
	const [track, setTrack] = useState<LastTrack | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		let cancelled = false;
		async function load() {
			try {
				const res = await fetch('/api/lastfm');
				const data = (await res.json()) as {
					track: LastTrack | null;
				};
				if (cancelled) return;
				setTrack(data.track);
				setError(false);
			} catch {
				if (!cancelled) setError(true);
			} finally {
				if (!cancelled) setLoading(false);
			}
		}
		load();
		const id = setInterval(load, 30000);
		return () => {
			cancelled = true;
			clearInterval(id);
		};
	}, []);

	return (
		<HoverCard
			className={className}
			image={track?.image ?? undefined}
			imageAlt=''
			imageRounded='sm'
			imageUnoptimized
			content={
				<TrackContent
					track={track}
					loading={loading}
					error={error}
				/>
			}>
			{children}
		</HoverCard>
	);
}
