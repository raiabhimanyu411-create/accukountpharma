import { Badge, Icon, Lines } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const SYSTEMS = [
  ['mortar', 'int-dispensing'],
  ['register', 'int-pos'],
  ['truck', 'int-wholesaler'],
  ['database', 'int-inventory'],
]
const POINT_ICONS = ['download', 'phone', 'gear', 'link']

// Each system card's centre is at an eighth, three eighths… of the column; the lines
// gather at the middle and continue as one arrow into the phone.
const CARD_Y = [12.5, 37.5, 62.5, 87.5]

function FeedLines() {
  return (
    <svg className={styles.intLines} viewBox="0 0 100 100" preserveAspectRatio="none">
      {CARD_Y.map((y) => (
        <path
          key={y}
          d={`M0 ${y}H14C24 ${y} 24 50 34 50`}
          fill="none"
          stroke="#9fb3c8"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}

function Arrow({ label, note, className }) {
  return (
    <div className={`${styles.intArrow} ${className ?? ''}`}>
      <span className={styles.intArrowShaft} aria-hidden="true" />
      <p>
        <strong>{label}</strong>
        {note && <small>{note}</small>}
      </p>
    </div>
  )
}

// Systems feed ACCUKOUNT on the phone; verified evidence goes out to the web dashboard.
export function Integrations() {
  const { t } = useLanguage()
  const [badge, title, subtitle] = t.integrations
  const [dpdTitle, dpdCopy] = t.integrationDpd
  const [reviewTitle, reviewCopy] = t.integrationReview

  return (
    <section
      className={`${styles.section} ${styles.intSection}`}
      id="integrations"
      aria-labelledby="integrations-title"
    >
      <div className={site.wrap}>
        <Badge>{badge}</Badge>
        <Lines id="integrations-title" className={styles.intTitle} text={title} />
        <span className={styles.dualRule} aria-hidden="true" />
        <p className={styles.dualSubtitle} data-reveal="">
          {subtitle}
        </p>

        <div className={styles.intStage}>
          <ul className={styles.intSystems} data-stagger="" data-draw-icons="">
            {t.integrationLabels.map(([name, note], i) => (
              <li key={i}>
                <span className={styles.idRouteIcon}>
                  <Icon name={SYSTEMS[i][0]} />
                </span>
                <span>
                  <strong>{name}</strong>
                  {note && <small>{note}</small>}
                </span>
                <img
                  src={`assets/${SYSTEMS[i][1]}.webp`}
                  width="86"
                  height="72"
                  loading="lazy"
                  alt=""
                />
              </li>
            ))}
          </ul>
          <div className={styles.intFeed} data-reveal="">
            <FeedLines />
            <Arrow label={t.inbound} note={t.inboundNote} />
          </div>
          <div className={styles.intPhone} data-reveal="">
            <p className={styles.intDpd}>
              <span className={styles.intDpdIcon}>
                <Icon name="database" />
              </span>
              <span>
                <strong>{dpdTitle}</strong>
                {dpdCopy}
              </span>
            </p>
            <img
              src="assets/int-phone.webp"
              width="173"
              height="334"
              loading="lazy"
              alt={t.integrationPhoneAlt}
            />
          </div>
          <Arrow label={t.outbound} className={styles.intOut} />
          <div className={styles.intLaptop} data-reveal="">
            <img
              src="assets/int-laptop.webp"
              width="533"
              height="340"
              loading="lazy"
              alt={t.integrationLaptopAlt}
            />
            <small>{t.workflowNote}</small>
            <h3>{reviewTitle}</h3>
            <p>{reviewCopy}</p>
          </div>
        </div>

        <ul className={styles.dualPoints} data-stagger="" data-draw-icons="">
          {t.integrationPoints.map(([name, note], i) => (
            <li key={i}>
              <span className={styles.dualPointIcon}>
                <Icon name={POINT_ICONS[i]} />
              </span>
              <span>
                <strong>{name}</strong>
                {note}
              </span>
            </li>
          ))}
        </ul>
        <p className={styles.intNote}>
          {t.integrationNote.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && ' '}
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
