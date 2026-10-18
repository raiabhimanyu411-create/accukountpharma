// Primitives load before the shell so its responsive overrides win, as in the original single stylesheet.
import './styles/Site.module.css'
import './styles/Shared.module.css'
import { useEffect, useMemo, useState } from 'react'
import { Dialogs } from './components/Dialogs.jsx'
import { Footer } from './components/Footer.jsx'
import { Gallery } from './components/Gallery.jsx'
import { Header } from './components/Header.jsx'
import { translations } from './content.js'
import { HomePage } from './HomePage.jsx'
import { initialLanguage, LanguageContext, STORAGE_KEY } from './i18n.js'

const isGallery = window.location.pathname.endsWith('visuals.html')

function App() {
  const [lang, setLanguage] = useState(initialLanguage)
  const t = translations[lang]
  const language = useMemo(() => ({ t, lang, setLanguage }), [t, lang])

  // Keep the document metadata, saved preference and ?lang= in step with the language.
  useEffect(() => {
    document.documentElement.lang = t.locale
    document.title = isGallery ? `${t.gallery} | ACCUKOUNT Pharma` : t.title
    document.querySelector('meta[name="description"]').content = t.description
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch (error) {
      console.error('Unable to save the website language.', error)
    }
    const url = new URL(window.location.href)
    url.searchParams.set('lang', lang)
    history.replaceState(null, '', url)
  }, [t, lang])

  return (
    <LanguageContext value={language}>
      <Dialogs>
        <Header gallery={isGallery} />
        {isGallery ? <Gallery /> : <HomePage />}
        <Footer />
      </Dialogs>
    </LanguageContext>
  )
}

export default App
