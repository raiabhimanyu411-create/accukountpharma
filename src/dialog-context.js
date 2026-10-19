import { createContext, useContext } from 'react'

export const DialogContext = createContext(null)

// Returns { openContact(opener, interest?), openPrivacy(opener), openVideo(opener) }.
export function useDialogs() {
  return useContext(DialogContext)
}
