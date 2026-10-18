import { ContactPill, Icon, SectionHead } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const SCORECARD_ICONS = ['clock', 'document', 'alert', 'box', 'chart', 'users']

export function Pilot() {
  const { t } = useLanguage()

  return (
    <section className={`${styles.section} ${site.wrap}`} id="pilot" aria-labelledby="pilot-title">
      <SectionHead content={t.pilot} id="pilot" />
      <span className={styles.duration}>{t.duration}</span>
      <div className={styles.pilotRoadmap} data-stagger="">
        {t.pilotSteps.map(([week, title, copy], i) => (
          <article key={i}>
            <span className={styles.pilotStep}>{i + 1}</span>
            <small>{week}</small>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
      <div className={styles.pilotScorecard}>
        <h3>{t.scoreTitle}</h3>
        <div data-stagger="" data-draw-icons="">
          {t.scorecards.map((item, i) => (
            <span key={i}>
              <Icon name={SCORECARD_ICONS[i]} />
              {item}
            </span>
          ))}
        </div>
      </div>
      <p className={`${site.small} ${site.muted}`}>{t.pilotNote}</p>
      <div className={styles.pilotClose} data-reveal="">
        <ContactPill icon="rocket">{t.cta}</ContactPill>
        <ContactPill variant="outline" interest="all">
          {t.demoCta}
        </ContactPill>
      </div>
      <div className={styles.faqBlock} data-reveal="">
        <h3>{t.faqTitle}</h3>
        <div>
          {t.faq.map(([question, answer], i) => (
            <details key={i}>
              <summary>
                {question}
                <span>+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
