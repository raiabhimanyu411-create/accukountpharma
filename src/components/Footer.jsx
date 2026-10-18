import { ACREBIS_URL, CONTACT_EMAIL, CONTACT_PHONE } from '../contact.js'
import { useDialogs } from '../dialog-context.js'
import { useLanguage } from '../i18n.js'
import site from '../styles/Site.module.css'
import shell from '../styles/Shared.module.css'

export function Footer({ gallery }) {
  const { t, lang } = useLanguage()
  const { openContact, openPrivacy } = useDialogs()
  // On the visuals page the section links lead back to the home page.
  const home = gallery ? `index.html?lang=${lang}` : ''
  const links = t.footerLinks

  return (
    <footer>
      <div className={`${site.wrap} ${shell.footerMain}`}>
        <div className={shell.footerBrand}>
          <a className={shell.brand} href="#top">
            <img
              src="assets/accukount-pharma-logo.webp"
              width="502"
              height="200"
              alt="ACCUKOUNT Pharma"
            />
          </a>
          <p>
            {t.footer.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && ' '}
                {line}
              </span>
            ))}
          </p>
          <small>{t.footerNote}</small>
        </div>
        <ul>
          {links.slice(0, 4).map(([label, href]) => (
            <li key={label}>
              <a href={`${home}${href}`}>{label}</a>
            </li>
          ))}
        </ul>
        <ul>
          {links.slice(4).map(([label, href]) => (
            <li key={label}>
              <a href={`${home}${href}`}>{label}</a>
            </li>
          ))}
          <li>
            <button type="button" onClick={(e) => openContact(e.currentTarget, 'all')}>
              {t.liveDemo}
            </button>
          </li>
        </ul>
        <ul>
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </li>
          <li>
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}>{CONTACT_PHONE}</a>
          </li>
          <li>
            <a href={ACREBIS_URL} target="_blank" rel="noopener">
              {t.visitAcrebis} ↗
            </a>
          </li>
        </ul>
      </div>
      <div className={`${site.wrap} ${shell.footerBottom}`}>
        <span>
          © 2026 ACREBIS. {t.rights}{' '}
          <button type="button" onClick={(e) => openPrivacy(e.currentTarget)}>
            {t.privacy}
          </button>
          {' · '}
          <a href={`visuals.html?lang=${lang}`}>{t.visualsLink}</a>
        </span>
        <span>
          <b>ACCUKOUNT</b> Pharma · {t.slogan}
        </span>
        <a href="#top">{t.backTop} ↑</a>
      </div>
    </footer>
  )
}
