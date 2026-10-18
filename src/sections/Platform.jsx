import { Icon, SectionHead } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const SYSTEM_ICONS = ['document', 'web', 'box', 'chart']

export function Platform() {
  const { t } = useLanguage()

  return (
    <section
      className={`${styles.section} ${site.wrap}`}
      id="platform"
      aria-labelledby="platform-title"
    >
      <SectionHead content={t.layer} id="platform" center />
      <div className={styles.layerMap}>
        <div className={styles.sourceSystems} data-stagger="" data-draw-icons="">
          {t.systems.map((system, i) => (
            <span key={i}>
              <Icon name={SYSTEM_ICONS[i]} />
              {system}
            </span>
          ))}
        </div>
        <p className={styles.mapFlow}>
          {t.dataIn}
          <span>↓</span>
        </p>
        <div className={styles.layerCore} data-reveal="" data-draw-icons="">
          <div className={styles.coreLabel}>
            ACCUKOUNT <span>PHARMA</span>
          </div>
          <div className={styles.layerHalves}>
            <div>
              <Icon name="phone" />
              <strong>{t.verify}</strong>
              <small>{t.evidence}</small>
            </div>
            <div>
              <Icon name="web" />
              <strong>{t.control}</strong>
              <small>{t.resultsOut}</small>
            </div>
          </div>
        </div>
        <div className={styles.mapApproval} data-reveal="">
          <Icon name="shield" />
          <span>{t.resultsOut}</span>
        </div>
      </div>
      <p className={`${site.small} ${site.muted} ${styles.center}`}>{t.integrationSmall}</p>
    </section>
  )
}
