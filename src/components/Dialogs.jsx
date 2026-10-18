import { useImperativeHandle, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { DialogContext } from '../dialog-context.js'
import { useLanguage } from '../i18n.js'
import { ArrowButton, Icon } from './ui.jsx'
import shell from '../styles/Shared.module.css'
import site from '../styles/Site.module.css'

const RECIPIENT = 'amberchandra@acrebis.com'

// Closes a modal dialog when the click lands on its backdrop.
function closeOnBackdrop(event) {
  const dialog = event.currentTarget
  if (event.target !== dialog) return
  const r = dialog.getBoundingClientRect()
  if (
    event.clientX < r.left ||
    event.clientX > r.right ||
    event.clientY < r.top ||
    event.clientY > r.bottom
  )
    dialog.close()
}

function buildDraft(t, data) {
  const interest =
    data.get('interest') === 'all' ? t.allWorkflows : t.workflowLabels[Number(data.get('interest'))]
  const message = String(data.get('message')).trim()
  return [
    t.greeting,
    '',
    t.intro,
    '',
    `${t.name}: ${data.get('name')}`,
    `${t.organisation}: ${data.get('organisation')}`,
    `${t.email}: ${data.get('email')}`,
    `${t.interest}: ${interest}`,
    t.preferred,
    ...(message ? ['', `${t.message}:`, message] : []),
    '',
    t.closing,
  ].join('\n')
}

function EnquiryDialog({ ref, onClose }) {
  const { t, lang } = useLanguage()
  const [showResult, setShowResult] = useState(false)
  const [draft, setDraft] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const dialogRef = useRef(null)
  const nameRef = useRef(null)
  const interestRef = useRef(null)
  const draftRef = useRef(null)
  const resultTitleRef = useRef(null)

  useImperativeHandle(ref, () => ({
    open(interest) {
      setShowResult(false)
      if (interest) interestRef.current.value = interest
      dialogRef.current.showModal()
      requestAnimationFrame(() => nameRef.current.focus())
    },
  }))

  function handleSubmit(event) {
    event.preventDefault()
    setDraft(buildDraft(t, new FormData(event.currentTarget)))
    setCopyStatus('')
    flushSync(() => setShowResult(true))
    resultTitleRef.current.focus()
  }

  function edit() {
    flushSync(() => setShowResult(false))
    nameRef.current.focus()
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft)
      setCopyStatus('copied')
    } catch {
      draftRef.current.select()
      setCopyStatus('copyFallback')
    }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([draft], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `ACCUKOUNT-Pharma-Enquiry-${lang}.txt`
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const mailto = `mailto:${RECIPIENT}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(draft)}`

  return (
    <dialog
      ref={dialogRef}
      id="enquiry"
      aria-labelledby="enquiry-title"
      onClose={onClose}
      onClick={closeOnBackdrop}
    >
      <button
        type="button"
        className={shell.dialogClose}
        aria-label={t.close}
        onClick={() => dialogRef.current.close()}
      >
        ×
      </button>
      <div id="form-intro" hidden={showResult}>
        <p className={shell.eyebrow}>ACCUKOUNT PHARMA</p>
        <h2 id="enquiry-title">{t.contactTitle}</h2>
        <p>{t.contactCopy}</p>
      </div>
      <form id="enquiry-form" hidden={showResult} onSubmit={handleSubmit}>
        <div className={shell.formGrid}>
          <label htmlFor="name">
            {t.name}
            <input
              ref={nameRef}
              id="name"
              name="name"
              autoComplete="name"
              required
              maxLength={120}
            />
          </label>
          <label htmlFor="organisation">
            {t.organisation}
            <input
              id="organisation"
              name="organisation"
              autoComplete="organization"
              required
              maxLength={160}
            />
          </label>
        </div>
        <label htmlFor="email">
          {t.email}
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
        <label htmlFor="interest">
          {t.interest}
          <select ref={interestRef} id="interest" name="interest">
            {t.workflowLabels.map((label, i) => (
              <option key={i} value={i}>
                {label}
              </option>
            ))}
            <option value="all">{t.allWorkflows}</option>
          </select>
        </label>
        <label htmlFor="message">
          {t.message} <small>({t.optional})</small>
          <textarea id="message" name="message" rows={3} maxLength={2000} />
        </label>
        <ArrowButton type="submit">{t.prepare}</ArrowButton>
        <p className={`${site.small} ${site.muted}`}>{t.formNote}</p>
      </form>
      <div id="enquiry-result" hidden={!showResult}>
        <h3 ref={resultTitleRef} tabIndex={-1} id="enquiry-result-title">
          {t.emailReady}
        </h3>
        <label className={site.srOnly} htmlFor="email-draft">
          {t.emailReady}
        </label>
        <textarea ref={draftRef} id="email-draft" readOnly rows={12} value={draft} />
        <div className={shell.draftActions}>
          <a
            className={`${site.button} ${shell.draftActionsButton}`}
            id="email-link"
            href={draft ? mailto : undefined}
          >
            {t.openEmail}
            <Icon name="arrow" />
          </a>
          <button
            type="button"
            className={`${site.button} ${site.outline} ${shell.draftActionsButton}`}
            onClick={copy}
          >
            {t.copy}
          </button>
          <button
            type="button"
            className={`${site.textLink} ${shell.draftActionsTextLink}`}
            onClick={download}
          >
            {t.download}
          </button>
          <button
            type="button"
            className={`${site.textLink} ${shell.draftActionsTextLink}`}
            onClick={edit}
          >
            {t.edit}
          </button>
        </div>
        <p className={site.small}>
          {t.recipient}: <a href={`mailto:${RECIPIENT}`}>{RECIPIENT}</a>
        </p>
        <p id="copy-status" role="status">
          {copyStatus && t[copyStatus]}
        </p>
      </div>
    </dialog>
  )
}

function PrivacyDialog({ ref, onClose }) {
  const { t } = useLanguage()
  const close = () => ref.current.close()

  return (
    <dialog
      ref={ref}
      id="privacy-dialog"
      aria-labelledby="privacy-title"
      onClose={onClose}
      onClick={closeOnBackdrop}
    >
      <button type="button" className={shell.dialogClose} aria-label={t.close} onClick={close}>
        ×
      </button>
      <h2 id="privacy-title">{t.privacyTitle}</h2>
      <p>{t.privacyCopy}</p>
      <button type="button" className={site.button} onClick={close}>
        {t.close}
      </button>
    </dialog>
  )
}

// Provides openContact / openPrivacy and returns focus to the opener when a dialog closes.
export function Dialogs({ children }) {
  const enquiryRef = useRef(null)
  const privacyRef = useRef(null)
  const openerRef = useRef(null)

  const actions = useMemo(
    () => ({
      openContact(opener, interest) {
        openerRef.current = opener
        enquiryRef.current.open(interest)
      },
      openPrivacy(opener) {
        openerRef.current = opener
        privacyRef.current.showModal()
      },
    }),
    [],
  )

  function restoreFocus() {
    if (openerRef.current?.isConnected) openerRef.current.focus()
  }

  return (
    <DialogContext value={actions}>
      {children}
      <EnquiryDialog ref={enquiryRef} onClose={restoreFocus} />
      <PrivacyDialog ref={privacyRef} onClose={restoreFocus} />
    </DialogContext>
  )
}
