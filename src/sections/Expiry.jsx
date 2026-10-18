import { useState } from 'react'
import { CheckList, SectionHead, TabPanel, Tabs } from '../components/ui.jsx'
import { expiryBatches } from '../data/samples.js'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

// Tabs: expired, 0–30 days, 31–60 days, 61–90 days, all.
const ALL_TAB = 4
const TAB_RANGES = [
  [-Infinity, -1],
  [0, 30],
  [31, 60],
  [61, 90],
]

function inTab(days, tab) {
  if (tab === ALL_TAB) return true
  const [min, max] = TAB_RANGES[tab]
  return days >= min && days <= max
}

function barColour(days) {
  if (days < 0) return '#8c2f34'
  if (days <= 30) return '#b06028'
  if (days <= 60) return '#a17b22'
  return '#163e64'
}

export function Expiry() {
  const { t } = useLanguage()
  const [tab, setTab] = useState(ALL_TAB)
  const batches = expiryBatches.filter((batch) => inTab(batch.days, tab))
  const atRisk = batches.reduce((sum, batch) => sum + batch.qty, 0)

  return (
    <section
      className={`${styles.section} ${styles.pale}`}
      id="expiry"
      aria-labelledby="expiry-title"
    >
      <div className={site.wrap}>
        <SectionHead content={t.expiry} id="expiry" />
        <div className={styles.expiryLayout}>
          <div className={styles.expiryDemo} data-reveal="">
            <span className={styles.sampleNote}>{t.demoLabel}</span>
            <Tabs
              id="expiry"
              labels={t.expiryTabs}
              active={tab}
              onChange={setTab}
              panelId="expiry-panel"
              className={styles.expiryTabs}
            />
            <TabPanel id="expiry-panel" tabsId="expiry" active={tab}>
              <div className={styles.expiryTotal}>
                <span>{t.qtyAtRisk}</span>
                <strong>{atRisk}</strong>
              </div>
              <div className={styles.expiryLines}>
                {batches.length ? (
                  batches.map((batch) => (
                    <div className={styles.expiryLine} key={batch.lot}>
                      <div>
                        <b>{batch.lot}</b>
                        <small>{batch.loc === 0 ? t.centreLocation : t.northLocation}</small>
                      </div>
                      <div className={styles.expiryBarTrack}>
                        <span
                          data-grow=""
                          style={{
                            width: `${Math.max(18, batch.qty * 2.4)}%`,
                            background: barColour(batch.days),
                          }}
                        ></span>
                      </div>
                      <div>
                        <b>
                          {batch.qty} {t.units}
                        </b>
                        <small>
                          {batch.days < 0 ? t.expiryTabs[0] : `${batch.days} ${t.expiryDays}`}
                        </small>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>{t.noBatches}</p>
                )}
              </div>
            </TabPanel>
          </div>
          <div className={styles.expiryActions}>
            <CheckList items={t.expiryActions} />
            <p className={`${site.small} ${site.muted} ${styles.expiryActionsSmall}`}>
              {t.expiryFoot}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
