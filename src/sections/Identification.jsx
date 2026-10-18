import { useState } from 'react'
import { Icon, SectionHead, TabPanel, Tabs } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const BAR_WIDTHS = [1, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 1, 2, 3]

// A 12 × 12 decorative DataMatrix-like pattern with a solid finder edge.
const isInk = (i) =>
  i % 12 === 0 || i >= 132 || (i < 12 && i % 2 === 0) || (i * 17 + (i % 7)) % 5 < 2

function RouteSymbol({ route }) {
  if (route === 0)
    return (
      <div className={styles.barcodeArt}>
        {BAR_WIDTHS.map((w, i) => (
          <i key={i} style={{ width: `${w * 3}px` }}></i>
        ))}
      </div>
    )
  if (route === 1)
    return (
      <div className={styles.matrixArt}>
        {Array.from({ length: 144 }, (_, i) => (
          <i key={i} className={isInk(i) ? styles.ink : undefined}></i>
        ))}
      </div>
    )
  return (
    <div className={styles.dinArt}>
      <small>DIN</small>
      <b>00000000</b>
      <span>OCR</span>
    </div>
  )
}

export function Identification() {
  const { t } = useLanguage()
  const [route, setRoute] = useState(0)
  const details = t.routes[route]

  return (
    <section
      className={`${styles.section} ${site.wrap}`}
      id="identification"
      aria-labelledby="identification-title"
    >
      <SectionHead content={t.identify} id="identification" />
      <Tabs
        data-reveal=""
        id="route"
        labels={t.routeLabels}
        active={route}
        onChange={setRoute}
        panelId="route-panel"
      />
      <TabPanel
        data-reveal=""
        id="route-panel"
        className={styles.routePanel}
        tabsId="route"
        active={route}
      >
        <div className={styles.routeArt}>
          <div className={styles.scanCorners}>
            <RouteSymbol route={route} />
          </div>
          <small>{t.demoLabel}</small>
        </div>
        <div className={styles.routeExplain}>
          <h3>{details.title}</h3>
          <p>{details.copy}</p>
          <div className={styles.dataFields}>
            {details.fields.map((field, i) => (
              <span key={i}>
                <Icon name="check" />
                {field}
              </span>
            ))}
          </div>
          <p className={`${site.small} ${site.muted} ${styles.routeExplainSmall}`}>
            {details.note}
          </p>
        </div>
      </TabPanel>
      <div className={styles.normalization} data-reveal="">
        <span>UPC / GS1 DataMatrix / DIN</span>
        <Icon name="arrow" />
        <strong>{t.oneRecord}</strong>
        <small>{t.dpd}</small>
      </div>
    </section>
  )
}
