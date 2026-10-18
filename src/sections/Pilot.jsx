import { Badge, ContactPill, Icon, Lines } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const STEP_ICONS = ['checklist', 'dbGear', 'laptopGear', 'barcode', 'reportCheck']
const SCORECARD_ICONS = ['stopwatch', 'docCheck', 'alert', 'box', 'search', 'users']

const lines = (text) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {i > 0 && ' '}
      {line}
    </span>
  ))

// The pilot: a five-step roadmap joined by one line, the scorecard agreed up front, then
// the calls to action.
export function Pilot() {
  const { t } = useLanguage()
  const [badge, title, lead] = t.pilot

  return (
    <section
      className={`${styles.section} ${styles.pilotSection}`}
      id="pilot"
      aria-labelledby="pilot-title"
    >
      <div className={site.wrap}>
        <div className={styles.pilotHead}>
          <div>
            <Badge>{badge}</Badge>
            <Lines id="pilot-title" className={styles.pilotTitle} text={title} />
          </div>
          <p className={styles.pilotDuration} data-reveal="">
            <Icon name="calendar" />
            {t.duration}
          </p>
        </div>
        <span className={styles.dualRule} aria-hidden="true" />
        <p className={styles.pilotLead} data-reveal="">
          {lead}
        </p>

        <ol className={styles.pilotRoadmap} data-stagger="" data-draw-icons="">
          {t.pilotSteps.map(([week, name, copy], i) => (
            <li key={i}>
              <small>{week}</small>
              <span className={styles.pilotStep}>{i + 1}</span>
              <span className={styles.pilotIcon}>
                <Icon name={STEP_ICONS[i]} />
              </span>
              <h3>{name}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>

        <div className={styles.pilotScorecard} data-reveal="">
          <div>
            <p className={styles.pilotScoreLabel}>{t.scoreLabel}</p>
            <h3>{lines(t.scoreTitle)}</h3>
          </div>
          <ul data-draw-icons="">
            {t.scorecards.map((item, i) => (
              <li key={i}>
                <span className={styles.dualPointIcon}>
                  <Icon name={SCORECARD_ICONS[i]} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.pilotClose} data-reveal="">
          <ContactPill icon="rocket">{t.cta}</ContactPill>
          <ContactPill variant="outline" interest="all">
            {t.demoCta}
          </ContactPill>
          <p>{lines(t.pilotNote)}</p>
        </div>
      </div>
    </section>
  )
}
