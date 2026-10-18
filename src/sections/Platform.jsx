import { Badge, Icon, Lines, PillButton } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const SYSTEM_ICONS = ['document', 'web', 'box', 'chart']

// The verification layer: the pharmacy's systems feed ACCUKOUNT, which verifies on the
// smartphone and reconciles on the web. The pharmacist photo fills the right side.
export function Platform() {
  const { t } = useLanguage()
  const [badge, title, lead] = t.layer

  return (
    <section
      className={`${styles.section} ${styles.photoSection} ${styles.platform}`}
      id="platform"
      aria-labelledby="platform-title"
    >
      <img
        className={styles.photoBg}
        src="assets/verification-layer.jpg"
        width="724"
        height="811"
        loading="lazy"
        alt={t.layerAlt}
      />
      <div className={site.wrap}>
        <div className={styles.platformCopy}>
          <Badge>{badge}</Badge>
          <Lines id="platform-title" text={title} />
          <p className={styles.lead} data-reveal="">
            {lead}
          </p>
          <ul className={styles.platformSystems} data-stagger="" data-draw-icons="">
            {t.systems.map((system, i) => (
              <li key={i}>
                <span className={styles.platformIcon}>
                  <Icon name={SYSTEM_ICONS[i]} />
                </span>
                {system}
              </li>
            ))}
          </ul>
          {/* A bracket gathers the four systems into one feed down to ACCUKOUNT. */}
          <div className={styles.platformFeed} data-reveal="">
            <span className={styles.platformBracket} aria-hidden="true" />
            <p>{t.dataIn}</p>
            <span className={styles.platformArrow} aria-hidden="true" />
          </div>
          <div className={styles.platformCore} data-reveal="" data-draw-icons="">
            <p className={styles.platformCoreLabel}>
              ACCUKOUNT <span>PHARMA</span>
            </p>
            <div className={styles.platformHalves}>
              <div>
                <span className={styles.platformHalfIcon}>
                  <Icon name="phone" />
                </span>
                <span>
                  <strong>{t.verify}</strong>
                  <small>{t.evidence}</small>
                </span>
              </div>
              <div>
                <span className={styles.platformHalfIcon}>
                  <Icon name="web" />
                </span>
                <span>
                  <strong>{t.control}</strong>
                  <small>{t.resultsOut}</small>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.platformFoot} data-reveal="">
            <PillButton variant="outline" href="#workflows">
              {t.layerCta}
            </PillButton>
            <p>{t.integrationSmall}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
