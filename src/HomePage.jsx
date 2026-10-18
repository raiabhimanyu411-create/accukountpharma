import { useRef } from 'react'
import { usePageAnimations } from './lib/motion.js'
import { Benefits } from './sections/Benefits.jsx'
import { Canada } from './sections/Canada.jsx'
import { Capabilities } from './sections/Capabilities.jsx'
import { Challenge } from './sections/Challenge.jsx'
import { Counting } from './sections/Counting.jsx'
import { Dashboard } from './sections/Dashboard.jsx'
import { Expiry } from './sections/Expiry.jsx'
import { FinalCall } from './sections/FinalCall.jsx'
import { Hero } from './sections/Hero.jsx'
import { Identification } from './sections/Identification.jsx'
import { Integrations } from './sections/Integrations.jsx'
import { InventoryDrift } from './sections/InventoryDrift.jsx'
import { Pilot } from './sections/Pilot.jsx'
import { Pillars } from './sections/Pillars.jsx'
import { Platform } from './sections/Platform.jsx'
import { SmartphoneWeb } from './sections/SmartphoneWeb.jsx'
import { Workflows } from './sections/Workflows.jsx'

// Section numbers follow the presentation visuals in the gallery (01 is the navigation).
export function HomePage() {
  const page = useRef(null)
  usePageAnimations(page)

  return (
    <main id="main" ref={page}>
      {/* 02: visual hero */}
      <Hero />

      {/* Capture / verify / track flow and the capability strip, from the hero caption */}
      <Pillars />
      <Capabilities />

      {/* 03: visual challenge */}
      <Challenge />

      {/* 04: visual inventory-drift */}
      <InventoryDrift />

      {/* 05: visual verification-layer */}
      <Platform />

      {/* 06: visual smartphone-web */}
      <SmartphoneWeb />

      {/* 07: visual identification */}
      <Identification />

      {/* 08: visual counting */}
      <Counting />

      {/* 09: visual workflows */}
      <Workflows />

      {/* 10: visual expiry */}
      <Expiry />

      {/* 11: visual integrations */}
      <Integrations />

      {/* 12: visual dashboard */}
      <Dashboard />

      {/* 13: visual benefits */}
      <Benefits />

      {/* 14: visual canadian-pharmacies */}
      <Canada />

      {/* 15: visual pilot */}
      <Pilot />

      {/* 16: visual call-to-action */}
      <FinalCall />
    </main>
  )
}
