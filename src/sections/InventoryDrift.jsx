import { useState } from 'react'
import { Icon, SectionHead, TabPanel, Tabs } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const MOVEMENT_ICONS = ['box', 'document', 'return', 'transfer', 'sliders', 'clock']
const CHART_FONT = 'Arial,sans-serif'

// The dashed "shelf reality" line drops further from the record with each movement.
function DriftChart({ t, movement: n }) {
  const y = 176 + n * 16
  const drop = (step, value) => (n > step ? value : 110)

  return (
    <div className={styles.driftChart}>
      <svg viewBox="0 0 900 290" role="img" aria-label={t.driftLabel}>
        <path d={`M40 100H860L860 ${y}L40 100`} fill="#8c2f34" opacity=".08" />
        <path d="M40 100H860" fill="none" stroke="#163e64" strokeWidth="4" />
        <path
          d={`M40 100L180 110L320 ${drop(0, 135)}L460 ${drop(1, 155)}L600 ${drop(2, 180)}L740 ${drop(3, 205)}L860 ${y}`}
          fill="none"
          stroke="#8c2f34"
          strokeWidth="4"
          strokeDasharray="7 7"
        />
        {[40, 180, 320, 460, 600, 740, 860].map((x) => (
          <circle key={x} cx={x} cy="100" r="6" fill="#163e64" />
        ))}
        <text x="40" y="66" fill="#000" fontSize="18" fontFamily={CHART_FONT}>
          {t.record}
        </text>
        <text x="620" y="275" fill="#8c2f34" fontSize="18" fontFamily={CHART_FONT}>
          {t.reality}
        </text>
        <path d={`M845 114V${y - 8}`} stroke="#8c2f34" strokeWidth="2" />
        <text
          x="760"
          y={y + 30}
          fill="#8c2f34"
          fontSize="16"
          textAnchor="end"
          fontFamily={CHART_FONT}
        >
          {t.driftLabel}
        </text>
      </svg>
      <p className={styles.sampleNote}>{t.example}</p>
    </div>
  )
}

export function InventoryDrift() {
  const { t } = useLanguage()
  const [movement, setMovement] = useState(0)

  return (
    <section
      className={`${styles.section} ${styles.pale}`}
      id="inventory-drift"
      aria-labelledby="inventory-drift-title"
    >
      <div className={site.wrap}>
        <SectionHead content={t.drift} id="inventory-drift" />
        <p className={`${site.small} ${site.muted}`}>{t.selectMovement}</p>
        <Tabs
          data-reveal=""
          id="movement"
          labels={t.movements}
          active={movement}
          onChange={setMovement}
          panelId="drift-panel"
          className={styles.movementTabs}
          label={t.selectMovement}
          renderTab={(label, i) => (
            <>
              <Icon name={MOVEMENT_ICONS[i]} />
              <span>{label}</span>
            </>
          )}
        />
        <TabPanel data-reveal="" id="drift-panel" tabsId="movement" active={movement}>
          <DriftChart t={t} movement={movement} />
          <div className={styles.movementDetail} role="status">
            <b>{`${String(movement + 1).padStart(2, '0')} / ${t.movements[movement]}`}</b>
            <p>{t.movementCopy[movement]}</p>
          </div>
        </TabPanel>
      </div>
    </section>
  )
}
