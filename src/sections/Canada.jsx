import { Icon, PillButton, SectionHead } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const FEATURE_ICONS = ['language', 'scan', 'shield', 'location', 'phone', 'link']

export function Canada() {
  const { t, lang, setLanguage } = useLanguage()

  return (
    <section
      className={`${styles.section} ${styles.canadaSection}`}
      id="canada"
      aria-labelledby="canada-title"
    >
      <div className={site.wrap}>
        <div className={styles.canadaLayout}>
          <div>
            <SectionHead content={t.canada} id="canada" />
            <div className={styles.canadaFeatures} data-stagger="" data-draw-icons="">
              {t.canadaFeatures.map((feature, i) => (
                <span key={i}>
                  <Icon name={FEATURE_ICONS[i]} />
                  {feature}
                </span>
              ))}
            </div>
            <PillButton
              variant="outline"
              className={styles.canadaPill}
              onClick={() => setLanguage(lang === 'en' ? 'fr' : 'en')}
            >
              {lang === 'en' ? t.switchFrench : t.switchEnglish}
            </PillButton>
          </div>
          <div className={styles.canadaVisual} data-clip="">
            <img
              src="assets/pharmacy-hero.webp"
              loading="lazy"
              width="1686"
              height="810"
              alt={t.canadaAlt}
            />
            <div className={styles.canadaSeal}>
              <Icon name="leaf" />
              <b>CANADA</b>
              <span>EN + FR</span>
            </div>
            <div className={styles.networkPoints}>
              {[0, 1, 2].map((i) => (
                <span key={i}>
                  <Icon name="location" />
                </span>
              ))}
              <div className={styles.networkPointLine}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
