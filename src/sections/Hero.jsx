import { useEffect, useRef, useState } from 'react'
import { StoreBadges } from '../components/StoreBadges.jsx'
import { Badge, ContactPill, PillButton } from '../components/ui.jsx'
import { useDialogs } from '../dialog-context.js'
import { useLanguage } from '../i18n.js'
import { cx } from '../lib/cx.js'
import { prefersReducedMotion } from '../lib/motion.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

// How long each message stays up; the progress bar animation times the rotation.
const HERO_INTERVAL = 6500

// Rotates the hero messages: the active slide's lines rise in while the previous slide's
// lines leave upwards. With reduced motion the first message shows at once and the
// messages only change from the dots.
function useHeroRotation(count) {
  const [{ active, leaving }, setSlides] = useState(() => ({
    active: prefersReducedMotion() ? 0 : -1,
    leaving: -1,
  }))

  // Start one frame after mount so the first message animates in.
  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      setSlides((current) => (current.active < 0 ? { active: 0, leaving: -1 } : current)),
    )
    return () => cancelAnimationFrame(frame)
  }, [])

  const show = (next) =>
    setSlides((current) =>
      next === current.active ? current : { active: next, leaving: current.active },
    )

  const slide = (index) =>
    cx(
      styles.heroSlide,
      active === index && styles.heroSlideActive,
      leaving === index && styles.heroSlideLeaving,
    )

  return { active, show, next: () => show((active + 1) % count), slide }
}

// Height of the active slide in a stack, so the stack is only as tall as the message on
// screen instead of the tallest one. The first measurement applies at once; later changes
// (a new message, a resize) animate through the CSS height transition.
function useActiveHeight(ref, index) {
  const [size, setSize] = useState({ height: undefined, animate: false })

  useEffect(() => {
    const slide = ref.current?.children[Math.max(index, 0)]
    if (!slide || !('ResizeObserver' in window)) return undefined
    const observer = new ResizeObserver(() =>
      setSize((current) => ({
        height: slide.offsetHeight,
        animate: current.height !== undefined,
      })),
    )
    observer.observe(slide)
    return () => observer.disconnect()
  }, [ref, index])

  return size
}

function SlideLines({ text }) {
  const lines = text.split('\n')
  // The space keeps the lines apart in the heading's accessible name; the spans are blocks.
  return lines.map((line, i) => (
    <span className={styles.heroLine} key={i}>
      {i > 0 && ' '}
      <span style={{ '--line': i }}>{i === lines.length - 1 ? <em>{line}</em> : line}</span>
    </span>
  ))
}

export function Hero() {
  const { t } = useLanguage()
  const { openVideo } = useDialogs()
  const slides = t.heroSlides
  const { active, show, next, slide } = useHeroRotation(slides.length)
  const [paused, setPaused] = useState(false)
  const titles = useRef(null)
  const copies = useRef(null)
  const titleSize = useActiveHeight(titles, active)
  const copySize = useActiveHeight(copies, active)

  // Pause while the pointer or keyboard focus is in the hero, so the copy can be read.
  const pause = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
    },
  }

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <img
        className={styles.heroPhoto}
        src="assets/pharmacy-hero.webp"
        width="1690"
        height="814"
        fetchPriority="high"
        alt={t.heroAlt}
      />
      <div className={styles.heroOverlay}></div>
      <div
        className={cx(site.wrap, styles.heroContent, paused && styles.heroPaused)}
        style={{ '--hero-interval': `${HERO_INTERVAL}ms` }}
        {...pause}
      >
        <Badge icon="leaf" className={styles.heroBadge} data-reveal={undefined} data-hero-item="">
          {t.eyebrow}
        </Badge>
        {/* Inactive titles are hidden from assistive tech, so the heading reads as the current message. */}
        <h1
          ref={titles}
          id="hero-title"
          className={cx(styles.heroTitles, titleSize.animate && styles.heroResizing)}
          style={{ height: titleSize.height }}
        >
          {slides.map(([title], i) => (
            <span key={i} className={slide(i)} aria-hidden={active !== i}>
              <SlideLines text={title} />
            </span>
          ))}
        </h1>
        <div
          ref={copies}
          className={cx(styles.heroCopies, copySize.animate && styles.heroResizing)}
          style={{ height: copySize.height }}
        >
          {slides.map(([, copy], i) => (
            <p
              key={i}
              className={cx(styles.heroCopy, styles.heroFade, slide(i))}
              aria-hidden={active !== i}
            >
              {copy}
            </p>
          ))}
        </div>
        <div className={styles.heroActions} data-hero-item="">
          <ContactPill icon="rocket">{t.getStarted}</ContactPill>
          <PillButton
            variant="outline"
            icon="play"
            aria-haspopup="dialog"
            onClick={(e) => openVideo(e.currentTarget)}
          >
            {t.learnMore}
          </PillButton>
        </div>
        <StoreBadges data-hero-item="" />
        <div className={styles.heroDots} role="group" aria-label={t.heroSlideNav} data-hero-item="">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={cx(styles.heroDot, active === i && styles.heroDotActive)}
              aria-label={`${t.heroSlideLabel} ${i + 1} / ${slides.length}`}
              aria-current={active === i ? 'true' : undefined}
              onClick={() => show(i)}
            >
              <span className={styles.heroDotTrack}>
                {active === i && !prefersReducedMotion() && (
                  <span className={styles.heroProgress} key={active} onAnimationEnd={next} />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
