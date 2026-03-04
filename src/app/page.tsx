'use client';

import { motion, useInView } from 'motion/react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

import { useSortedProjects } from '@/hooks/use-sorted-projects';

const SOCIALS = [
  { label: 'github', url: 'https://github.com/prodbyeagle' },
  { label: 'youtube', url: '/yt' },
  { label: 'modrinth', url: '/modrinth' },
  { label: 'threads', url: '/threads' },
];

const SYNE = { fontFamily: 'var(--font-syne)' } as const;

export default function Home() {
  const projects = useSortedProjects();
  const workRef = useRef<HTMLElement>(null);
  const connectRef = useRef<HTMLElement>(null);
  const workInView = useInView(workRef, { once: true, margin: '-40px' });
  const connectInView = useInView(connectRef, { once: true, margin: '-40px' });

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>

      {/* ── SIDEBAR ── */}
      <motion.aside
        className='w-full md:w-64 lg:w-80 shrink-0 md:sticky md:top-0 md:h-screen flex flex-col justify-between px-6 py-8 md:px-8 md:py-10 lg:px-12 lg:py-12 border-b md:border-b-0 md:border-r border-border'
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}>

        <div>
          <motion.p
            className='mb-6 md:mb-10 flex items-center gap-2 text-sm text-primary'
            style={SYNE}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.45 }}>
            <span className='size-1.5 shrink-0 rounded-full bg-primary animate-pulse' />
            hobby dev · music producer
          </motion.p>

          <motion.h1
            className='mb-5 md:mb-8 leading-none tracking-tight text-foreground text-[2.75rem] md:text-[2.25rem] lg:text-[3rem] font-extrabold'
            style={SYNE}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            noah.
          </motion.h1>

          <motion.p
            className='text-base leading-relaxed text-muted-foreground max-w-xs md:max-w-none'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}>
            building fast, accessible web experiences and modern tools —
            passionate about clean code and thoughtful design.
          </motion.p>
        </div>

        <motion.p
          className='hidden md:block text-xs uppercase tracking-widest text-muted-foreground/40 mt-8'
          style={SYNE}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}>
          © {new Date().getFullYear()}
        </motion.p>
      </motion.aside>

      {/* ── MAIN ── */}
      <main className='flex-1 min-w-0 px-6 py-8 md:px-10 md:py-10 lg:px-14 lg:py-12 xl:px-16'>

        {/* Work */}
        <section className='mb-16 md:mb-20' ref={workRef}>
          <motion.div
            className='mb-6 md:mb-8 flex items-center gap-4'
            initial={{ opacity: 0 }}
            animate={workInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}>
            <span className='text-xs uppercase tracking-[0.28em] text-muted-foreground' style={SYNE}>
              Work
            </span>
            <span className='h-px flex-1 bg-border' />
            <span className='text-xs text-muted-foreground/50'>{projects.length}</span>
          </motion.div>

          <div>
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                className='group relative flex items-start gap-5 py-5 border-b border-border/40 last:border-0'
                initial={{ opacity: 0, y: 10 }}
                animate={workInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}>

                <div className='absolute inset-0 -mx-3 rounded-xl bg-foreground/[0.025] opacity-0 group-hover:opacity-100 transition-opacity duration-200' />

                <span
                  className='relative shrink-0 w-6 pt-0.5 text-xs text-muted-foreground/60 tabular-nums'
                  style={{ fontFamily: 'monospace' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className='relative flex-1 min-w-0'>
                  <div className='mb-1.5 flex items-center gap-2 flex-wrap'>
                    <span
                      className='text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200'
                      style={SYNE}>
                      {project.title}
                    </span>
                    <span className='flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                      {project.githubUrl && (
                        <Link href={project.githubUrl} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()}>
                          <Github className='size-3.5 text-muted-foreground hover:text-foreground transition-colors' />
                        </Link>
                      )}
                      {project.url && (
                        <Link href={project.url} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()}>
                          <ExternalLink className='size-3.5 text-muted-foreground hover:text-foreground transition-colors' />
                        </Link>
                      )}
                    </span>
                  </div>
                  <p className='text-sm text-muted-foreground leading-relaxed'>
                    {project.description}
                  </p>
                  {/* Tags on mobile */}
                  <div className='mt-2 flex flex-wrap gap-x-2 gap-y-0.5 sm:hidden'>
                    {project.tags.map((tag) => (
                      <span key={tag} className='text-[10px] uppercase tracking-widest text-muted-foreground/65' style={SYNE}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags on sm+ */}
                <div className='relative shrink-0 hidden sm:flex flex-col items-end gap-1 pt-1 w-24 lg:w-28'>
                  {project.tags.map((tag) => (
                    <span key={tag} className='text-[10px] uppercase tracking-widest text-muted-foreground/65 text-right' style={SYNE}>
                      {tag}
                    </span>
                  ))}
                </div>

                <ArrowUpRight className='relative shrink-0 size-4 text-muted-foreground/20 mt-1 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary transition-all duration-200' />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Connect */}
        <section className='pb-8 md:pb-0' ref={connectRef}>
          <motion.div
            className='mb-6 md:mb-8 flex items-center gap-4'
            initial={{ opacity: 0 }}
            animate={connectInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}>
            <span className='text-xs uppercase tracking-[0.28em] text-muted-foreground' style={SYNE}>
              Connect
            </span>
            <span className='h-px flex-1 bg-border' />
          </motion.div>

          <div>
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.url}
                target='_blank'
                rel='noopener noreferrer'
                className='group relative flex items-center justify-between py-5 border-b border-border/40 last:border-0'
                initial={{ opacity: 0, y: 10 }}
                animate={connectInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}>

                <div className='absolute inset-0 -mx-3 rounded-xl bg-foreground/[0.025] opacity-0 group-hover:opacity-100 transition-opacity duration-200' />

                <span
                  className='relative text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200'
                  style={SYNE}>
                  {s.label}
                </span>

                <ArrowUpRight className='relative size-5 text-muted-foreground/25 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200' />
              </motion.a>
            ))}
          </div>

          {/* Mobile footer */}
          <p className='md:hidden mt-10 text-xs uppercase tracking-widest text-muted-foreground/40' style={SYNE}>
            © {new Date().getFullYear()}
          </p>
        </section>
      </main>
    </div>
  );
}
