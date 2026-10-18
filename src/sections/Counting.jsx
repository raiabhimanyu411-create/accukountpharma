import { useEffect, useRef, useState } from 'react'
import { ArrowButton, Icon, SectionHead, TabPanel, Tabs } from '../components/ui.jsx'
import { useLanguage } from '../i18n.js'
import { speechNumber } from '../lib/speechNumber.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const MODE_ICONS = ['scan', 'sliders', 'box', 'mic']
const MAX_QUANTITY = 99999
const isValidQuantity = (n) => Number.isInteger(n) && n > 0 && n <= MAX_QUANTITY

export function Counting() {
  const { t } = useLanguage()
  const [mode, setMode] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [bulk, setBulk] = useState('12')
  // A key into t, so the message follows the active language.
  const [status, setStatus] = useState('')
  const bulkRef = useRef(null)
  const recognitionRef = useRef(null)

  function stopVoice() {
    const recognition = recognitionRef.current
    if (!recognition) return
    recognition.onerror = recognition.onresult = recognition.onend = null
    recognition.abort()
    recognitionRef.current = null
  }

  useEffect(() => stopVoice, [])

  function chooseMode(next) {
    stopVoice()
    setMode(next)
    setStatus('')
  }

  function add(n) {
    if (!isValidQuantity(n) || quantity + n > MAX_QUANTITY) {
      setStatus('notReady')
      return
    }
    setQuantity(quantity + n)
    setStatus('')
  }

  function reset() {
    setQuantity(0)
    setStatus('')
  }

  function startVoice() {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Speech) {
      setStatus('voiceUnsupported')
      bulkRef.current?.focus()
      return
    }
    stopVoice()
    try {
      const recognition = new Speech()
      recognitionRef.current = recognition
      recognition.lang = t.locale
      recognition.interimResults = false
      recognition.maxAlternatives = 1
      recognition.onstart = () => setStatus('voiceListening')
      recognition.onerror = () => {
        setStatus('voiceError')
        recognitionRef.current = null
      }
      recognition.onresult = (event) => {
        const spoken = speechNumber(event.results[0][0].transcript, t.lang)
        if (isValidQuantity(spoken)) {
          setBulk(String(spoken))
          setStatus('voiceCaptured')
        } else setStatus('voiceError')
      }
      recognition.onend = () => {
        recognitionRef.current = null
      }
      recognition.start()
    } catch {
      setStatus('voiceError')
      recognitionRef.current = null
    }
  }

  return (
    <section
      className={`${styles.section} ${styles.navy} ${styles.countSection}`}
      id="counting"
      aria-labelledby="counting-title"
    >
      <div className={site.wrap}>
        <SectionHead content={t.count} id="counting" />
        <Tabs
          data-reveal=""
          id="mode"
          labels={t.modeLabels}
          active={mode}
          onChange={chooseMode}
          panelId="count-panel"
        />
        <TabPanel
          data-reveal=""
          id="count-panel"
          className={styles.countPanel}
          tabsId="mode"
          active={mode}
        >
          <div className={styles.countDetails}>
            <span className={styles.roundIcon}>
              <Icon name={MODE_ICONS[mode]} />
            </span>
            <h3>{t.modeLabels[mode]}</h3>
            <p>{t.modeCopy[mode]}</p>
          </div>
          <div className={styles.countSimulator}>
            <span className={styles.sampleNote}>{t.demoLabel}</span>
            <div className={styles.quantityTotal}>
              <span>{t.quantity}</span>
              <output id="count-output" aria-live="polite">
                {quantity}
              </output>
            </div>
            <div className={styles.countActions}>
              {mode === 0 && (
                <ArrowButton
                  className={`${site.lightButton} ${styles.countActionsButton}`}
                  onClick={() => add(1)}
                >
                  {t.scanOne}
                </ArrowButton>
              )}
              {mode === 1 && (
                <>
                  <button
                    type="button"
                    className={`${site.button} ${site.lightButton} ${styles.countActionsButton}`}
                    onClick={() => add(5)}
                  >
                    {t.addFive}
                  </button>
                  <button
                    type="button"
                    className={`${site.button} ${site.ghostLight} ${styles.countActionsButton}`}
                    onClick={() => add(10)}
                  >
                    {t.addTen}
                  </button>
                </>
              )}
              {mode >= 2 && (
                <>
                  {mode === 3 && (
                    <>
                      <button
                        type="button"
                        className={`${site.button} ${site.lightButton} ${styles.countActionsButton}`}
                        onClick={startVoice}
                      >
                        <Icon name="mic" />
                        {t.voiceStart}
                      </button>
                      <p className={site.small}>{t.voiceHelp}</p>
                    </>
                  )}
                  <label className={site.srOnly} htmlFor="bulk-quantity">
                    {t.enterQty}
                  </label>
                  <input
                    ref={bulkRef}
                    id="bulk-quantity"
                    type="number"
                    min="1"
                    max={MAX_QUANTITY}
                    step="1"
                    inputMode="numeric"
                    value={bulk}
                    onChange={(e) => setBulk(e.target.value)}
                  />
                  <button
                    type="button"
                    className={`${site.button} ${site.lightButton} ${styles.countActionsButton}`}
                    onClick={() => add(Number(bulk))}
                  >
                    {t.applyQty}
                  </button>
                </>
              )}
              <button type="button" className={styles.resetButton} onClick={reset}>
                {t.reset}
              </button>
            </div>
            <p id="count-status" className={`${site.small} ${styles.countStatus}`} role="status">
              {status && t[status]}
            </p>
          </div>
        </TabPanel>
        <p className={styles.captureStrip} data-reveal="">
          {t.countFields}
        </p>
      </div>
    </section>
  )
}
