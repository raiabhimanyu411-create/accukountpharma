import { Icon, SectionHead } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import { cx } from '../lib/cx.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const STEP_ICONS = ['scan', 'check', 'clock']
const CAPABILITY_ICONS = ['phone', 'language', 'scan', 'check', 'link']

// Capture, verify, track as connected steps, with the capabilities they run on below.
export function HowItWorks() {
  const { t } = useLanguage()

  return (
    <section className={cx(styles.section, styles.how)} id="how" aria-labelledby="how-title">
      <div className={site.wrap}>
        <SectionHead content={[t.howBadge, t.howTitle, t.howLead]} id="how" center />
        <ol className={styles.steps} data-stagger="" data-draw-icons="">
          {t.pillars.map(([title, note], i) => (
            <li key={i} className={styles.step}>
              <span className={styles.stepIcon}>
                <Icon name={STEP_ICONS[i]} />
              </span>
              <h3>{title}</h3>
              <p>{note}</p>
            </li>
          ))}
        </ol>
        <div className={styles.capabilities}>
          <p className={styles.capabilitiesLabel} data-reveal="">
            {t.capabilitiesLabel}
          </p>
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
      </div>
    </section>
  )
}
