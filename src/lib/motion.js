import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'expo.out'

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/*
 * Declarative scroll animations, following the ASSETKOUNT site. Markup opts in with data attributes:
 *   data-hero-item      staggered entrance on load
 *   data-lines          heading whose [data-line] children rise from a mask
 *   data-reveal         fade and rise when scrolled into view
 *   data-stagger        children fade and rise one after another, tipping up in 3D
 *   data-clip           wrapper wipes open, its image settles from a zoom
 *   data-draw-icons     outlined svg icons inside trace their strokes in
 *   data-count="n"      text counts up from 0 to n (static numbers only: React owns dynamic text)
 *   data-grow           bar fills from the left
 * With reduced motion nothing animates and everything is shown as authored.
 */
export function usePageAnimations(scopeRef) {
  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope || prefersReducedMotion()) return undefined

    const ctx = gsap.context(() => {
      gsap.from(gsap.utils.toArray('[data-hero-item]', scope), {
        autoAlpha: 0,
        y: 28,
        duration: 1.2,
        ease: EASE,
        stagger: 0.07,
        delay: 0.2,
        clearProps: 'transform',
      })

      gsap.utils.toArray('[data-lines]', scope).forEach((heading) => {
        gsap.from(heading.querySelectorAll('[data-line] > span'), {
          yPercent: 115,
          duration: 1.3,
          ease: EASE,
          stagger: 0.08,
          scrollTrigger: { trigger: heading, start: 'top 88%' },
        })
      })

      gsap.utils.toArray('[data-reveal]', scope).forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 36,
          duration: 1.2,
          ease: EASE,
          clearProps: 'transform',
          scrollTrigger: { trigger: element, start: 'top 90%' },
        })
      })

      gsap.utils.toArray('[data-stagger]', scope).forEach((group) => {
        gsap.from(group.children, {
          autoAlpha: 0,
          y: 44,
          rotationX: -16,
          transformPerspective: 1000,
          transformOrigin: '50% 0%',
          duration: 1.1,
          ease: EASE,
          stagger: 0.1,
          clearProps: 'transform',
          scrollTrigger: { trigger: group, start: 'top 86%' },
        })
      })

      gsap.utils.toArray('[data-clip]', scope).forEach((wrapper) => {
        const image = wrapper.querySelector('img')
        const timeline = gsap.timeline({ scrollTrigger: { trigger: wrapper, start: 'top 85%' } })
        timeline.from(wrapper, {
          clipPath: 'inset(18% 12% 18% 12%)',
          duration: 1.5,
          ease: 'expo.inOut',
          clearProps: 'clipPath',
        })
        // clearProps hands transform back to CSS.
        if (image)
          timeline.from(
            image,
            { scale: 1.35, duration: 1.8, ease: EASE, clearProps: 'transform' },
            0,
          )
      })

      // Outlined icons trace their strokes in, one icon after another.
      gsap.utils.toArray('[data-draw-icons]', scope).forEach((group) => {
        const icons = gsap.utils
          .toArray('svg', group)
          .map((svg) =>
            [...svg.querySelectorAll('path, circle, rect, line, polyline')].filter((shape) => {
              if (getComputedStyle(shape).stroke === 'none') return false
              try {
                shape.dataset.length = Math.ceil(shape.getTotalLength()) + 1
                return true
              } catch {
                return false
              }
            }),
          )
          .filter((shapes) => shapes.length)
        if (!icons.length) return

        const timeline = gsap.timeline({ scrollTrigger: { trigger: group, start: 'top 82%' } })
        icons.forEach((shapes, index) => {
          timeline.fromTo(
            shapes,
            {
              strokeDasharray: (_, shape) => shape.dataset.length,
              strokeDashoffset: (_, shape) => shape.dataset.length,
            },
            {
              strokeDashoffset: 0,
              duration: 1.1,
              ease: 'power2.inOut',
              clearProps: 'strokeDasharray,strokeDashoffset',
            },
            0.2 + index * 0.12,
          )
        })
      })

      // Numbers count up from zero; data-count-suffix is appended as-is.
      gsap.utils.toArray('[data-count]', scope).forEach((element) => {
        const target = Number(element.dataset.count) || 0
        const suffix = element.dataset.countSuffix ?? ''
        const counter = { value: 0 }
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 90%' },
          onStart: () => {
            element.textContent = `0${suffix}`
          },
          onUpdate: () => {
            element.textContent = `${Math.round(counter.value)}${suffix}`
          },
        })
      })

      // Bars fill from empty.
      gsap.utils.toArray('[data-grow]', scope).forEach((bar) => {
        gsap.from(bar, {
          scaleX: 0,
          transformOrigin: '0% 50%',
          duration: 1.6,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: bar, start: 'top 90%' },
        })
      })
    }, scope)

    // Images arriving late change section heights; re-measure triggers.
    const refresh = () => ScrollTrigger.refresh()
    const images = scope.querySelectorAll('img')
    images.forEach((image) => {
      if (!image.complete) image.addEventListener('load', refresh, { once: true })
    })
    const settle = window.setTimeout(refresh, 600)

    return () => {
      window.clearTimeout(settle)
      images.forEach((image) => image.removeEventListener('load', refresh))
      ctx.revert()
    }
  }, [scopeRef])
}
