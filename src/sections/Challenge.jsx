import { CheckList, Icon, SectionHead } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

export function Challenge() {
  const { t } = useLanguage()

  return (
    <section
      className={`${styles.section} ${site.wrap}`}
      id="challenge"
      aria-labelledby="challenge-title"
    >
      <SectionHead content={t.challenge} id="challenge" />
      <div className={styles.challengeLayout}>
        <div className={styles.realityVisual} data-reveal="">
          <div className={styles.realitySystem}>
            <Icon name="web" />
            <small>{t.system}</small>
            <strong data-count="24">24</strong>
            <span>{t.available}</span>
            <div className={styles.systemLines}>
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>
          <div className={styles.realityGap}>≠</div>
          <div className={styles.realityShelf}>
            <Icon name="box" />
            <small>{t.shelf}</small>
            <div className={styles.shelfSpace}>
              <span>0</span>
            </div>
            <span className={styles.emptyLabel}>{t.empty}</span>
          </div>
          <p className={styles.sampleNote}>{t.example}</p>
        </div>
        <div>
          <CheckList items={t.challengeIssues} className={styles.issueList} />
        </div>
      </div>
      <div className={styles.impactBand} data-reveal="" data-draw-icons="">
        <Icon name="users" />
        <strong>{t.impact}</strong>
      </div>
    </section>
  )
}
