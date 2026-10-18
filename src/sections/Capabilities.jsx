import { Icon } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const CAPABILITY_ICONS = ['phone', 'language', 'scan', 'check', 'link']

// The five capabilities the platform runs on, in a white panel on a grey band.
export function Capabilities() {
  const { t } = useLanguage()

  return (
    <section className={styles.how} aria-labelledby="capabilities-title">
      <div className={site.wrap}>
        <h2 id="capabilities-title" className={styles.capabilitiesLabel} data-reveal="">
          {t.capabilitiesLabel}
        </h2>
        <ul className={styles.capabilityList} data-stagger="" data-draw-icons="">
          {t.strip.map((item, i) => (
            <li key={i} className={styles.capability}>
              <span className={styles.capabilityIcon}>
                <Icon name={CAPABILITY_ICONS[i]} />
              </span>
              <strong>{item}</strong>
              <small>{t.stripNotes[i]}</small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
