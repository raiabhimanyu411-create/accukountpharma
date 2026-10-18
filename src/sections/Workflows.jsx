import { useRef, useState } from 'react'
import {
  Badge,
  CheckList,
  Icon,
  PillButton,
  SectionHead,
  TabPanel,
  Tabs,
} from '../components/ui.jsx'
import { batchRows, initialReceipts, stockRows } from '../data/samples.js'
import { useLanguage } from '../i18n.js'
import { cx } from '../lib/cx.js'
import styles from '../pages/Home.module.css'
import site from '../styles/Site.module.css'

const RECEIPT_WORKFLOW = 1
const signed = (n) => `${n > 0 ? '+' : ''}${n}`
const letter = (i) => String.fromCharCode(65 + i)

function StockExample({ t }) {
  return (
    <div>
      <span className={styles.sampleNote}>{t.demoLabel}</span>
      <div className={styles.stockTitle}>
        <Icon name="scan" />
        <h4>{t.demoStock}</h4>
      </div>
      <div>
        <div className={`${styles.tableLine} ${styles.head}`}>
          <b>{t.productSample}</b>
          <b>{t.systemQty}</b>
          <b>{t.countedQty}</b>
        </div>
        {stockRows.map(([system, counted], i) => (
          <div className={styles.tableLine} key={i}>
            <span>
              {t.productSample} {letter(i)}
              <small>LOT-{letter(i)}</small>
            </span>
            <b>{system}</b>
            <b className={system !== counted ? styles.textBurgundy : undefined}>{counted}</b>
          </div>
        ))}
      </div>
      <div className={styles.stockResult}>
        <Icon name="alert" />
        {` 2 ${t.units} · ${t.variance}`}
      </div>
    </div>
  )
}

// receipts are [ordered, supplier record, physical receipt, system posting].
function ReceiptResult({ t, receipts: [ordered, supplied, physical, posted] }) {
  const gap = physical - supplied
  const messages = []
  if (gap < 0) messages.push(`${t.shortageResult}: ${Math.abs(gap)}`)
  if (gap > 0) messages.push(`${t.overageResult}: ${gap}`)
  if (posted !== physical) messages.push(`${t.postingResult}: ${signed(posted - physical)}`)
  if (ordered !== supplied) messages.push(`${t.supplyResult}: ${signed(supplied - ordered)}`)
  const hasGap = messages.length > 0

  return (
    <div className={cx(styles.receiptResult, hasGap && styles.hasGap)}>
      <Icon name={hasGap ? 'alert' : 'check'} />
      <div>
        <strong>{hasGap ? t.reviewResult : t.matchedResult}</strong>
        {messages.map((message, i) => (
          <span key={i}>{message}</span>
        ))}
      </div>
    </div>
  )
}

function ReceiptExample({ t, receipts, onChange }) {
  function handleChange(index, input) {
    const value = Number(input.value)
    if (!Number.isInteger(value) || value < 0 || value > 99999) {
      input.setCustomValidity(t.notReady)
      return
    }
    input.setCustomValidity('')
    onChange(receipts.map((current, i) => (i === index ? value : current)))
  }

  return (
    <div className={styles.receiptExample}>
      <h4>{t.fourWay}</h4>
      <p className={styles.sampleNote}>{t.demoLabel}</p>
      <div className={styles.fourWay}>
        {t.fourLabels.map((label, i) => (
          <label key={i} htmlFor={`receipt-${i}`}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <b>{label}</b>
            {/* Uncontrolled so an invalid entry can stay visible while it is flagged. */}
            <input
              id={`receipt-${i}`}
              type="number"
              min="0"
              max="99999"
              step="1"
              inputMode="numeric"
              defaultValue={receipts[i]}
              onChange={(e) => handleChange(i, e.currentTarget)}
            />
          </label>
        ))}
      </div>
      <div id="receipt-result" role="status">
        <ReceiptResult t={t} receipts={receipts} />
      </div>
      <p className={`${site.small} ${site.muted} ${styles.receiptExampleSmall}`}>{t.receiptNote}</p>
    </div>
  )
}

function BatchExample({ t }) {
  return (
    <div className={styles.batchExample}>
      <span className={styles.sampleNote}>{t.demoLabel}</span>
      <h4>{t.demoBatch}</h4>
      <div className={styles.batchId}>
        <Icon name="box" />
        <strong>{t.productSample} A</strong>
      </div>
      {batchRows.map(([lot, expiry, quantity]) => (
        <div className={styles.batchRow} key={lot}>
          <b>{lot}</b>
          <span>{expiry}</span>
          <strong>
            {quantity} {t.units}
          </strong>
        </div>
      ))}
      <div className={styles.batchLink}>
        <Icon name="location" /> {t.centreLocation} / A-01
      </div>
    </div>
  )
}

export function Workflows() {
  const { t } = useLanguage()
  const [workflow, setWorkflow] = useState(0)
  const [receipts, setReceipts] = useState(initialReceipts)
  const tabsRef = useRef(null)
  const panelRef = useRef(null)
  const details = t.workflowDetails[workflow]

  function showReceiptDemo() {
    setWorkflow(RECEIPT_WORKFLOW)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    panelRef.current.scrollIntoView({
      behavior: reduceMotion ? 'instant' : 'smooth',
      block: 'center',
    })
    tabsRef.current.children[RECEIPT_WORKFLOW].focus({ preventScroll: true })
  }

  return (
    <section
      className={`${styles.section} ${site.wrap}`}
      id="workflows"
      aria-labelledby="workflows-title"
    >
      <SectionHead content={t.workflows} id="workflows" center />
      <Tabs
        data-reveal=""
        ref={tabsRef}
        id="workflow"
        labels={t.workflowLabels}
        active={workflow}
        onChange={setWorkflow}
        panelId="workflow-panel"
      />
      <TabPanel
        data-reveal=""
        ref={panelRef}
        id="workflow-panel"
        className={styles.workflowPanel}
        tabsId="workflow"
        active={workflow}
      >
        <div className={styles.workflowText}>
          <p className={styles.eyebrow}>{`0${workflow + 1}`}</p>
          <h3>{details.title}</h3>
          <p>{details.copy}</p>
          <CheckList items={details.list} />
          <PillButton variant="outline" href="#pilot" className={styles.workflowPill}>
            {t.cta}
          </PillButton>
        </div>
        <div className={styles.workflowExample}>
          {workflow === 0 && <StockExample t={t} />}
          {workflow === RECEIPT_WORKFLOW && (
            <ReceiptExample t={t} receipts={receipts} onChange={setReceipts} />
          )}
          {workflow === 2 && <BatchExample t={t} />}
        </div>
      </TabPanel>
      <div className={styles.receivingPhoto} data-clip="">
        <img
          src="assets/tote-verification.webp"
          width="1672"
          height="941"
          loading="lazy"
          alt={t.toteAlt}
        />
        <div>
          <Badge>{t.workflowLabels[RECEIPT_WORKFLOW]}</Badge>
          <h3>{t.workflowDetails[RECEIPT_WORKFLOW].title}</h3>
          <p>{t.workflowDetails[RECEIPT_WORKFLOW].copy}</p>
          <PillButton variant="outline" className={styles.workflowPill} onClick={showReceiptDemo}>
            {t.fourWay}
          </PillButton>
        </div>
      </div>
    </section>
  )
}
