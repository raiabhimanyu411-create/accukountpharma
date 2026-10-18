import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n.js'
import { ContactButton } from './ui.jsx'
import shell from '../styles/Shared.module.css'
import site from '../styles/Site.module.css'

export function Header({ gallery }) {
  const { t, lang, setLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <a className={shell.skip} href="#main">
        {t.skip}
      </a>
      <header className={shell.siteHeader} id="top">
        <div className={`${site.wrap} ${shell.navInner}`}>
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
          <nav id="navigation" className={menuOpen ? shell.open : undefined} aria-label={t.mainNav}>
            {gallery ? (
              <a href={`index.html?lang=${lang}`} onClick={closeMenu}>
                {t.websiteLink}
              </a>
            ) : (
              t.nav.map((item, i) => (
                <a key={i} href={`#${t.navIds[i]}`} onClick={closeMenu}>
                  {item}
                </a>
              ))
            )}
          </nav>
          <div className={shell.navActions}>
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
            <ContactButton className={`${site.small} ${shell.navCta}`}>{t.cta}</ContactButton>
            <button
              id="menu"
              type="button"
              className={shell.menuButton}
              aria-label={t.openMenu}
              aria-controls="navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
