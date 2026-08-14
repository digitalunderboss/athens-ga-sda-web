import { NavLink as RouterNavLink } from 'react-router'
import {
  HomeIcon,
  InformationCircleIcon,
  SparklesIcon,
  BookOpenIcon,
  PlayCircleIcon,
  UserGroupIcon,
  HeartIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'
import type { NavLink } from '../lib/types'
import { isExternalLink } from '../lib/links'

interface MobileQuickNavProps {
  navLinks: NavLink[]
}

const ICONS_BY_LABEL: Record<string, typeof HomeIcon> = {
  Home: HomeIcon,
  About: InformationCircleIcon,
  "I'm New": SparklesIcon,
  Discipleship: BookOpenIcon,
  Sermons: PlayCircleIcon,
  'Group Bible Study': UserGroupIcon,
  Offering: HeartIcon,
}

function MobileQuickNav({ navLinks }: MobileQuickNavProps) {
  if (navLinks.length === 0) return null

  return (
    <nav
      className="flex gap-x-6 overflow-x-auto px-4 pb-3 min-[560px]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Quick navigation"
    >
      {navLinks.map((link) => {
        const Icon = ICONS_BY_LABEL[link.label] ?? Squares2X2Icon
        if (isExternalLink(link.path)) {
          return (
            <a
              key={link._key}
              href={link.path}
              target="_blank"
              rel="noreferrer"
              className="text-text flex shrink-0 flex-col items-center gap-1 text-xs"
            >
              <Icon className="h-6 w-6" />
              <span className="whitespace-nowrap">{link.label}</span>
            </a>
          )
        }
        return (
          <RouterNavLink
            key={link._key}
            to={link.path}
            className={({ isActive }) =>
              `flex shrink-0 flex-col items-center gap-1 text-xs ${
                isActive ? 'text-accent font-semibold' : 'text-text'
              }`
            }
          >
            <Icon className="h-6 w-6" />
            <span className="whitespace-nowrap">{link.label}</span>
          </RouterNavLink>
        )
      })}
    </nav>
  )
}

export default MobileQuickNav
