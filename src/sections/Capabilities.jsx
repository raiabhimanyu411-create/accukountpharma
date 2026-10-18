import { Icon } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import { cx } from '../lib/cx.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const STRIP_ICONS = ['phone', 'language', 'scan', 'check', 'link']

export function Capabilities() {
  const { t } = useLanguage()

  return (
    <div className={styles.capabilityStrip}>
      <ul className={cx(site.wrap, styles.capabilityList)} data-stagger="" data-draw-icons="">
        {t.strip.map((item, i) => (
          <li key={i} className={styles.capability}>
            <span className={styles.capabilityIcon}>
              <Icon name={STRIP_ICONS[i]} />
            </span>
            <span>
              <strong>{item}</strong>
              <small>{t.stripNotes[i]}</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
