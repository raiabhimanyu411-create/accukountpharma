import { Icon, SectionHead } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const ISSUE_ICONS = ['box', 'alert', 'chart', 'clock', 'document']

export function Challenge() {
  const { t } = useLanguage()

  return (
    <section
      className={`${styles.section} ${site.wrap}`}
      id="challenge"
      aria-labelledby="challenge-title"
    >
      <SectionHead content={t.challenge} id="challenge" />
      <div className={styles.challengeLayout}>
        <figure className={styles.challengePhoto} data-clip="">
          <img
            src="assets/inventory-disconnect.png"
            width="482"
            height="207"
            loading="lazy"
            alt={t.challengeAlt}
          />
        </figure>
        <ul className={styles.issueList} data-stagger="" data-draw-icons="">
          {t.challengeIssues.map((issue, i) => (
            <li key={i}>
              <span className={styles.issueIcon}>
                <Icon name={ISSUE_ICONS[i]} />
              </span>
              {issue}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.impactBand} data-reveal="" data-draw-icons="">
        <Icon name="users" />
        <strong>{t.impact}</strong>
      </div>
    </section>
  )
}
