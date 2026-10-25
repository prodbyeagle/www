import * as m from 'motion/react-m';
import type { Metadata } from 'next';

import { AnimatedLink } from '@/components/animated-link';

const FADE_EASE = [0.4, 0, 0.2, 1] as const;
const SUPPORT_EMAIL = 'prodbyeagle@icloud.com';
const DESCRIPTION =
	'Hilfe und Kontaktmöglichkeiten für Nutzerinnen und Nutzer der psychiatrie-App.';

export const metadata: Metadata = {
	title: {
		absolute: 'psychiatrie Support',
	},
	description: DESCRIPTION,
	alternates: {
		canonical: '/psychiatrie/support',
	},
	openGraph: {
		title: 'psychiatrie Support',
		description: DESCRIPTION,
		url: '/psychiatrie/support',
		type: 'website',
	},
	twitter: {
		card: 'summary',
		title: 'psychiatrie Support',
		description: DESCRIPTION,
	},
};

export default function PsychiatrieSupportPage() {
	return (
		<main className='min-h-screen w-full px-6 py-20 sm:px-10 sm:py-28 md:px-16 lg:px-24'>
			<m.article
				className='mx-auto max-w-2xl'
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: FADE_EASE }}>
				<m.header
					className='mb-16'
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.5,
						delay: 0.1,
						ease: FADE_EASE,
					}}>
					<h1 className='text-2xl font-semibold text-text'>
						psychiatrie Support
					</h1>
					<p className='mt-4 max-w-lg text-base leading-relaxed text-text-secondary'>
						Hier erhältst du Hilfe zur psychiatrie-App. Wenn du
						Fragen hast oder ein Problem melden möchtest, schreibe
						uns eine E-Mail an{' '}
						<AnimatedLink
							href={`mailto:${SUPPORT_EMAIL}`}
							className='break-all text-text'>
							{SUPPORT_EMAIL}
						</AnimatedLink>
						.
					</p>
				</m.header>

				<m.section
					className='mb-16'
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.5,
						delay: 0.25,
						ease: FADE_EASE,
					}}>
					<h2 className='mb-6 text-sm uppercase tracking-widest text-text-tertiary'>
						Angaben für Supportanfragen
					</h2>
					<p className='mb-5 max-w-lg text-base leading-relaxed text-text-secondary'>
						Damit wir dir möglichst schnell helfen können, gib in
						deiner Anfrage bitte folgende Informationen an:
					</p>
					<ul className='max-w-lg divide-y divide-text-tertiary/15 border-y border-text-tertiary/15 text-base text-text'>
						<li className='py-4'>App-Version</li>
						<li className='py-4'>iOS-Version</li>
						<li className='py-4'>Verwendetes Gerät</li>
						<li className='py-4'>
							Kurze Beschreibung des Problems
						</li>
					</ul>
				</m.section>

				<m.aside
					className='mb-16 border-l border-text-tertiary/30 pl-5'
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.5,
						delay: 0.35,
						ease: FADE_EASE,
					}}>
					<h2 className='text-sm font-medium text-text'>
						Bitte schütze deine Daten
					</h2>
					<p className='mt-2 max-w-lg text-base leading-relaxed text-text-secondary'>
						Sende keine Passwörter oder sensiblen persönlichen Daten
						per E-Mail.
					</p>
				</m.aside>

				<m.footer
					className='flex flex-wrap gap-x-5 gap-y-3 border-t border-text-tertiary/15 pt-6'
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.5,
						delay: 0.45,
						ease: FADE_EASE,
					}}>
					<AnimatedLink
						href='/psychiatrie/privacy-policy'
						className='text-sm text-text-tertiary'>
						Datenschutzerklärung
					</AnimatedLink>
					<AnimatedLink
						href='/'
						className='text-sm text-text-tertiary'>
						← Zurück zur Startseite
					</AnimatedLink>
				</m.footer>
			</m.article>
		</main>
	);
}
