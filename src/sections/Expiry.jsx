import { Badge, Icon, Lines, PillButton } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const ACTION_ICONS = ['clipboard', 'box', 'return', 'cart', 'trash', 'docCheck']

// Expiry into action: the copy beside the action-plan photo, then the six actions.
export function Expiry() {
  const { t } = useLanguage()
  const [badge, title, lead] = t.expiry

  return (
    <section
      className={`${styles.section} ${styles.expirySection}`}
      id="expiry"
      aria-labelledby="expiry-title"
    >
      <div className={styles.expiryTop}>
        <img
          className={styles.expiryPhoto}
          src="assets/expiry-action.webp"
          width="867"
          height="628"
          loading="lazy"
          alt={t.expiryAlt}
        />
        <div className={site.wrap}>
          <div className={styles.expiryCopy}>
            <Badge>{badge}</Badge>
            <Lines id="expiry-title" className={styles.expiryTitle} text={title} />
            <span className={styles.dualRule} aria-hidden="true" />
            <p className={styles.lead} data-reveal="">
              {lead}
            </p>
            <h3 data-reveal="">
              {t.expirySubtitle.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && ' '}
                  {line}
                </span>
              ))}
            </h3>
            <ul data-stagger="">
              {t.expiryList.map((item, i) => (
                <li key={i}>
                  <span className={styles.dualCheck}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5.5 12.5l4 4 9-9" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div data-reveal="">
              <PillButton variant="outline" href="#pilot">
                {t.cta}
              </PillButton>
            </div>
          </div>
        </div>
      </div>
      <div className={site.wrap}>
        <ul className={styles.expiryActions} data-stagger="" data-draw-icons="">
          {t.expiryActions.map(([name, note], i) => (
            <li key={i}>
              <span className={styles.dualPointIcon}>
                <Icon name={ACTION_ICONS[i]} />
              </span>
              <strong>{name}</strong>
              {note}
            </li>
          ))}
        </ul>
        <p className={styles.expiryFoot}>{t.expiryFoot}</p>
      </div>
    </section>
  )
}
