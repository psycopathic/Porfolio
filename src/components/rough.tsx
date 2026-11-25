'use client'

import { useEffect, useId, useRef, type CSSProperties } from 'react'
import rough from 'roughjs'
import type { Options } from 'roughjs/bin/core'
import { cn } from '@/lib/utils'

type Shape = 'rect' | 'ellipse' | 'underline' | 'highlight' | 'hline' | 'vline'

// Sentinel colours: Rough.js writes colours as SVG attributes, which cannot
// hold var(). We draw with these, then swap them for inline CSS styles so the
// sketch follows theme tokens without a redraw.
const STROKE = '#010101'
const FILL = '#020202'

export interface RoughProps {
  shape?: Shape
  /** Any CSS colour, e.g. 'var(--border)'. Use 'none' to hide the outline. */
  stroke?: string
  fill?: string
  /** Fill shown only while the parent is hovered or focused. */
  hoverFill?: string
  fillStyle?: Options['fillStyle']
  roughness?: number
  bowing?: number
  strokeWidth?: number
  hachureGap?: number
  hachureAngle?: number
  fillWeight?: number
  /** Distance from the parent edge in px. Negative values draw outside it. */
  inset?: number
  seed?: number
  /** Redraw with a new seed while the parent is hovered. */
  wiggle?: boolean
  className?: string
}

function hashSeed(s: string) {
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0
  return Math.abs(h) % 2 ** 31 || 1
}

/**
 * Draws a hand-drawn shape behind its parent element.
 * The parent needs `relative isolate` so the sketch sits under its content.
 */
export default function Rough({
  shape = 'rect',
  stroke = 'var(--border)',
  fill,
  hoverFill,
  fillStyle = 'hachure',
  roughness = 1.2,
  bowing = 1,
  strokeWidth = 1.8,
  hachureGap = 6,
  hachureAngle = -41,
  fillWeight = 1.5,
  inset = 2,
  seed,
  wiggle = false,
  className,
}: RoughProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const id = useId()

  useEffect(() => {
    const svg = svgRef.current
    const parent = svg?.parentElement
    if (!svg || !parent) return

    const baseSeed = seed ?? hashSeed(id)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let current = baseSeed
    let active = false

    const draw = () => {
      const w = parent.offsetWidth
      const h = parent.offsetHeight
      svg.replaceChildren()
      if (!w || !h) return

      const shownFill = active && hoverFill ? hoverFill : fill
      const opts: Options = {
        stroke: stroke === 'none' ? 'none' : STROKE,
        strokeWidth,
        roughness,
        bowing,
        seed: current,
        fillStyle,
        hachureGap,
        hachureAngle,
        fillWeight,
        ...(shownFill ? { fill: FILL } : {}),
      }

      const rc = rough.svg(svg)
      const i = inset
      let node: SVGGElement
      switch (shape) {
        case 'ellipse':
          node = rc.ellipse(w / 2, h / 2, w - 2 * i, h - 2 * i, opts)
          break
        case 'underline':
          node = rc.line(i, h - 2, w - i, h - 2, opts)
          break
        case 'highlight':
          node = rc.rectangle(i, h * 0.55, w - 2 * i, h * 0.4, {
            ...opts,
            stroke: 'none',
            fill: FILL,
          })
          break
        case 'hline':
          node = rc.line(0, h / 2, w, h / 2, opts)
          break
        case 'vline':
          node = rc.line(w / 2, 0, w / 2, h, opts)
          break
        default:
          node = rc.rectangle(i, i, w - 2 * i, h - 2 * i, opts)
      }

      node.querySelectorAll('path').forEach((p) => {
        for (const attr of ['stroke', 'fill'] as const) {
          const v = p.getAttribute(attr)
          if (v === STROKE) p.style[attr] = stroke
          else if (v === FILL) p.style[attr] = shownFill ?? 'none'
        }
      })
      svg.appendChild(node)
    }

    const enter = () => {
      active = true
      if (wiggle && !reduceMotion.matches) {
        current = Math.floor(Math.random() * 2 ** 31) || 1
      }
      draw()
    }
    const leave = () => {
      active = false
      current = baseSeed
      draw()
    }

    const interactive = wiggle || Boolean(hoverFill)
    if (interactive) {
      parent.addEventListener('pointerenter', enter)
      parent.addEventListener('pointerleave', leave)
      parent.addEventListener('focusin', enter)
      parent.addEventListener('focusout', leave)
    }

    const ro = new ResizeObserver(draw)
    ro.observe(parent)

    return () => {
      ro.disconnect()
      if (interactive) {
        parent.removeEventListener('pointerenter', enter)
        parent.removeEventListener('pointerleave', leave)
        parent.removeEventListener('focusin', enter)
        parent.removeEventListener('focusout', leave)
      }
    }
  }, [
    id,
    shape,
    stroke,
    fill,
    hoverFill,
    fillStyle,
    roughness,
    bowing,
    strokeWidth,
    hachureGap,
    hachureAngle,
    fillWeight,
    inset,
    seed,
    wiggle,
  ])

  // Clean twin for the "Rare" style: a plain CSS box/line with the same
  // shape, shown instead of the sketch when <html data-style="rare">.
  const tint = (c?: string) =>
    !c
      ? 'transparent'
      : fillStyle === 'solid'
        ? c
        : `color-mix(in oklch, ${c} 22%, transparent)`
  const customStroke = stroke !== 'var(--border)' && stroke !== 'none'
  const cleanStyle = {
    '--ri': `${inset}px`,
    '--rs':
      stroke === 'none'
        ? 'transparent'
        : customStroke
          ? stroke
          : 'var(--color-line)',
    '--rw': `${Math.max(1, Math.round(strokeWidth))}px`,
    '--rf':
      fill || !customStroke
        ? tint(fill)
        : `color-mix(in oklch, ${stroke} 14%, transparent)`,
    '--rh': hoverFill ? tint(hoverFill) : undefined,
  } as CSSProperties

  return (
    <>
      <svg
        ref={svgRef}
        aria-hidden="true"
        className={cn(
          'rough-svg pointer-events-none absolute inset-0 -z-10 size-full overflow-visible',
          className,
        )}
      />
      <span
        aria-hidden="true"
        data-shape={shape}
        data-hover={hoverFill ? '' : undefined}
        data-solid={fill && fillStyle === 'solid' ? '' : undefined}
        style={cleanStyle}
        className={cn(
          'rough-clean pointer-events-none absolute -z-10',
          className,
        )}
      />
    </>
  )
}
