import { Badge, Icon, Lines } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const ROUTE_ICONS = ['barcode', 'matrix', 'din']
const ROUTE_IMAGES = ['id-upc', 'id-gs1', 'id-din']
const POINT_ICONS = ['barcode', 'phone', 'link', 'docCheck']

// Each route card's centre sits at a sixth, a half and five sixths of the column; the lines
// meet the phone's edge a little apart. The svg stretches, so the dots are placed as html.
const LINK_FROM = [100 / 6, 50, 500 / 6]
const LINK_TO = [36, 44, 52]

function RouteLinks() {
  return (
    <div className={styles.idLinks} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {LINK_FROM.map((from, i) => (
          <path
            key={i}
            d={`M0 ${from}H24L76 ${LINK_TO[i]}H100`}
            fill="none"
            stroke="#8c2f34"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {LINK_FROM.map((from, i) => (
        <span key={i}>
          <i style={{ left: 0, top: `${from}%` }} />
          <i style={{ left: '100%', top: `${LINK_TO[i]}%` }} />
        </span>
      ))}
    </div>
  )
}

function Tick() {
  return (
    <span className={styles.dualCheck}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.5 12.5l4 4 9-9" />
      </svg>
    </span>
  )
}

// Three identification routes on one smartphone, normalized into one verified Canadian
// product record.
export function Identification() {
  const { t } = useLanguage()
  const [badge, title, subtitle] = t.identify
  const [normalTitle, normalCopy] = t.idNormal
  const [dpdTitle, dpdCopy] = t.idDpd

  return (
    <section
      className={`${styles.section} ${styles.idSection}`}
      id="identification"
      aria-labelledby="identification-title"
    >
      <div className={site.wrap}>
        <Badge>{badge}</Badge>
        <Lines id="identification-title" className={styles.idTitle} text={title} />
        <span className={styles.dualRule} aria-hidden="true" />
        <p className={styles.dualSubtitle} data-reveal="">
          {subtitle}
        </p>

        <div className={styles.idStage}>
          <ul className={styles.idRoutes} data-stagger="" data-draw-icons="">
            {t.idRoutes.map(([name, copy, note], i) => (
              <li key={i}>
                <span className={styles.idRouteIcon}>
                  <Icon name={ROUTE_ICONS[i]} />
                </span>
                <img
                  src={`assets/${ROUTE_IMAGES[i]}.webp`}
                  width="170"
                  height="102"
                  loading="lazy"
                  alt={t.idRouteAlts[i]}
                />
                <span>
                  <strong>{name}</strong>
                  {copy}
                  {note && <small>{note}</small>}
                </span>
              </li>
            ))}
          </ul>
          <RouteLinks />
          <div className={styles.idPhone} data-reveal="">
            <img
              src="assets/id-phone.webp"
              width="220"
              height="297"
              loading="lazy"
              alt={t.idPhoneAlt}
            />
            <div className={styles.idNormal}>
              <h3>{normalTitle}</h3>
              <p>
                {normalCopy.split('\n').map((line, i) => (
                  <span key={i}>
                    {i > 0 && ' '}
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <svg className={styles.idArrow} viewBox="0 0 40 32" aria-hidden="true">
            <path d="M0 12h22V3l18 13-18 13v-9H0z" />
          </svg>
          <div className={styles.idRecord} data-reveal="" data-draw-icons="">
            <div className={styles.idRecordHead}>
              <span className={styles.idRouteIcon}>
                <Icon name="docCheck" />
              </span>
              <h3>{t.idRecord}</h3>
            </div>
            <img
              src="assets/id-record.webp"
              width="370"
              height="116"
              loading="lazy"
              alt={t.idRecordAlt}
            />
            <ul>
              {t.idRecordList.map((item, i) => (
                <li key={i}>
                  <Tick />
                  {item}
                </li>
              ))}
            </ul>
            <p className={styles.idDpd}>
              <Icon name="database" />
              <span>
                <strong>{dpdTitle}</strong>
                {dpdCopy}
              </span>
            </p>
          </div>
        </div>
        <p className={styles.idNote} data-reveal="">
          {t.idRoutesNote}
        </p>

        <ul className={styles.dualPoints} data-stagger="" data-draw-icons="">
          {t.idPoints.map(([name, note], i) => (
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
      </div>
    </section>
  )
}
