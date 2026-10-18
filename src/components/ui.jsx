import { useRef } from 'react'
import { useDialogs } from '../dialog-context.js'
import { icons } from './icons.jsx'
import { cx } from '../lib/cx.js'
import site from '../styles/Site.module.css'
import styles from '../pages/Home.module.css'

export function Icon({ name, className }) {
  return (
    <svg className={cx(site.icon, className)} viewBox="0 0 24 24" aria-hidden="true">
      {icons[name] || icons.check}
    </svg>
  )
}

export function ArrowButton({ children, className, type = 'button', ...props }) {
  return (
    <button type={type} className={cx(site.button, className)} {...props}>
      {children}
      <Icon name="arrow" />
    </button>
  )
}

export function ContactButton({ children, className, interest }) {
  const { openContact } = useDialogs()
  return (
    <ArrowButton className={className} onClick={(e) => openContact(e.currentTarget, interest)}>
      {children}
    </ArrowButton>
  )
}

// Filled icons for the pill buttons, shared so every call to action looks the same.
const PILL_ICONS = {
  rocket:
    'M12.6 3.4c2.6-1.5 5.6-1.9 7.6-1.6.3 2-.1 5-1.6 7.6-1 1.8-2.6 3.4-4.4 4.6l-.4 3.7a1 1 0 0 1-.5.8l-3 1.8a.6.6 0 0 1-.9-.6l.5-3.2-2.5-2.5-3.2.5a.6.6 0 0 1-.6-.9l1.8-3a1 1 0 0 1 .8-.5l3.7-.4c1.2-1.8 2.8-3.4 4.7-4.3Zm2.9 3.1a2 2 0 1 0 0 2.9 2 2 0 0 0 0-2.9ZM5.3 16.1c.7-.7 1.9-.7 2.6 0s.7 1.9 0 2.6c-.9.9-3.6 1.5-3.6 1.5s.5-2.7 1-4.1Z',
  play: 'M7 4.5v15l12-7.5-12-7.5Z',
  arrow: 'M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3 1.4-1.4Z',
}
const BOLT = 'M13.5 2 4 13.5h6.5L9.5 22 20 9.5h-6.5L13.5 2Z'

function PillIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={PILL_ICONS[name]} />
    </svg>
  )
}

// Rounded call to action: rocket / play icons lead the label, the arrow follows it.
export function PillButton({
  variant = 'primary',
  icon = 'arrow',
  href,
  className,
  children,
  ...props
}) {
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      className={cx(variant === 'primary' ? styles.pillPrimary : styles.pillOutline, className)}
      href={href}
      type={href ? undefined : 'button'}
      {...props}
    >
      {icon !== 'arrow' && <PillIcon name={icon} />}
      {children}
      {icon === 'arrow' && <PillIcon name="arrow" />}
    </Tag>
  )
}

export function ContactPill({ interest, ...props }) {
  const { openContact } = useDialogs()
  return <PillButton onClick={(e) => openContact(e.currentTarget, interest)} {...props} />
}

// Section label: a rounded badge with a bolt icon, as on the ASSETKOUNT site.
export function Badge({ children, icon, className, ...props }) {
  return (
    <p className={cx(styles.sectionBadge, className)} data-reveal="" {...props}>
      {icon ? (
        <Icon name={icon} />
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={BOLT} />
        </svg>
      )}
      {children}
    </p>
  )
}

// Heading whose lines rise from a mask as they scroll into view. text uses "\n" between
// lines; with more than one line the last is emphasised.
export function Lines({
  as: Tag = 'h2',
  text,
  lines = text.split('\n'),
  emphasise = lines.length > 1,
  ...props
}) {
  return (
    <Tag data-lines="" {...props}>
      {lines.map((line, i) => (
        <span className={styles.line} data-line="" key={i}>
          <span>{emphasise && i === lines.length - 1 ? <em>{line}</em> : line}</span>
        </span>
      ))}
    </Tag>
  )
}

export function CheckList({ items, className = styles.checklist }) {
  return (
    <ul className={className} data-stagger="">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

// content is [badge, title, lead]; the heading gets the id `${id}-title`.
export function SectionHead({ content: [badge, title, lead], id, center = false }) {
  return (
    <div className={cx(styles.sectionHead, center && styles.center)}>
      <div>
        <Badge>{badge}</Badge>
        <Lines id={`${id}-title`} text={title} />
      </div>
      <p className={styles.lead} data-reveal="">
        {lead}
      </p>
    </div>
  )
}

const KEY_STEPS = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

// Accessible tab list with roving tabindex and arrow / Home / End navigation.
export function Tabs({
  id,
  labels,
  active,
  onChange,
  panelId,
  className = styles.tabs,
  label = labels.join(' / '),
  renderTab = (text) => text,
  ref,
  ...props
}) {
  const buttons = useRef([])

  function handleKeyDown(event, index) {
    const last = labels.length - 1
    let next
    if (event.key in KEY_STEPS)
      next = (index + KEY_STEPS[event.key] + labels.length) % labels.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else return
    event.preventDefault()
    onChange(next)
    buttons.current[next].focus()
  }

  return (
    <div ref={ref} className={className} role="tablist" aria-label={label} {...props}>
      {labels.map((text, i) => (
        <button
          key={i}
          ref={(el) => {
            buttons.current[i] = el
          }}
          id={`${id}-${i}`}
          type="button"
          role="tab"
          aria-selected={i === active}
          tabIndex={i === active ? 0 : -1}
          aria-controls={panelId}
          onClick={() => onChange(i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        >
          {renderTab(text, i)}
        </button>
      ))}
    </div>
  )
}

export function TabPanel({ id, tabsId, active, className, children, ref, ...props }) {
  return (
    <div
      ref={ref}
      id={id}
      className={className}
      role="tabpanel"
      aria-labelledby={`${tabsId}-${active}`}
      {...props}
    >
      {children}
    </div>
  )
}
