const LASTFM_USER = 'prodbyeagle';
const LASTFM_ENDPOINT = 'https://ws.audioscrobbler.com/2.0/';

export interface LastTrack {
	name: string;
	artist: string;
	image: string | null;
	nowPlaying: boolean;
	playedAt: number | null;
}

interface LastfmImage {
	'#text': string;
	size: string;
}

interface LastfmTrack {
	name: string;
	artist: { '#text': string };
	image: LastfmImage[];
	date?: { uts: string };
	'@attr'?: { nowplaying?: string };
}

interface LastfmResponse {
	recenttracks?: { track: LastfmTrack[] | LastfmTrack };
}

function pickImage(images: LastfmImage[]): string | null {
	const preferred = ['medium', 'small', 'large', 'extralarge'];
	for (const size of preferred) {
		const match = images.find((i) => i.size === size && i['#text']);
		if (match) return match['#text'];
	}
	return null;
}

export async function fetchLastTrack(): Promise<LastTrack | null> {
	const apiKey = process.env.LASTFM_API_KEY;
	if (!apiKey) {
		console.error('[lastfm] LASTFM_API_KEY missing from env');
		return null;
	}

	const url = new URL(LASTFM_ENDPOINT);
	url.searchParams.set('method', 'user.getrecenttracks');
	url.searchParams.set('user', LASTFM_USER);
	url.searchParams.set('api_key', apiKey);
	url.searchParams.set('format', 'json');
	url.searchParams.set('limit', '1');

	const res = await fetch(url, { next: { revalidate: 30 } });
	if (!res.ok) {
		console.error('[lastfm] HTTP', res.status, await res.text());
		return null;
	}

	const data = (await res.json()) as
		| LastfmResponse
		| { error: number; message: string };
	if ('error' in data) {
		console.error('[lastfm] API error', data.error, data.message);
		return null;
	}
	const raw = data.recenttracks?.track;
	const track = Array.isArray(raw) ? raw[0] : raw;
	if (!track) {
		console.warn('[lastfm] no tracks in response');
		return null;
	}

	return {
		name: track.name,
		artist: track.artist['#text'],
		image: pickImage(track.image),
		nowPlaying: track['@attr']?.nowplaying === 'true',
		playedAt: track.date ? Number(track.date.uts) * 1000 : null,
	};
}
