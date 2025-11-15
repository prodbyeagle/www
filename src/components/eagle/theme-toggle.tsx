'use client';

import { useHasMounted } from '@/hooks/use-has-mounted';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { JSX } from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * A client-side dropdown menu for switching between light, dark, and system themes.
 *
 * @returns A dropdown menu JSX element for toggling the app theme.
 *
 * @author prodbyeagle
 */
export function ThemeToggle(): JSX.Element {
	const { setTheme } = useTheme();
	const hasMounted = useHasMounted();
	const [isNightPromptOpen, setNightPromptOpen] = useState(false);
	const [pendingTheme, setPendingTheme] = useState<string | null>(null);

	if (!hasMounted) return <></>;

	const handleThemeSelection = (nextTheme: string) => {
		const hour = new Date().getHours();
		const isLateNight = hour >= 23 || hour < 5;

		if (nextTheme === 'light' && isLateNight) {
			setPendingTheme(nextTheme);
			setNightPromptOpen(true);
			return;
		}

		setTheme(nextTheme);
	};

	const confirmNightSwitch = () => {
		if (pendingTheme) {
			setTheme(pendingTheme);
		}
		setNightPromptOpen(false);
		setPendingTheme(null);
	};

	const cancelNightSwitch = () => {
		setNightPromptOpen(false);
		setPendingTheme(null);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' size='icon'>
						<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition dark:-rotate-90 dark:scale-0' />
						<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
						<span className='sr-only'>Toggle theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem
						className='mb-1 duration-150'
						onClick={() => handleThemeSelection('light')}>
						<Sun className='mr-2 h-4 w-4' />
						Light
					</DropdownMenuItem>
					<DropdownMenuItem
						className='mb-1 duration-150'
						onClick={() => handleThemeSelection('dark')}>
						<Moon className='mr-2 h-4 w-4' />
						Dark
					</DropdownMenuItem>
					<DropdownMenuItem
						className='duration-150'
						onClick={() => handleThemeSelection('system')}>
						<Monitor className='mr-2 h-4 w-4' />
						System
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog
				open={isNightPromptOpen}
				onOpenChange={(open) => {
					if (!open) cancelNightSwitch();
				}}>
				<DialogContent showCloseButton={false}>
					<DialogHeader className='space-y-3 text-left'>
						<DialogTitle className='text-2xl font-semibold text-text-primary'>
							Switch to light mode?
						</DialogTitle>
						<DialogDescription className='text-text-secondary leading-relaxed'>
							It&#39;s the middle of the night; light mode might
							be a bit intense right now. Keep things cozy or
							blast full brightness anyway?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className='flex-col sm:flex-row sm:justify-end gap-3 pt-2'>
						<Button
							variant='ghost'
							className='flex-1'
							onClick={cancelNightSwitch}>
							Stay dark
						</Button>
						<Button
							variant='destructive'
							className='flex-1'
							onClick={confirmNightSwitch}>
							Go light
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
