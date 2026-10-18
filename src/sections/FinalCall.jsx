import { Badge, ContactPill, Icon, Lines } from '../components/ui.jsx'
import { CONTACT_EMAIL } from '../contact.js'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const PLAN_ICONS = ['target', 'database', 'shield', 'document']

// The closing call to action: the pitch and contact routes beside the plan agreed first.
export function FinalCall() {
  const { t } = useLanguage()
  const [badge, title, lead] = t.final

  return (
    <section
      className={`${styles.section} ${styles.navy} ${styles.finalSection}`}
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className={`${site.wrap} ${styles.finalLayout}`}>
        <div>
          <Badge>{badge}</Badge>
          <Lines id="contact-title" text={title} />
          <p className={styles.lead} data-reveal="">
            {lead}
          </p>
          <p className={styles.finalNext} data-reveal="">
            {t.finalNext}
          </p>
          <div className={styles.finalActions} data-reveal="">
            <ContactPill icon="rocket" className={styles.finalPrimary}>
              {t.cta}
            </ContactPill>
            <ContactPill variant="outline">{t.demoCta}</ContactPill>
          </div>
          <a className={styles.finalEmail} href={`mailto:${CONTACT_EMAIL}`} data-reveal="">
            <span>
              <Icon name="mail" />
            </span>
            <small>{t.preferEmail}</small>
            <strong>{CONTACT_EMAIL}</strong>
          </a>
        </div>
        <div className={styles.finalPlan} data-reveal="">
          <p>{t.planLabel}</p>
          <ol data-stagger="" data-draw-icons="">
            {t.planItems.map(([name, note], i) => (
              <li key={i}>
                <span className={styles.idRouteIcon}>
                  <Icon name={PLAN_ICONS[i]} />
                </span>
                <span>
                  <strong>{name}</strong>
                  {note}
                </span>
                <b>{`0${i + 1}`}</b>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
