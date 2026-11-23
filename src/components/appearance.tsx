'use client'

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { Palette } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DEFAULTS } from '@/lib/appearance'

export type SiteStyle = 'sketch' | 'rare'
export type Accent = 'orange' | 'purple'

const EVENT = 'appearance-change'
function read<K extends 'style' | 'accent'>(key: K) {
  if (typeof document === 'undefined') return DEFAULTS[key]
  return (document.documentElement.dataset[key] ??
    DEFAULTS[key]) as K extends 'style' ? SiteStyle : Accent
}

function write(key: 'style' | 'accent', value: string) {
  const el = document.documentElement
  el.dataset[key] = value
  try {
    localStorage.setItem(`site-${key}`, value)
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.dispatchEvent(new Event(EVENT))
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb)
  return () => window.removeEventListener(EVENT, cb)
}

export function useAppearance() {
  const style = useSyncExternalStore(
    subscribe,
    () => read('style'),
    () => DEFAULTS.style,
  )
  const accent = useSyncExternalStore(
    subscribe,
    () => read('accent'),
    () => DEFAULTS.accent,
  )
  return {
    style,
    accent,
    setStyle: useCallback((v: SiteStyle) => write('style', v), []),
    setAccent: useCallback((v: Accent) => write('accent', v), []),
  }
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string; swatch?: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={label}>
      <p className="text-ink-3 mb-1.5 font-mono text-[10px] tracking-wider uppercase">
        {label}
      </p>
      <div className="bg-field rounded-control flex gap-1 p-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              'flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[5px] px-3 py-1.5 text-[13px] font-medium transition-colors',
              value === o.value
                ? 'bg-surface text-ink shadow-btn'
                : 'text-ink-3 hover:text-ink',
            )}
          >
            {o.swatch && (
              <span
                className="size-2.5 rounded-full"
                style={{ background: o.swatch }}
              />
            )}
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function AppearanceMenu({ className }: { className?: string }) {
  const { style, accent, setStyle, setAccent } = useAppearance()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Appearance"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={className}
      >
        <Palette className="size-4 sm:size-5" />
      </button>
      {open && (
        <div
          id={panelId}
          className="rounded-window border-line bg-surface shadow-hairline animate-rare-modal-in absolute top-[calc(100%+14px)] right-0 z-50 flex w-64 flex-col gap-4 border p-4 font-sans"
        >
          <Segmented
            label="Style"
            value={style}
            onChange={setStyle}
            options={[
              { value: 'sketch', label: 'Sketch' },
              { value: 'rare', label: 'Rare' },
            ]}
          />
          <Segmented
            label="Accent"
            value={accent}
            onChange={setAccent}
            options={[
              {
                value: 'orange',
                label: 'Orange',
                swatch: 'oklch(72% 0.19 50)',
              },
              { value: 'purple', label: 'Purple', swatch: '#7c5cfc' },
            ]}
          />
        </div>
      )}
    </div>
  )
}
