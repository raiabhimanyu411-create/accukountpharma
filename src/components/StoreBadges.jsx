import { useLanguage } from '../i18n.js'
import styles from '../pages/Home.module.css'

// Store listing addresses; each badge stays inert until its address is set.
const GOOGLE_PLAY_URL = ''
const APP_STORE_URL = ''

function GooglePlayLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285f4" d="M3.5 1.8 13.3 12 3.5 22.2Z" />
      <path fill="#34a853" d="M3.5 1.8 16.6 8.9 13.3 12Z" />
      <path fill="#ea4335" d="M3.5 22.2 13.3 12 16.6 15.1Z" />
      <path fill="#fbbc04" d="M16.6 8.9 20.5 12 16.6 15.1 13.3 12Z" />
    </svg>
  )
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
      />
    </svg>
  )
}

function StoreBadge({ url, logo, label: [small, name] }) {
  return (
    <a
      className={styles.storeBadge}
      href={url || '#'}
      target={url ? '_blank' : undefined}
      rel={url ? 'noopener' : undefined}
      onClick={(event) => {
        if (!url) event.preventDefault()
      }}
    >
      {logo}
      <span>
        <small>{small}</small>
        <b>{name}</b>
      </span>
    </a>
  )
}

export function StoreBadges(props) {
  const { t } = useLanguage()
  return (
    <div className={styles.storeBadges} role="group" aria-label={t.appStores} {...props}>
      <StoreBadge url={GOOGLE_PLAY_URL} logo={<GooglePlayLogo />} label={t.googlePlay} />
      <StoreBadge url={APP_STORE_URL} logo={<AppleLogo />} label={t.appStore} />
    </div>
  )
}
