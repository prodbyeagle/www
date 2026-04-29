import { NextResponse } from 'next/server';

import { fetchLastTrack } from '@/lib/lastfm';

export const revalidate = 30;

export async function GET() {
	const track = await fetchLastTrack();
	if (!track) {
		return NextResponse.json({ track: null }, { status: 200 });
	}
	return NextResponse.json({ track });
}
