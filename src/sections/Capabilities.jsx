import { Icon } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const CAPABILITY_ICONS = ['phone', 'language', 'scan', 'check', 'link']

// The five capabilities the platform runs on, as a chain of boxes that scrolls endlessly.
// The set is rendered twice so the loop is seamless; the copy is hidden from assistive tech.
// Hovering or focusing the chain pauses it, and with reduced motion it stays still.
export function Capabilities() {
  const { t } = useLanguage()
  const items = t.strip.map((title, i) => ({
    title,
    note: t.stripNotes[i],
    icon: CAPABILITY_ICONS[i],
  }))

  return (
    <section className={styles.how} aria-labelledby="capabilities-title">
      <div className={site.wrap}>
        <h2 id="capabilities-title" className={styles.capabilitiesLabel} data-reveal="">
          {t.capabilitiesLabel}
        </h2>
      </div>
      <div className={styles.marquee} data-reveal="">
        <ul className={styles.marqueeTrack}>
          {[...items, ...items].map(({ title, note, icon }, i) => (
            <li
              key={i}
              className={styles.capability}
              aria-hidden={i >= items.length ? 'true' : undefined}
            >
              <span className={styles.capabilityIcon}>
                <Icon name={icon} />
              </span>
              <strong>
                {/* Each title breaks at the same point, so every box has a two-line title. */}
                {title.split('\n').map((part, j) => (
                  <span key={j}>
                    {j > 0 && ' '}
                    {part}
                  </span>
                ))}
              </strong>
              <small>{note}</small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
