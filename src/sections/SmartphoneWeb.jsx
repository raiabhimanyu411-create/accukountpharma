import { CheckList, Icon, SectionHead } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

function Phone({ t }) {
  return (
    <div className={styles.phoneDevice}>
      <div className={styles.phoneSpeaker}></div>
      <div className={styles.phoneTop}>
        ACCUKOUNT <span>PHARMA</span>
      </div>
      <h4>{t.phoneScreen}</h4>
      <div className={styles.phoneScan}>
        <Icon name="scan" />
        <span>
          <Icon name="box" />
        </span>
      </div>
      <div className={styles.phoneSuccess}>
        <Icon name="check" />
        {t.phoneScan}
      </div>
      <div className={styles.phoneValue}>
        <span>{t.quantity}</span>
        <b>24</b>
      </div>
      <div className={styles.phoneMeta}>
        <span>
          {t.batch}
          <b>LOT-A</b>
        </span>
        <span>
          {t.expiryLabel}
          <b>2027-01</b>
        </span>
      </div>
      <div className={styles.phoneSave}>{t.saveCount}</div>
    </div>
  )
}

function MiniDashboard({ t }) {
  const stats = [
    [t.verified, 128],
    [t.exceptions, 6],
    [t.locations, 3],
  ]

  return (
    <div className={styles.miniDashboard}>
      <div className={styles.miniNav}>
        <span className={styles.brandMini}>
          ACCU<span>KOUNT</span>
        </span>
        <b>PHARMA</b>
      </div>
      <div className={styles.miniTitle}>{t.webScreen}</div>
      <div className={styles.miniStats}>
        {stats.map(([label, value]) => (
          <div key={label}>
            <small>{label}</small>
            <strong data-count={value}>{value}</strong>
          </div>
        ))}
      </div>
      <div className={styles.miniChart}>
        {[42, 65, 52, 82, 71, 94].map((h) => (
          <i key={h} style={{ '--h': `${h}%` }}></i>
        ))}
      </div>
      <div className={styles.miniLines}>
        {[75, 90, 62].map((w) => (
          <span key={w} style={{ '--w': `${w}%` }} data-grow=""></span>
        ))}
      </div>
      <p>{t.example}</p>
    </div>
  )
}

export function SmartphoneWeb() {
  const { t } = useLanguage()

  return (
    <section
      className={`${styles.section} ${styles.pale}`}
      id="smartphone-web"
      aria-labelledby="smartphone-web-title"
    >
      <div className={site.wrap}>
        <SectionHead content={t.dual} id="smartphone-web" />
        <div className={styles.dualLayout}>
          <div className={styles.dualCopy}>
            <h3>
              <Icon name="phone" />
              {t.phoneTitle}
            </h3>
            <CheckList items={t.phoneList} />
            <h3>
              <Icon name="web" />
              {t.webTitle}
            </h3>
            <CheckList items={t.webList} />
          </div>
          <div className={styles.devicesStage} data-reveal="">
            <Phone t={t} />
            <MiniDashboard t={t} />
            <div className={styles.deviceSync}>
              <Icon name="link" /> {t.strip[0].replace('\n', ' ')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
