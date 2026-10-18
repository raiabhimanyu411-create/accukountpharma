import { useLanguage } from '../i18n.js'
import { Icon } from './ui.jsx'
import styles from '../pages/Gallery.module.css'
import site from '../styles/Site.module.css'

const VISUAL_NAMES = [
  'navigation',
  'hero',
  'challenge',
  'inventory-drift',
  'verification-layer',
  'smartphone-web',
  'identification',
  'counting',
  'workflows',
  'expiry',
  'integrations',
  'dashboard',
  'benefits',
  'canadian-pharmacies',
  'pilot',
  'call-to-action',
]

function visualTitles(t) {
  return [
    t.navigationVisual,
    t.hero.join(' '),
    ...[
      t.challenge,
      t.drift,
      t.layer,
      t.dual,
      t.identify,
      t.count,
      t.workflows,
      t.expiry,
      t.integrations,
      t.dashboard,
      t.benefits,
      t.canada,
      t.pilot,
      t.final,
    ].map((section) => section[1]),
  ].map((title) => title.replace(/\n/g, ' '))
}

export function Gallery() {
  const { t, lang } = useLanguage()

  return (
    <main id="main" className={styles.galleryMain}>
      <section className={`${styles.section} ${site.wrap}`}>
        <p className={styles.eyebrow}>{`ACCUKOUNT PHARMA / ${t.gallery}`}</p>
        <h1>{t.galleryTitle}</h1>
        <p className={styles.lead}>{t.galleryCopy}</p>
        <a
          className={site.button}
          href={`ACCUKOUNT_Pharma_16_Section_Visuals_${lang.toUpperCase()}.zip`}
          download
        >
          {t.visualPack}
          <Icon name="download" />
        </a>
        <div className={styles.galleryList}>
          {visualTitles(t).map((title, i) => {
            const number = String(i + 1).padStart(2, '0')
            const base = `visuals/${number}-${VISUAL_NAMES[i]}-${lang}`
            return (
              <article key={i}>
                <div className={styles.galleryLabel}>
                  <span>{number}</span>
                  <h2>{title}</h2>
                </div>
                <a href={`${base}.png`} target="_blank" rel="noopener">
                  <img src={`${base}.png`} loading="lazy" width="2400" height="1350" alt={title} />
                </a>
                <div className={styles.galleryDownloads}>
                  <a href={`${base}.svg`} download>
                    <Icon name="download" />
                    {t.downloadSvg}
                  </a>
                  <a href={`${base}.png`} download>
                    <Icon name="download" />
                    {t.downloadPng}
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
