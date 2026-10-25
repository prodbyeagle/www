  import * as m from 'motion/react-m';
import type { Metadata } from 'next';
import Link from 'next/link';

const FADE_EASE = [0.4, 0, 0.2, 1] as const;

export const metadata: Metadata = {
	title: 'psychiatrie Datenschutzerklärung',
	description: 'Datenschutzerklärung für die private psychiatrie iOS-App.',
	alternates: {
		canonical: '/psychiatrie/privacy-policy',
	},
	openGraph: {
		title: 'psychiatrie Datenschutzerklärung',
		description:
			'Datenschutzerklärung für die private psychiatrie iOS-App.',
		url: '/psychiatrie/privacy-policy',
		type: 'article',
	},
};

const SECTIONS = [
	{
		title: 'Erhobene Informationen',
		items: [
			'Früher importierte historische Daten, darunter möglicherweise alte Discord-IDs, Anzeigenamen, Avatar-Verweise, Autoren-IDs und Zeitstempel.',
			'App-Inhalte, darunter archivierte Versprecher-Einträge, Regeln, Galerieeinträge und Daten für Bestenlisten.',
			'Lokale Einstellungen, darunter die gewählte Darstellung, die biometrische Sperre und Cache-Daten.',
			'Technische Daten, die erforderlich sind, um die private App zu betreiben, lokale Einstellungen zu speichern und hinterlegte Inhalte zu laden.',
		],
	},
	{
		title: 'Verwendung der Informationen',
		items: [
			'Zur Anzeige archivierter Regeln, Galerieinhalte, Versprecher-Einträge und Bestenlisten.',
			'Um die App privat und für die Öffentlichkeit unzugänglich zu halten.',
			'Um bei Bedarf lokale Mitteilungen anzuzeigen.',
			'Um Daten lokal zwischenzuspeichern, damit die App schneller lädt und kürzlich geladene Inhalte anzeigen kann.',
		],
	},
	{
		title: 'Eingesetzte Dienste',
		items: [
			'Supabase kann zur Speicherung von App-Daten eingesetzt werden.',
			'Discord ist nicht mehr mit der App verbunden. Discord-bezogene Daten sind ausschließlich historische Daten, die früher importiert wurden.',
			'Apple Face ID oder Touch ID wird lokal auf dem Gerät überprüft und nicht an uns übermittelt.',
		],
	},
	{
		title: 'Was wir nicht tun',
		items: [
			'Wir gewähren keinen öffentlichen Zugriff auf die App.',
			'Wir verbinden die App nicht mehr mit einem aktiven Discord-Server.',
			'Wir verkaufen keine personenbezogenen Daten.',
			'Wir verwenden keine Werbe-Tracker.',
			'Wir geben Daten nicht an Dritte weiter, außer an Dienste, die für den Betrieb der App erforderlich sind.',
		],
	},
	{
		title: 'Lokale Daten',
		items: [
			'Avatare, Bilder, Regeln, Galeriedaten und Versprecher-Einträge können auf dem Gerät zwischengespeichert werden.',
			'Der lokale Cache kann in der App unter Einstellungen > Speicher gelöscht werden.',
			'Beim Entfernen der App vom Gerät werden lokal gespeicherte App-Daten entsprechend dem Verhalten von iOS gelöscht.',
		],
	},
	{
		title: 'Löschung und Kontakt',
		items: [
			'Wenn du dein Profil oder App-Inhalte löschen lassen möchtest, wende dich direkt an den Betreiber der App.',
			'Nach der Löschung können verbleibende lokale Kopien durch das Leeren des App-Caches entfernt werden.',
		],
	},
];

export default function PsychiatriePrivacyPolicyPage() {
	return (
		<main className='min-h-screen px-6 py-16 sm:px-10 sm:py-20 md:px-16 lg:px-24'>
			<m.article
				className='mx-auto max-w-2xl'
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: FADE_EASE }}>
				<Link
					href='/'
					className='text-sm text-text-tertiary transition-colors hover:text-text'>
					prodbyeagle.dev
				</Link>

				<header className='mt-12 border-b border-text-tertiary/15 pb-8'>
					<p className='text-sm uppercase tracking-widest text-text-tertiary'>
						psychiatrie
					</p>
					<h1 className='mt-4 text-3xl font-semibold text-text sm:text-4xl'>
						Datenschutzerklärung
					</h1>
					<p className='mt-4 text-base leading-relaxed text-text-secondary'>
						Zuletzt aktualisiert: 29. Mai 2026
					</p>
					<p className='mt-6 text-base leading-relaxed text-text-secondary'>
						psychiatrie ist eine private iOS-App. Sie ist nicht
						öffentlich verfügbar, kann nicht von außenstehenden
						Nutzerinnen und Nutzern aufgerufen werden und ist nicht
						mehr mit einem aktiven Discord-Server verbunden. Alte
						Discord-bezogene Daten können ausschließlich vorhanden
						sein, weil sie früher importiert wurden.
					</p>
				</header>

				<div className='divide-y divide-text-tertiary/15'>
					{SECTIONS.map((section, i) => (
						<m.section
							key={section.title}
							className='py-8'
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.5,
								delay: 0.25 + i * 0.05,
								ease: FADE_EASE,
							}}>
							<h2 className='text-lg font-semibold text-text'>
								{section.title}
							</h2>
							<ul className='mt-4 space-y-3 text-base leading-relaxed text-text-secondary'>
								{section.items.map((item) => (
									<li
										key={item}
										className='pl-5 -indent-5'>
										<span className='text-text-tertiary'>
											-{' '}
										</span>
										{item}
									</li>
								))}
							</ul>
						</m.section>
					))}
				</div>
			</m.article>
		</main>
	);
}
