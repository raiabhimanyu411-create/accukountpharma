import { Fragment } from 'react'
import { Badge, Icon, Lines, PillButton } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const MOVEMENT_ICONS = ['box', 'pill', 'return', 'transfer', 'sliders', 'calendar']

// The chart has one column per movement plus a final column for the end state. The record
// stays level at RECORD_Y while the shelf drops a little further with every movement. The
// svg stretches sideways only, so y values are pixels and the dots are placed as html.
const COLUMNS = 7
const RECORD_Y = 14
const SHELF_Y = [14, 36, 54, 72, 94, 116, 136]
const columnX = (i) => (i + 0.5) * 100
const columnLeft = (i) => `${((i + 0.5) / COLUMNS) * 100}%`

function DriftChart({ t }) {
  const last = COLUMNS - 1
  const shelf = SHELF_Y.map((y, i) => `${columnX(i)} ${y}`).join(' L')

  return (
    <div className={styles.driftChart} role="img" aria-label={t.driftChartLabel}>
      <div className={styles.driftGraph} aria-hidden="true">
        <svg viewBox={`0 0 ${COLUMNS * 100} 150`} preserveAspectRatio="none">
          <path d={`M${shelf} L${columnX(last)} ${RECORD_Y}Z`} fill="#8c2f34" opacity=".07" />
          <path
            d={`M${columnX(0)} ${RECORD_Y}H${columnX(last)}`}
            fill="none"
            stroke="#163e64"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M${shelf}`}
            fill="none"
            stroke="#8c2f34"
            strokeWidth="2.5"
            strokeDasharray="7 6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {SHELF_Y.map((y, i) => (
          <Fragment key={i}>
            <i className={styles.driftDot} style={{ left: columnLeft(i), top: RECORD_Y }} />
            {i > 0 && (
              <i
                className={i === last ? styles.driftEnd : styles.driftDrop}
                style={{ left: columnLeft(i), top: y }}
              />
            )}
          </Fragment>
        ))}
        <i className={styles.driftArrow} style={{ left: columnLeft(last) }} />
        <span className={styles.driftSync}>{t.inSync}</span>
      </div>
      <ul className={styles.driftLegend} aria-hidden="true">
        <li className={styles.driftRecord}>{t.record}</li>
        <li className={styles.driftGap}>{t.driftLabel}</li>
        <li className={styles.driftShelf}>{t.reality}</li>
      </ul>
    </div>
  )
}

// Where drift begins: the six stock movements over a chart of the shelf falling away from
// the record.
export function InventoryDrift() {
  const { t } = useLanguage()
  const [badge, title, lead] = t.drift

  return (
    <section
      className={`${styles.section} ${styles.drift}`}
      id="inventory-drift"
      aria-labelledby="inventory-drift-title"
    >
      <div className={site.wrap}>
        <div className={styles.driftHead}>
          <div>
            <Badge>{badge}</Badge>
            <Lines id="inventory-drift-title" text={title} />
          </div>
          <p className={styles.lead} data-reveal="">
            {lead}
          </p>
        </div>
        <div className={styles.driftPanel} data-reveal="">
          <div className={styles.driftFlow}>
            <ol className={styles.driftMoves} data-stagger="" data-draw-icons="">
              {t.movements.map((label, i) => (
                <li key={i}>
                  <span className={styles.driftIcon}>
                    <Icon name={MOVEMENT_ICONS[i]} />
                  </span>
                  {label}
                </li>
              ))}
            </ol>
            <DriftChart t={t} />
          </div>
          <p className={styles.driftNote}>{t.driftNote}</p>
        </div>
        <div className={styles.driftCta} data-reveal="">
          <PillButton variant="outline" href="#smartphone-web">
            {t.driftCta}
          </PillButton>
        </div>
      </div>
    </section>
  )
}
