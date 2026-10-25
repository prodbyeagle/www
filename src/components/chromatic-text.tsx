'use client';

import * as m from 'motion/react-m';

interface ChromaticTextProps {
	children: string;
}

export function ChromaticText({ children }: ChromaticTextProps) {
	return (
		<m.span
			className='inline-block bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'
			style={{
				backgroundImage:
					'linear-gradient(90deg, oklch(0.8 0.15 205) 0%, oklch(0.82 0.14 250) 22%, oklch(0.82 0.15 300) 48%, oklch(0.8 0.14 25) 74%, oklch(0.8 0.15 205) 100%)',
				backgroundRepeat: 'repeat',
				backgroundSize: '9rem 100%',
				WebkitBackgroundClip: 'text',
				WebkitTextFillColor: 'transparent',
			}}
			animate={{ backgroundPosition: ['0rem 50%', '-9rem 50%'] }}
			transition={{
				duration: 11,
				ease: 'linear',
				repeat: Infinity,
			}}>
			{children}
		</m.span>
	);
}
