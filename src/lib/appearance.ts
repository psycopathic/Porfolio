// Shared with the server layout, so it must not live in a 'use client' module.

export const DEFAULTS = { style: 'rare', accent: 'purple' } as const

/**
 * Runs in <head> before first paint so a saved choice never flashes.
 * The defaults are rendered on <html> by the root layout; this only applies
 * a saved choice. Keep the keys in sync with write() in src/components/appearance.tsx.
 */
export const appearanceScript = `try{var d=document.documentElement,s=localStorage.getItem('site-style'),a=localStorage.getItem('site-accent');if(s==='rare'||s==='sketch')d.dataset.style=s;if(a==='purple'||a==='orange')d.dataset.accent=a}catch(e){}`
