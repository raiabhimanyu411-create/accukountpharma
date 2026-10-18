import { Icon, SectionHead } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const SYSTEM_ICONS = ['document', 'web', 'box', 'chart', 'shield']

export function Integrations() {
  const { t } = useLanguage()

  return (
    <section
      className={`${styles.section} ${site.wrap}`}
      id="integrations"
      aria-labelledby="integrations-title"
    >
      <SectionHead content={t.integrations} id="integrations" />
      <div className={styles.integrationLayout}>
        <div className={styles.integrationSystems} data-stagger="" data-draw-icons="">
          {t.integrationLabels.map((label, i) => (
            <div key={i}>
              <Icon name={SYSTEM_ICONS[i]} />
              <span>{label}</span>
              <Icon name="link" />
            </div>
          ))}
        </div>
        <div className={styles.integrationTarget} data-reveal="">
          <span>{t.inbound}</span>
          <div className={styles.integrationArrow}>↓</div>
          <img
            src="assets/accukount-pharma-logo.webp"
            loading="lazy"
            width="502"
            height="200"
            alt="ACCUKOUNT Pharma"
          />
          <div className={styles.integrationArrow}>↓</div>
          <strong>{t.outbound}</strong>
        </div>
      </div>
      <p className={styles.integrationNote} data-reveal="">
        <Icon name="link" />
        {t.integrationNote}
      </p>
    </section>
  )
}
