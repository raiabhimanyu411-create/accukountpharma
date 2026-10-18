import { Badge, ContactPill, Lines } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

export function FinalCall() {
  const { t } = useLanguage()

  return (
    <section
      className={`${styles.section} ${styles.navy} ${styles.finalSection}`}
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className={site.wrap}>
        <Badge>{t.final[0]}</Badge>
        <Lines id="contact-title" text={t.final[1]} />
        <p className={styles.lead} data-reveal="">
          {t.final[2]}
        </p>
        <div className={styles.finalActions} data-reveal="">
          <ContactPill icon="rocket">{t.cta}</ContactPill>
          <ContactPill variant="outline">{t.demoCta}</ContactPill>
        </div>
      </div>
    </section>
  )
}
