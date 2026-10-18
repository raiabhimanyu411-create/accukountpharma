import { createContext, useContext } from 'react'

export const STORAGE_KEY = 'accukount-language'
const LANGUAGES = ['en', 'fr']

export function initialLanguage() {
  const requested = new URLSearchParams(window.location.search).get('lang')
  if (LANGUAGES.includes(requested)) return requested

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (LANGUAGES.includes(saved)) return saved
  } catch (error) {
    console.error('Unable to read the saved website language.', error)
  }

  return 'en'
}

export const LanguageContext = createContext(null)

// Returns { t, lang, setLanguage } where t is the copy for the active language.
export function useLanguage() {
  return useContext(LanguageContext)
}
