'use client'

/**
 * EdgeStepper — adapted from RareUI (src/components/edge-stepper).
 * The original wraps its own scroll container; this version pins the tick rail
 * to the viewport's right edge, scrolls the window to sections by id, tracks
 * the active section while scrolling, and opens on keyboard focus too.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface OutlineItem {
  /** DOM id of the section this item jumps to. */
  id: string
  label: string
  depth: number
}

const DEPTH_STYLE: Record<number, string> = {
  0: 'pl-5 font-semibold text-ink text-[13px]',
  1: 'pl-9 text-ink-2 text-[13px]',
  2: 'pl-13 text-ink-3 text-[12.5px]',
}

function useEdgeStepper(items: OutlineItem[], closeDelay = 350) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const open = useCallback(() => {
    clearTimeout(timer.current)
    setIsOpen(true)
  }, [])
  const close = useCallback(() => {
    clearTimeout(timer.current)
    setIsOpen(false)
  }, [])
  const scheduleClose = useCallback(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setIsOpen(false), closeDelay)
  }, [closeDelay])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      clearTimeout(timer.current)
    }
  }, [close])

  // Scroll-spy: the last section whose top has passed 30% of the viewport wins.
  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!els.length) return
    const update = () => {
      const line = window.innerHeight * 0.3
      let current = els[0].id
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id
      }
      setActiveId(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [items])

  return { isOpen, activeId, setActiveId, open, close, scheduleClose }
}

export function EdgeStepper({
  items,
  railWidth = 32,
  panelWidth = 240,
}: {
  items: OutlineItem[]
  railWidth?: number
  panelWidth?: number
}) {
  const { isOpen, activeId, setActiveId, open, close, scheduleClose } =
    useEdgeStepper(items)
  const panelRef = useRef<HTMLDivElement>(null)

  const navigate = useCallback(
    (id: string) => {
      setActiveId(id)
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      document.getElementById(id)?.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        block: 'start',
      })
    },
    [setActiveId],
  )

  // Keep the active row visible inside a long outline.
  useEffect(() => {
    if (!isOpen) return
    panelRef.current
      ?.querySelector<HTMLElement>(`[data-item-id="${CSS.escape(activeId)}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [activeId, isOpen])

  return (
    <nav
      aria-label="Page outline"
      className="fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 transition-[width] duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] lg:block"
      style={{
        width: isOpen ? panelWidth : railWidth,
        height: `min(${items.length * 30 + 64}px, 70vh)`,
      }}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close()
      }}
    >
      {/* Collapsed: tick marks, one per item. */}
      <button
        type="button"
        aria-label="Show page outline"
        aria-expanded={isOpen}
        onMouseEnter={open}
        onFocus={open}
        className={cn(
          'absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-[7px] py-14 transition-opacity duration-200',
          isOpen && 'pointer-events-none opacity-0',
        )}
      >
        {items.map((item) => (
          <span
            key={item.id}
            className={cn(
              'h-[2px] rounded-[1px] transition-all duration-150',
              item.id === activeId ? 'bg-main w-[18px]' : 'bg-ink/25',
              item.id !== activeId && (item.depth ? 'w-[9px]' : 'w-[14px]'),
            )}
          />
        ))}
      </button>

      {/* Expanded: hierarchical outline. */}
      <div
        ref={panelRef}
        inert={!isOpen}
        onMouseEnter={open}
        className={cn(
          'rounded-l-window border-line bg-surface shadow-hairline absolute inset-0 z-20 flex flex-col overflow-hidden border border-r-0 font-sans transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)]',
          isOpen
            ? 'pointer-events-auto translate-x-0 opacity-100'
            : 'pointer-events-none translate-x-full opacity-0',
        )}
      >
        <p className="text-ink-3 px-5 pt-5 pb-2 font-mono text-[10px] tracking-wider uppercase">
          On this page
        </p>
        <div className="flex-1 overflow-y-auto pb-5">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              data-item-id={item.id}
              aria-current={item.id === activeId ? 'location' : undefined}
              onClick={() => navigate(item.id)}
              className={cn(
                'block w-full cursor-pointer border-l-2 py-[5px] pr-4 text-left leading-[1.45] transition-[background-color,color,border-color] duration-100',
                DEPTH_STYLE[item.depth] ?? DEPTH_STYLE[2],
                item.id === activeId
                  ? 'border-main bg-accent-dim text-ink'
                  : 'hover:bg-hover hover:text-ink border-transparent',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
