import { useState } from 'react'
import { Badge, Icon, Lines, PillButton, TabPanel, Tabs } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const TAB_ICONS = ['scan', 'box', 'calendar']
const PHOTOS = ['workflow-stock', 'workflow-tote', 'workflow-expiry']
const POINT_ICONS = [
  ['calendar', 'phone', 'search', 'document'],
  ['document', 'truck', 'phone', 'web'],
  ['clipboard', 'pill', 'box', 'return', 'bin'],
]

// Three connected workflows in one section: the tabs swap the copy, photo and outcome row.
export function Workflows() {
  const { t } = useLanguage()
  const [workflow, setWorkflow] = useState(0)
  const [badge, title, subtitle] = t.workflows
  const details = t.workflowDetails[workflow]

  return (
    <section
      className={`${styles.section} ${styles.workflowSection}`}
      id="workflows"
      aria-labelledby="workflows-title"
    >
      <div className={site.wrap}>
        <Badge>{badge}</Badge>
        <Lines id="workflows-title" className={styles.workflowTitle} text={title} />
        <span className={styles.dualRule} aria-hidden="true" />
        <p className={styles.workflowSubtitle} data-reveal="">
          {subtitle}
        </p>

        <Tabs
          data-reveal=""
          id="workflow"
          labels={t.workflowLabels}
          active={workflow}
          onChange={setWorkflow}
          panelId="workflow-panel"
          className={styles.workflowTabs}
          renderTab={(label, i) => (
            <>
              <Icon name={TAB_ICONS[i]} />
              {label}
            </>
          )}
        />
        <TabPanel data-reveal="" id="workflow-panel" tabsId="workflow" active={workflow}>
          {/* The key restarts the fade when the tab changes. */}
          <div key={workflow} className={styles.workflowBody}>
            <div className={styles.workflowText}>
              <p className={styles.workflowEyebrow}>
                {`0${workflow + 1} / ${t.workflowLabels[workflow]}`}
              </p>
              <h3>
                {details.title.split('\n').map((line, i) => (
                  <span key={i}>
                    {i > 0 && ' '}
                    {line}
                  </span>
                ))}
              </h3>
              <p>{details.copy}</p>
              <ul>
                {details.list.map((item, i) => (
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
              <PillButton variant="outline" href="#pilot">
                {t.cta}
              </PillButton>
            </div>
            <figure className={styles.workflowPhoto}>
              <img
                src={`assets/${PHOTOS[workflow]}.webp`}
                width="880"
                height="409"
                alt={details.alt}
              />
              <figcaption>{t.workflowNote}</figcaption>
            </figure>
            <ul
              className={`${styles.dualPoints} ${styles.workflowPoints}`}
              style={{ '--points': details.points.length }}
            >
              {details.points.map(([name, note], i) => (
                <li key={i}>
                  <span className={styles.dualPointIcon}>
                    <Icon name={POINT_ICONS[workflow][i]} />
                  </span>
                  <span>
                    <strong>{name}</strong>
                    {note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </TabPanel>
      </div>
    </section>
  )
}
