import { Badge, Icon, Lines, PillButton } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const MEASURE_ICONS = [
  'box',
  'clipboard',
  'document',
  'transfer',
  'chart',
  'clock',
  'barcode',
  'shield',
]

// One management view: the copy and pharmacy network beside the dashboard monitor, then the
// eight measures it brings together.
export function Dashboard() {
  const { t } = useLanguage()
  const [badge, title, lead] = t.dashboard

  return (
    <section
      className={`${styles.section} ${styles.dashSection}`}
      id="dashboard"
      aria-labelledby="dashboard-title"
    >
      <div className={site.wrap}>
        <div className={styles.dashHead}>
          <Badge>{badge}</Badge>
          <Lines id="dashboard-title" className={styles.dashTitle} text={title} />
          <span className={styles.dualRule} aria-hidden="true" />
          <p className={styles.lead} data-reveal="">
            {lead}
          </p>
        </div>
        <div className={styles.dashStage}>
          <div className={styles.dashCopy}>
            <h3 data-reveal="">
              {t.dashSubtitle.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && ' '}
                  {line}
                </span>
              ))}
            </h3>
            <ul className={styles.dashList} data-stagger="">
              {t.dashList.map((item, i) => (
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
            <div className={styles.dashNetwork} data-reveal="" data-draw-icons="">
              <ul>
                {t.dashLocations.map((location, i) => (
                  <li key={i}>
                    <span className={styles.idRouteIcon}>
                      <Icon name="store" />
                    </span>
                    {location}
                  </li>
                ))}
              </ul>
              <small>{t.dashLocationsNote}</small>
            </div>
            <div data-reveal="">
              <PillButton variant="outline" href="#pilot">
                {t.cta}
              </PillButton>
            </div>
          </div>
          <figure className={styles.dashMonitor} data-reveal="">
            <img
              src="assets/dashboard-view.webp"
              width="721"
              height="516"
              loading="lazy"
              alt={t.dashAlt}
            />
            <figcaption>{t.dashImageNote}</figcaption>
          </figure>
        </div>

        <ul className={styles.dashMeasures} data-stagger="" data-draw-icons="">
          {t.dashMeasures.map((measure, i) => (
            <li key={i}>
              <span className={styles.dualPointIcon}>
                <Icon name={MEASURE_ICONS[i]} />
              </span>
              {measure}
            </li>
          ))}
        </ul>
        <p className={styles.dashNote}>{t.dashNote}</p>
      </div>
    </section>
  )
}
