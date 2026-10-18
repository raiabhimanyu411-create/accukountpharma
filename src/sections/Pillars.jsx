import { Icon } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const PILLAR_ICONS = ['scan', 'check', 'clock']

// Capture, verify, track: the three steps the platform is built around, as a connected flow.
export function Pillars() {
  const { t } = useLanguage()

  return (
    <section className={styles.pillars} aria-labelledby="pillars-title">
      <div className={site.wrap}>
        <h2 id="pillars-title" className={site.srOnly}>
          {t.pillarsTitle}
        </h2>
        <ol className={styles.pillarList} data-stagger="" data-draw-icons="">
          {t.pillars.map(([title, note], i) => (
            <li key={i} className={styles.pillar}>
              <span className={styles.pillarIcon}>
                <Icon name={PILLAR_ICONS[i]} />
              </span>
              <span className={styles.pillarStep}>{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
