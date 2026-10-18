import { Icon, Lines } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const POINT_ICONS = ['shelves', 'link', 'chart', 'document']

function TaskList({ icon, title, items }) {
  return (
    <div className={styles.dualGroup}>
      <h3>
        <Icon name={icon} />
        {title}
      </h3>
      <ul data-stagger="">
        {items.map((item, i) => (
          <li key={i}>
            <span className={styles.dualCheck}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5.5 12.5l4 4 9-9" />
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Smartphone execution + web control: the app on the phone, what each side does, the web
// dashboard on the laptop, and four outcomes underneath.
export function SmartphoneWeb() {
  const { t } = useLanguage()
  const [title, subtitle, lead] = t.dual

  return (
    <section
      className={`${styles.section} ${styles.dual}`}
      id="smartphone-web"
      aria-labelledby="smartphone-web-title"
    >
      <div className={site.wrap}>
        <div className={styles.dualHead}>
          <Lines id="smartphone-web-title" className={styles.dualTitle} text={title} />
          <span className={styles.dualRule} aria-hidden="true" />
          <p className={styles.dualSubtitle} data-reveal="">
            {subtitle}
          </p>
          <p className={styles.lead} data-reveal="">
            {lead}
          </p>
        </div>
        <div className={styles.dualStage}>
          <img
            className={styles.dualPhone}
            src="assets/app-phone.webp"
            width="250"
            height="500"
            loading="lazy"
            alt={t.phoneAlt}
            data-reveal=""
          />
          <div className={styles.dualLists}>
            <TaskList icon="phone" title={t.phoneTitle} items={t.phoneList} />
            <TaskList icon="web" title={t.webTitle} items={t.webList} />
          </div>
          <img
            className={styles.dualLaptop}
            src="assets/app-laptop.webp"
            width="770"
            height="502"
            loading="lazy"
            alt={t.laptopAlt}
            data-reveal=""
          />
        </div>
        <ul className={styles.dualPoints} data-stagger="" data-draw-icons="">
          {t.dualPoints.map(([name, note], i) => (
            <li key={i}>
              <span className={styles.dualPointIcon}>
                <Icon name={POINT_ICONS[i]} />
              </span>
              <span>
                <strong>{name}</strong>
                {note}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
