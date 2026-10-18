import { useDialogs } from '../dialog-context.js'
import { useLanguage } from '../i18n.js'
import site from '../styles/Site.module.css'
import shell from '../styles/Shared.module.css'

export function Footer() {
  const { t, lang } = useLanguage()
  const { openPrivacy } = useDialogs()

  return (
    <footer>
      <div className={`${site.wrap} ${shell.footerMain}`}>
        <a className={shell.brand} href="#top">
          <img
            src="assets/accukount-pharma-logo.webp"
            width="502"
            height="200"
            alt="ACCUKOUNT Pharma"
          />
        </a>
        <p>{t.footer}</p>
        <a href="https://www.accukount.com/" target="_blank" rel="noopener">
          accukount.com ↗
        </a>
      </div>
      <div className={`${site.wrap} ${shell.footerBottom}`}>
        <span>© 2026 ACREBIS. {t.rights}</span>
        <button type="button" onClick={(e) => openPrivacy(e.currentTarget)}>
          {t.privacy}
        </button>
        <a href={`visuals.html?lang=${lang}`}>{t.visualsLink}</a>
        <a href="#top">{t.backTop} ↑</a>
      </div>
    </footer>
  )
}
