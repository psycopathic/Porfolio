'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  Briefcase,
  Code2,
  Copy,
  ExternalLink,
  FolderGit2,
  House,
  Moon,
  Palette,
  PenTool,
  User,
} from 'lucide-react'
import { CommandPalette, type CommandItem } from './rareui/command-palette'
import PROJECTS from '@/data/projects'
import SOCIALS, { EMAIL } from '@/data/socials'
import { slugify } from '@/lib/utils'
import { useAppearance } from './appearance'

function openExternal(href: string) {
  if (href.startsWith('mailto:')) window.location.href = href
  else window.open(href, '_blank', 'noopener,noreferrer')
}

export function SiteCommandPalette({ className }: { className?: string }) {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const { style, accent, setStyle, setAccent } = useAppearance()

  const commands = useMemo<CommandItem[]>(
    () => [
      {
        id: 'home',
        group: 'Pages',
        label: 'Home',
        icon: <House />,
        action: () => router.push('/'),
      },
      {
        id: 'about',
        group: 'Pages',
        label: 'About',
        description: 'Skills and experience',
        icon: <User />,
        action: () => router.push('/about'),
      },
      {
        id: 'work',
        group: 'Pages',
        label: 'Work',
        description: 'Projects I have built',
        icon: <Briefcase />,
        action: () => router.push('/work'),
      },
      ...PROJECTS.flatMap((p): CommandItem[] => [
        {
          id: `project-${p.name}`,
          group: 'Projects',
          label: p.name,
          description: p.tags.join(' · '),
          icon: <Code2 />,
          action: () => router.push(`/work#${slugify(p.name)}`),
        },
        {
          id: `live-${p.name}`,
          group: 'Projects',
          label: `${p.name}: live demo`,
          icon: <ExternalLink />,
          action: () => openExternal(p.liveLink),
        },
        {
          id: `repo-${p.name}`,
          group: 'Projects',
          label: `${p.name}: source`,
          icon: <FolderGit2 />,
          action: () => openExternal(p.repoUrl),
        },
      ]),
      ...SOCIALS.map(
        ({ icon: Icon, label, href }): CommandItem => ({
          id: `social-${label}`,
          group: 'Connect',
          label,
          description: href.replace(/^(mailto:|https:\/\/(www\.)?)/, ''),
          icon: <Icon title="" />,
          action: () => openExternal(href),
        }),
      ),
      {
        id: 'copy-email',
        group: 'Connect',
        label: 'Copy email address',
        description: EMAIL,
        icon: <Copy />,
        action: () =>
          void navigator.clipboard?.writeText(EMAIL).catch(() => {}),
      },
      {
        id: 'theme',
        group: 'Preferences',
        label: `Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`,
        icon: <Moon />,
        action: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
      },
      {
        id: 'style',
        group: 'Preferences',
        label:
          style === 'rare' ? 'Switch to Sketch style' : 'Switch to Rare style',
        description: style === 'rare' ? 'Hand-drawn look' : 'Clean RareUI look',
        icon: <PenTool />,
        action: () => setStyle(style === 'rare' ? 'sketch' : 'rare'),
      },
      {
        id: 'accent',
        group: 'Preferences',
        label: accent === 'purple' ? 'Use orange accent' : 'Use purple accent',
        icon: <Palette />,
        action: () => setAccent(accent === 'purple' ? 'orange' : 'purple'),
      },
    ],
    [router, resolvedTheme, setTheme, style, accent, setStyle, setAccent],
  )

  return <CommandPalette commands={commands} className={className} />
}
