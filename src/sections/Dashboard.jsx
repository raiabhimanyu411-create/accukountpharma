import { useState } from 'react'
import { Icon, SectionHead, TabPanel, Tabs } from '../components/ui.jsx'
import { dashboardRecords } from '../data/samples.js'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const MEASURE_ICONS = ['box', 'check', 'document', 'transfer', 'chart', 'clock', 'scan', 'shield']

export function Dashboard() {
  const { t } = useLanguage()
  const [tab, setTab] = useState(0)
  const [place, setPlace] = useState('all')
  const [search, setSearch] = useState('')
  const query = search.toLowerCase()
  const rows = dashboardRecords.filter(
    (row) =>
      row.type === tab &&
      (place === 'all' || row.loc === place) &&
      `${t.productSample} ${row.p} ${row.lot}`.toLowerCase().includes(query),
  )
  const placeName = (loc) => (loc === 'central' ? t.centreLocation : t.northLocation)

  return (
    <section
      className={`${styles.section} ${styles.pale}`}
      id="dashboard"
      aria-labelledby="dashboard-title"
    >
      <div className={site.wrap}>
        <SectionHead content={t.dashboard} id="dashboard" center />
        <div className={styles.dashboardDemo} id="dashboard-demo" data-reveal="">
          <div className={styles.dashboardHeader}>
            <span className={styles.brandMini}>
              ACCU<span>KOUNT</span> <em>PHARMA</em>
            </span>
            <span className={styles.sampleNote}>{t.example}</span>
          </div>
          <div className={styles.dashboardFilters}>
            <label htmlFor="location-filter">
              <Icon name="location" />
              <span className={site.srOnly}>{t.locationFilter}</span>
              <select id="location-filter" value={place} onChange={(e) => setPlace(e.target.value)}>
                <option value="all">{t.allLocations}</option>
                <option value="central">{t.centreLocation}</option>
                <option value="north">{t.northLocation}</option>
              </select>
            </label>
            <label htmlFor="dashboard-search">
              <span className={site.srOnly}>{t.search}</span>
              <input
                id="dashboard-search"
                type="search"
                placeholder={t.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
          <Tabs
            id="dash"
            labels={t.dashTabs}
            active={tab}
            onChange={setTab}
            panelId="dashboard-table"
            className={styles.dashTabs}
          />
          <TabPanel id="dashboard-table" className={styles.tableScroll} tabsId="dash" active={tab}>
            <table>
              <caption className={site.srOnly}>
                {t.dashTabs[tab]} · {t.example}
              </caption>
              <thead>
                <tr>
                  {t.dashColumns.map((column, i) => (
                    <th key={i} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length ? (
                  rows.map((row) => (
                    <tr key={row.lot}>
                      <td>
                        <b>{`${t.productSample} ${row.p}`}</b>
                        <small>{row.lot}</small>
                      </td>
                      <td>{placeName(row.loc)}</td>
                      <td>{row.sys}</td>
                      <td>
                        <b>{row.qty}</b>
                      </td>
                      <td>
                        <span className={styles.tableStatus}>{t.dashStatuses[row.type]}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>{t.noResults}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <p className={styles.resultCount} role="status">
              {rows.length} {t.matches}
            </p>
          </TabPanel>
        </div>
        <p className={`${site.small} ${site.muted} ${styles.dashboardDemoSmall}`}>{t.dashNote}</p>
        <div className={styles.dashboardMeasures} data-stagger="" data-draw-icons="">
          {t.dashMeasures.map((measure, i) => (
            <span key={i}>
              <Icon name={MEASURE_ICONS[i]} />
              {measure}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
