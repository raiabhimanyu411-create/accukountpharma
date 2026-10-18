import { Badge, Icon, Lines } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const CARD_ICONS = ['boxShield', 'fastClock', 'barcodeClock', 'docCheck', 'network', 'docCheck']
const GROUP_ICONS = ['chart', 'clock', 'shield']

function BenefitCard({ icon, card: [title, ...points] }) {
  return (
    <li>
      <span className={styles.idRouteIcon}>
        <Icon name={icon} />
      </span>
      <div>
        <h3>{title}</h3>
        <ul>
          {points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </li>
  )
}

// Business value: six benefit cards either side of the dashboard photo, then the three
// groups they fall into.
export function Benefits() {
  const { t } = useLanguage()
  const [badge, title, lead] = t.benefits
  const cards = t.benefitCards

  return (
    <section
      className={`${styles.section} ${styles.benefitSection}`}
      id="benefits"
      aria-labelledby="benefits-title"
    >
      <div className={site.wrap}>
        <div className={styles.benefitHead}>
          <Badge>{badge}</Badge>
          <Lines id="benefits-title" className={styles.benefitTitle} text={title} />
          <span className={styles.dualRule} aria-hidden="true" />
          <p className={styles.lead} data-reveal="">
            {lead}
          </p>
        </div>

        <div className={styles.benefitStage}>
          <ul className={styles.benefitCards} data-stagger="" data-draw-icons="">
            {cards.slice(0, 3).map((card, i) => (
              <BenefitCard key={i} icon={CARD_ICONS[i]} card={card} />
            ))}
          </ul>
          <figure className={styles.benefitPhoto} data-reveal="">
            <img
              src="assets/benefits-dashboard.webp"
              width="530"
              height="525"
              loading="lazy"
              alt={t.benefitAlt}
            />
            <figcaption>{t.benefitNote}</figcaption>
          </figure>
          <ul className={styles.benefitCards} data-stagger="" data-draw-icons="">
            {cards.slice(3).map((card, i) => (
              <BenefitCard key={i} icon={CARD_ICONS[i + 3]} card={card} />
            ))}
          </ul>
        </div>

        <ul className={styles.benefitGroups} data-stagger="" data-draw-icons="">
          {t.benefitTitles.map((group, i) => (
            <li key={i}>
              <Icon name={GROUP_ICONS[i]} />
              {group}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
