'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';

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

const WORD_REVEAL: Variants = {
	hidden: {
		opacity: 0.28,
		scale: 0.985,
		filter: 'blur(14px)',
	},
	show: (i: number) => ({
		opacity: [0.28, 0.72, 1],
		scale: [0.985, 1.01, 1],
		filter: ['blur(14px)', 'blur(5px)', 'blur(0px)'],
		transition: {
			delay: 0.2 + i * 0.055,
			duration: 0.95,
			ease: [0.16, 1, 0.3, 1],
			times: [0, 0.58, 1],
		},
	}),
};

const WORD_REVEAL_REDUCED: Variants = {
	hidden: { opacity: 0.65 },
	show: (i: number) => ({
		opacity: 1,
		transition: {
			delay: 0.2 + i * 0.035,
			duration: 0.25,
			ease: [0.4, 0, 0.2, 1],
		},
	}),
};

function splitWords(text: string): string[] {
	return text.match(/\S+/g) ?? [];
}

function Word({
	children,
	index,
	wrap = false,
}: {
	children: ReactNode;
	index: number;
	wrap?: boolean;
}) {
	const reduceMotion = useReducedMotion();

	return (
		<motion.span
			custom={index}
			variants={reduceMotion ? WORD_REVEAL_REDUCED : WORD_REVEAL}
			initial='hidden'
			animate='show'
			className={
				wrap
					? 'inline will-change-[filter,opacity]'
					: 'inline-block transform-gpu will-change-[filter,opacity,transform]'
			}>
			{children}
		</motion.span>
	);
}

function renderAnimatedWords(text: string, wordIndex: { current: number }) {
	const words = splitWords(text);

	return words.map((word, i) => {
		const current = wordIndex.current++;
		return (
			<span key={`${word}-${i}`}>
				{i > 0 ? ' ' : null}
				<Word index={current}>{word}</Word>
			</span>
		);
	});
}

export function AnimatedText({ children }: { children: string }) {
	return <>{renderAnimatedWords(children, { current: 0 })}</>;
}

function renderSegments(
	segments: IntroVariant,
	devContent: string,
	musicContent: string
) {
	const wordIndex = { current: 0 };

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
							<Word index={current} wrap>
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
							<Word index={current} wrap>
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

export function Intro() {
	// Render the first variant on the server / first client paint to avoid
	// hydration mismatch, then swap to the picked one once mounted.
	const a = useIntroVariant('intro:a', SLOT_A.length);
	const b = useIntroVariant('intro:b', SLOT_B.length);
	const dev = useIntroVariant('intro:dev', DEV_CONTENT.length);
	const music = useIntroVariant('intro:music', MUSIC_CONTENT.length);

	const devContent = DEV_CONTENT[dev];
	const musicContent = MUSIC_CONTENT[music];

	return (
		<>
			{renderSegments(
				[...SLOT_A[a], ...SLOT_B[b]],
				devContent,
				musicContent
			)}
		</>
	);
}
