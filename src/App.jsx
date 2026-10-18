import { useEffect, useState } from 'react'
import './styles.css'

const initialState = {
  gallery: window.location.pathname.endsWith('visuals.html'),
  movement: 0,
  route: 0,
  mode: 0,
  workflow: 0,
  quantity: 0,
  bulk: 12,
  receipts: [24, 24, 22, 24],
  expiry: 4,
  dashTab: 0,
  location: 'all',
  search: '',
}

function loadScript(path) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `${import.meta.env.BASE_URL}${path}`
    script.onload = resolve
    script.onerror = () => reject(new Error(`Unable to load ${path}`))
    document.head.appendChild(script)
  })
}

function initialLanguage() {
  const requested = new URLSearchParams(window.location.search).get('lang')
  if (requested === 'en' || requested === 'fr') return requested

  try {
    const saved = localStorage.getItem('accukount-language')
    if (saved === 'en' || saved === 'fr') return saved
  } catch (error) {
    console.error('Unable to read the saved website language.', error)
  }

  return 'en'
}

function App() {
  const [page, setPage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function renderPage() {
      try {
        await loadScript('site/content.js')
        await loadScript('site/render.js')

        if (!active) return

        const language = initialLanguage()
        const content = window.PHARMA_CONTENT[language]
        setPage(window.PHARMA_RENDER.renderPage(content, initialState))
      } catch (loadError) {
        console.error('Unable to initialize the ACCUKOUNT Pharma page.', loadError)
        if (active) setError('This page could not be loaded. Please refresh and try again.')
      }
    }

    renderPage()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!page) return undefined

    let active = true
    loadScript('site/app.js').catch((loadError) => {
      console.error('Unable to load the ACCUKOUNT Pharma interactions.', loadError)
      if (active) setError('Some page interactions could not be loaded. Please refresh and try again.')
    })

    return () => {
      active = false
    }
  }, [page])

  if (error) return <main role="alert">{error}</main>
  if (!page) return <main aria-busy="true" />

  return <div id="app" dangerouslySetInnerHTML={{ __html: page }} />
}

export default App
