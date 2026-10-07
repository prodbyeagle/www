'use client';

import { useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { HoverCard } from '@/components/hover-card';

import {
	DEV_CONTENT,
	MUSIC_CONTENT,
	pickVariant,
	SLOT_A,
	SLOT_B,
	type IntroVariant,
} from '@/lib/intro';

const DEV_IMAGE = 'https://github.com/prodbyeagle.png?size=40';
const MUSIC_IMAGE = 'https://cdn.discordapp.com/emojis/1385016033831555233.gif';
const variantCache = new Map<string, number>();

function subscribeToIntroVariant() {
	return () => {};
}

function getClientVariant(key: string, max: number) {
	let variant = variantCache.get(key);

	if (variant === undefined) {
		variant = pickVariant(key, max);
		variantCache.set(key, variant);
	}

	return variant;
}

function useIntroVariant(key: string, max: number) {
	return useSyncExternalStore(
		subscribeToIntroVariant,
		() => getClientVariant(key, max),
		() => 0
	);
}

const WORD_STAGGER = 0.03;
const WORD_DURATION = 0.3;
const PARAGRAPH_GAP = 0.08;
const INITIAL_DELAY = 0.2;

type RevealPosition = { current: number; delay: number };

function nextParagraphDelay({ current, delay }: RevealPosition) {
	return (
		delay +
		Math.max(0, current - 1) * WORD_STAGGER +
		WORD_DURATION +
		PARAGRAPH_GAP
	);
}

function splitWords(text: string): string[] {
	return text.match(/\S+/g) ?? [];
}

function Word({
	children,
	index,
	delay,
	wrap = false,
}: {
	children: ReactNode;
	index: number;
	delay: number;
	wrap?: boolean;
}) {
	return (
		<span
			className={
				wrap
					? 'text-reveal-word text-reveal-inline'
					: 'text-reveal-word inline-block'
			}
			style={
				{
					'--reveal-delay': `${delay + index * WORD_STAGGER}s`,
					'--reveal-duration': `${WORD_DURATION}s`,
				} as CSSProperties
			}>
			{children}
		</span>
	);
}

function renderAnimatedWords(text: string, wordIndex: RevealPosition) {
	const words = splitWords(text);

	return words.map((word, i) => {
		const current = wordIndex.current++;
		return (
			<span key={`${word}-${i}`}>
				{i > 0 ? ' ' : null}
				<Word index={current} delay={wordIndex.delay}>
					{word}
				</Word>
			</span>
		);
	});
}

function renderSegments(
	segments: IntroVariant,
	devContent: string,
	musicContent: string,
	wordIndex: RevealPosition
) {
	return segments.map((seg, i) => {
		switch (seg.type) {
			case 'text': {
				const leading = seg.text.match(/^\s+/)?.[0] ?? '';
				const trailing = seg.text.match(/\s+$/)?.[0] ?? '';

				return (
					<span key={i}>
						{leading}
						{renderAnimatedWords(seg.text, wordIndex)}
						{trailing}
					</span>
				);
			}
			case 'dev': {
				const current = wordIndex.current++;

				return (
					<HoverCard
						key={i}
						className='inline whitespace-normal'
						image={DEV_IMAGE}
						imageAlt=''
						imageRounded='full'
						content={devContent}
						triggerWrapper={(trigger) => (
							<Word index={current} delay={wordIndex.delay} wrap>
								{trigger}
							</Word>
						)}>
						{seg.label}
					</HoverCard>
				);
			}
			case 'music': {
				const current = wordIndex.current++;

				return (
					<HoverCard
						key={i}
						className='inline whitespace-normal'
						image={MUSIC_IMAGE}
						imageAlt=''
						content={musicContent}
						triggerWrapper={(trigger) => (
							<Word index={current} delay={wordIndex.delay} wrap>
								{trigger}
							</Word>
						)}>
						{seg.label}
					</HoverCard>
				);
			}
		}
	});
}

export function Intro({ paragraphs = [] }: { paragraphs?: readonly string[] }) {
	// Render the first variant on the server / first client paint to avoid
	// hydration mismatch, then swap to the picked one once mounted.
	const a = useIntroVariant('intro:a', SLOT_A.length);
	const b = useIntroVariant('intro:b', SLOT_B.length);
	const dev = useIntroVariant('intro:dev', DEV_CONTENT.length);
	const music = useIntroVariant('intro:music', MUSIC_CONTENT.length);

	const devContent = DEV_CONTENT[dev];
	const musicContent = MUSIC_CONTENT[music];

	const introPosition = { current: 0, delay: INITIAL_DELAY };
	const introduction = renderSegments(
		[...SLOT_A[a], ...SLOT_B[b]],
		devContent,
		musicContent,
		introPosition
	);
	let delay = nextParagraphDelay(introPosition);

	return (
		<>
			<p className='reveal-paragraph'>{introduction}</p>
			{paragraphs.map((text) => {
				const position = { current: 0, delay };
				const content = renderAnimatedWords(text, position);
				delay = nextParagraphDelay(position);

				return (
					<p key={text} className='reveal-paragraph'>
						{content}
					</p>
				);
			})}
		</>
	);
}
