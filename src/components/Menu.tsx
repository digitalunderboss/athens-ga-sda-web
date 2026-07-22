import { useState } from 'react'
import { NavLink as RouterNavLink } from 'react-router'
import type { NavLink } from '../lib/types'

interface MenuProps {
  navLinks: NavLink[]
}

function Menu({ navLinks }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-accent font-semibold' : 'text-text hover:text-primary'

  return (
    <>
      <nav className="hidden items-center gap-6 md:flex">
        {navLinks.map((link) => (
          <RouterNavLink key={link._key} to={link.path} className={linkClasses}>
            {link.label}
          </RouterNavLink>
        ))}
      </nav>

      <button
        type="button"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
      >
        <span
          className={`h-0.5 w-6 bg-text transition-transform ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
        />
        <span className={`h-0.5 w-6 bg-text transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
        <span
          className={`h-0.5 w-6 bg-text transition-transform ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
        />
      </button>

      {isOpen && (
        <nav className="bg-background fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 text-xl md:hidden">
          {navLinks.map((link) => (
            <RouterNavLink
              key={link._key}
              to={link.path}
              className={linkClasses}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </RouterNavLink>
          ))}
        </nav>
      )}
    </>
  )
}

export default Menu
