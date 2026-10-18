import { useEffect, useRef, useState } from 'react'
import { useDialogs } from '../dialog-context.js'
import { useLanguage } from '../i18n.js'
import { cx } from '../lib/cx.js'
import shell from '../styles/Shared.module.css'
import site from '../styles/Site.module.css'

const ROCKET =
  'M12.6 3.4c2.6-1.5 5.6-1.9 7.6-1.6.3 2-.1 5-1.6 7.6-1 1.8-2.6 3.4-4.4 4.6l-.4 3.7a1 1 0 0 1-.5.8l-3 1.8a.6.6 0 0 1-.9-.6l.5-3.2-2.5-2.5-3.2.5a.6.6 0 0 1-.6-.9l1.8-3a1 1 0 0 1 .8-.5l3.7-.4c1.2-1.8 2.8-3.4 4.7-4.3Zm2.9 3.1a2 2 0 1 0 0 2.9 2 2 0 0 0 0-2.9ZM5.3 16.1c.7-.7 1.9-.7 2.6 0s.7 1.9 0 2.6c-.9.9-3.6 1.5-3.6 1.5s.5-2.7 1-4.1Z'
const NO_SECTIONS = []
// Pharmacy workspace sign-in address; the Sign In link stays inert until this is set.
const SIGN_IN_URL = ''

// Underline the nav item for the section currently in view.
function useCurrentSection(ids) {
  const [current, setCurrent] = useState('')

  useEffect(() => {
    if (!ids.length || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [ids])

  return current
}

// Tuck the header away while scrolling down; bring it back on the way up.
function useHideOnScroll() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (Math.abs(y - lastY) < 6) return
      setHidden(y > lastY && y > 160)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return [hidden, setHidden]
}

export function Header({ gallery }) {
  const { t, lang, setLanguage } = useLanguage()
  const { openContact } = useDialogs()
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useHideOnScroll()
  const current = useCurrentSection(gallery ? NO_SECTIONS : t.navIds)
  const header = useRef(null)
  const toggle = useRef(null)
  const closeMenu = () => setMenuOpen(false)

  // While the menu is open, Escape and clicks outside the header close it.
  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggle.current?.focus()
      }
    }
    const onClick = (event) => {
      if (!header.current?.contains(event.target)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [menuOpen])

  return (
    <>
      <a className={shell.skip} href="#main">
        {t.skip}
      </a>
      <header
        ref={header}
        className={cx(shell.header, hidden && !menuOpen && shell.headerHidden)}
        id="top"
        onFocusCapture={() => setHidden(false)}
      >
        <div className={cx(site.wrap, shell.headerInner)}>
          <a
            className={shell.brand}
            href={gallery ? 'index.html' : '#top'}
            aria-label="ACCUKOUNT Pharma"
          >
            <img
              src="assets/accukount-pharma-logo.webp"
              width="502"
              height="200"
              alt="ACCUKOUNT Pharma"
            />
          </a>
          <nav
            id="navigation"
            className={cx(shell.nav, menuOpen && shell.navOpen)}
            aria-label={t.mainNav}
          >
            {gallery ? (
              <a href={`index.html?lang=${lang}`} onClick={closeMenu}>
                {t.websiteLink}
              </a>
            ) : (
              t.nav.map((item, i) => (
                <a
                  key={i}
                  href={`#${t.navIds[i]}`}
                  aria-current={current === t.navIds[i] ? 'location' : undefined}
                  onClick={closeMenu}
                >
                  {item}
                </a>
              ))
            )}
            <button
              className={shell.requestDemo}
              type="button"
              onClick={(e) => {
                closeMenu()
                openContact(e.currentTarget)
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={ROCKET} />
              </svg>
              {t.requestDemo}
            </button>
            <a
              className={shell.signIn}
              href={SIGN_IN_URL || '#'}
              onClick={(event) => {
                if (!SIGN_IN_URL) event.preventDefault()
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0 1 16 0" />
              </svg>
              {t.signIn}
            </a>
          </nav>
          <div className={shell.language} role="group" aria-label={t.languageGroup}>
            <button
              type="button"
              lang="en"
              aria-pressed={lang === 'en'}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <span>/</span>
            <button
              type="button"
              lang="fr"
              aria-pressed={lang === 'fr'}
              onClick={() => setLanguage('fr')}
            >
              FR
            </button>
          </div>
          <button
            ref={toggle}
            id="menu"
            type="button"
            className={shell.menuToggle}
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            aria-controls="navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </>
  )
}
