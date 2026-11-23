'use client'

/**
 * Command Palette — adapted from RareUI (https://github.com/MUZEEBURRAHAMAN/rareui,
 * src/components/command-palette). Changes: icons are ReactNodes, the trigger is
 * a compact nav button, dialog/listbox ARIA, theme tokens mapped in globals.css.
 */

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: ReactNode
  group: string
  shortcut?: string
  action?: () => void
}

function useCommandPalette(commands: CommandItem[]) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q),
    )
  }, [commands, query])

  const toggle = useCallback(() => {
    setOpen((v) => !v)
    setQuery('')
    setActiveIndex(0)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
  }, [])

  const select = useCallback(
    (cmd: CommandItem) => {
      close()
      cmd.action?.()
    },
    [close],
  )

  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      const n = filtered.length
      if (e.key === 'ArrowDown' && n) {
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % n)
      } else if (e.key === 'ArrowUp' && n) {
        e.preventDefault()
        setActiveIndex((i) => (i - 1 + n) % n)
      } else if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault()
        select(filtered[activeIndex])
      } else if (e.key === 'Escape') {
        e.preventDefault()
        close()
      }
    },
    [filtered, activeIndex, select, close],
  )

  useEffect(() => setActiveIndex(0), [query])

  return {
    open,
    query,
    setQuery,
    toggle,
    close,
    filtered,
    activeIndex,
    setActiveIndex,
    select,
    handleKeyDown,
  }
}

function CommandRow({
  command,
  id,
  active,
  onSelect,
  onHover,
}: {
  command: CommandItem
  id: string
  active: boolean
  onSelect: (cmd: CommandItem) => void
  onHover: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (active) ref.current?.scrollIntoView({ block: 'nearest' })
  }, [active])

  return (
    <div
      ref={ref}
      id={id}
      role="option"
      aria-selected={active}
      onClick={() => onSelect(command)}
      onMouseMove={onHover}
      className={cn(
        'rounded-control flex w-full cursor-pointer items-center gap-3 px-2.5 py-2 text-left transition-colors duration-100',
        active ? 'bg-accent-dim text-ink' : 'text-ink-2',
      )}
    >
      <span className="bg-field text-ink-2 flex size-7 shrink-0 items-center justify-center rounded-[4px] [&_svg]:size-3.5">
        {command.icon ?? '→'}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold">{command.label}</p>
        {command.description && (
          <p className="text-ink-3 truncate text-[11px]">
            {command.description}
          </p>
        )}
      </div>
      {command.shortcut && (
        <kbd className="border-line bg-field text-ink-3 ml-auto shrink-0 rounded-[4px] border px-1.5 py-0.5 font-mono text-[10px]">
          {command.shortcut}
        </kbd>
      )}
    </div>
  )
}

export function CommandPalette({
  commands,
  className,
}: {
  commands: CommandItem[]
  className?: string
}) {
  const {
    open,
    query,
    setQuery,
    toggle,
    close,
    filtered,
    activeIndex,
    setActiveIndex,
    select,
    handleKeyDown,
  } = useCommandPalette(commands)

  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listId = useId()
  const [isMac, setIsMac] = useState(true)

  useEffect(() => {
    setIsMac(/mac|iphone|ipad/i.test(navigator.userAgent))
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggle])

  const wasOpen = useRef(false)
  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus())
    else if (wasOpen.current) triggerRef.current?.focus()
    wasOpen.current = open
  }, [open])

  // Group while keeping the flat index used for keyboard navigation.
  const groups = useMemo(() => {
    const map = new Map<string, { cmd: CommandItem; idx: number }[]>()
    filtered.forEach((cmd, idx) => {
      const arr = map.get(cmd.group) ?? []
      arr.push({ cmd, idx })
      map.set(cmd.group, arr)
    })
    return Array.from(map.entries())
  }, [filtered])

  const optionId = (idx: number) => `${listId}-opt-${idx}`

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-label="Open command palette"
        aria-haspopup="dialog"
        aria-expanded={open}
        className={className}
      >
        <Search className="size-4 sm:size-5" />
        <kbd className="text-ink-3 hidden font-mono text-[11px] lg:inline">
          {isMac ? '⌘K' : 'Ctrl K'}
        </kbd>
      </button>

      {open &&
        createPortal(
          <>
            <div
              className="bg-overlay/40 animate-rare-fade-in fixed inset-0 z-[60]"
              onClick={close}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="rounded-window border-line bg-surface shadow-hairline animate-rare-modal-in fixed top-[18%] left-1/2 z-[61] flex w-[min(520px,calc(100%-32px))] -translate-x-1/2 flex-col overflow-hidden border font-sans"
              onKeyDown={handleKeyDown}
            >
              <div className="border-line flex items-center gap-2 border-b px-3">
                <Search className="text-ink-3 size-4 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls={listId}
                  aria-activedescendant={
                    filtered.length ? optionId(activeIndex) : undefined
                  }
                  aria-label="Search pages, projects and links"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to a page, project or link…"
                  className="text-ink placeholder:text-ink-4 w-full bg-transparent py-3.5 text-[14px]"
                  style={{ outline: 'none' }}
                />
                <kbd className="border-line text-ink-3 shrink-0 rounded-[4px] border px-1.5 py-0.5 font-mono text-[10px]">
                  esc
                </kbd>
              </div>

              <div
                id={listId}
                role="listbox"
                className="max-h-[340px] overflow-y-auto py-1"
              >
                {filtered.length === 0 ? (
                  <div className="text-ink-3 px-4 py-8 text-center text-[13px]">
                    Nothing found for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  groups.map(([group, items]) => (
                    <div
                      key={group}
                      role="group"
                      aria-label={group}
                      className="px-1.5 py-1"
                    >
                      <p className="text-ink-3 px-2 py-1 font-mono text-[10px] tracking-wider uppercase">
                        {group}
                      </p>
                      {items.map(({ cmd, idx }) => (
                        <CommandRow
                          key={cmd.id}
                          id={optionId(idx)}
                          command={cmd}
                          active={idx === activeIndex}
                          onSelect={select}
                          onHover={() => setActiveIndex(idx)}
                        />
                      ))}
                    </div>
                  ))
                )}
              </div>

              <div className="border-line text-ink-3 flex items-center gap-3 border-t px-3 py-2 text-[10px]">
                <span className="flex items-center gap-1">
                  <kbd className="border-line rounded-[3px] border px-1 py-0.5 font-mono">
                    ↑↓
                  </kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="border-line rounded-[3px] border px-1 py-0.5 font-mono">
                    ↵
                  </kbd>
                  select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="border-line rounded-[3px] border px-1 py-0.5 font-mono">
                    esc
                  </kbd>
                  close
                </span>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  )
}
