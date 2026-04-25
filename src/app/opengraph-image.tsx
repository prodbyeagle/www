import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'prodbyeagle — hobby developer & music producer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '96px',
					background: '#f6f1e6',
					color: '#1a1611',
					fontFamily: 'sans-serif',
				}}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div
						style={{
							fontSize: 28,
							color: '#7a6f5e',
							letterSpacing: '0.18em',
							textTransform: 'uppercase',
						}}>
						prodbyeagle.dev
					</div>
					<div
						style={{
							marginTop: 48,
							fontSize: 96,
							fontWeight: 600,
							lineHeight: 1.05,
							letterSpacing: '-0.02em',
						}}>
						noah.
					</div>
					<div
						style={{
							marginTop: 32,
							fontSize: 40,
							color: '#4a4136',
							lineHeight: 1.3,
							maxWidth: 880,
						}}>
						hobby developer & music producer crafting fast,
						accessible web experiences and modern tools.
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						fontSize: 24,
						color: '#7a6f5e',
					}}>
					<div style={{ display: 'flex', gap: 32 }}>
						<span>eaglecord</span>
						<span>cli</span>
						<span>www</span>
					</div>
					<div style={{ letterSpacing: '0.12em' }}>
						@prodbyeagle
					</div>
				</div>
			</div>
		),
		{ ...size }
	);
}
