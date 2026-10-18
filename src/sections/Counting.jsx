import { Badge, Icon, Lines } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const MODES = [
  ['automatic', 'scan'],
  ['quick', 'tap'],
  ['bulk', 'box'],
  ['voice', 'mic'],
]

// One app, four ways to count: the four app screens, each with its mode underneath.
export function Counting() {
  const { t } = useLanguage()
  const [badge, title, subtitle] = t.count

  return (
    <section
      className={`${styles.section} ${styles.countSection}`}
      id="counting"
      aria-labelledby="counting-title"
    >
      <div className={site.wrap}>
        <Badge>{badge}</Badge>
        <Lines id="counting-title" className={styles.countTitle} text={title} />
        <span className={styles.dualRule} aria-hidden="true" />
        <p className={styles.dualSubtitle} data-reveal="">
          {subtitle}
        </p>

        <ul className={styles.countModes} data-stagger="" data-draw-icons="">
          {t.countModes.map(([name, note], i) => (
            <li key={i}>
              <img
                src={`assets/count-${MODES[i][0]}.webp`}
                width="240"
                height="435"
                loading="lazy"
                alt={t.countAlts[i]}
              />
              <div>
                <span className={styles.dualPointIcon}>
                  <Icon name={MODES[i][1]} />
                </span>
                <span>
                  <strong>{name}</strong>
                  {note}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.countNote}>{t.countNote}</p>

        <div className={styles.countRule} data-reveal="">
          <p>{t.countRule}</p>
          <p>{t.countFields}</p>
        </div>
      </div>
    </section>
  )
}
