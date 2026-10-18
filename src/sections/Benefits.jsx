import { CheckList, Icon, SectionHead } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const BENEFIT_ICONS = ['chart', 'clock', 'shield']

export function Benefits() {
  const { t } = useLanguage()

  return (
    <section
      className={`${styles.section} ${site.wrap}`}
      id="benefits"
      aria-labelledby="benefits-title"
    >
      <SectionHead content={t.benefits} id="benefits" />
      <div className={styles.benefitsGrid} data-stagger="" data-draw-icons="">
        {t.benefitTitles.map((title, i) => (
          <article key={i}>
            <span className={styles.benefitNumber}>{`0${i + 1}`}</span>
            <Icon name={BENEFIT_ICONS[i]} />
            <h3>{title}</h3>
            <CheckList items={t.benefitLists[i]} />
          </article>
        ))}
      </div>
    </section>
  )
}
