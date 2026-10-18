import { Badge, Icon, Lines, PillButton } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const STEP_ICONS = ['box', 'alert', 'chart']
const CARD_ICONS = ['clock', 'document']

// The pharmacy photo fills the right side and fades into white behind the copy. The first
// three issues run as numbered, connected steps; the last two sit in cards below.
export function Challenge() {
  const { t } = useLanguage()
  const [badge, title, lead] = t.challenge
  const steps = t.challengeIssues.slice(0, 3)
  const cards = t.challengeIssues.slice(3)

  return (
    <section
      className={`${styles.section} ${styles.challenge}`}
      id="challenge"
      aria-labelledby="challenge-title"
    >
      <img
        className={styles.challengeBg}
        src="assets/inventory-disconnect.jpg"
        width="537"
        height="545"
        loading="lazy"
        alt={t.challengeAlt}
      />
      <div className={site.wrap}>
        <div className={styles.challengeCopy}>
          <Badge>{badge}</Badge>
          <Lines id="challenge-title" text={title} />
          <p className={styles.lead} data-reveal="">
            {lead}
          </p>
          <ol className={styles.issueSteps} data-stagger="" data-draw-icons="">
            {steps.map(([name, note], i) => (
              <li key={i}>
                <span className={styles.issueStepIcon}>
                  <Icon name={STEP_ICONS[i]} />
                </span>
                <span className={styles.issueStepNumber}>{String(i + 1).padStart(2, '0')}</span>
                <h3>{name}</h3>
                <p>{note}</p>
              </li>
            ))}
          </ol>
          <ul className={styles.issueCards} data-stagger="" data-draw-icons="">
            {cards.map(([name, note], i) => (
              <li key={i}>
                <span className={styles.issueCardIcon}>
                  <Icon name={CARD_ICONS[i]} />
                </span>
                <span>
                  <strong>{name}</strong>
                  <small>{note}</small>
                </span>
              </li>
            ))}
          </ul>
          <div data-reveal="">
            <PillButton variant="outline" href="#platform">
              {t.challengeCta}
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  )
}
