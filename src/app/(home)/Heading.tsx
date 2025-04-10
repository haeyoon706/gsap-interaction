'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Heading() {
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 })
    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value: any) {
        return arguments.length ? window.scrollTo(0, value) : window.scrollY
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    })

    ScrollTrigger.refresh()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars1 = line1Ref.current?.querySelectorAll('[data-char]')
      const chars2 = line2Ref.current?.querySelectorAll('[data-char]')

      if (!chars1 || !chars2) return

      // 등장 애니메이션
      gsap.fromTo(
        chars1,
        {
          rotateX: -75,
          rotateY: -15,
          opacity: 0,
          scale: 0.85,
          transformOrigin: 'left bottom',
        },
        {
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: 'power4.out',
          stagger: {
            each: 0.06,
            from: 'start',
          },
        }
      )

      gsap.fromTo(
        chars2,
        {
          rotateX: -75,
          rotateY: -15,
          opacity: 0,
          scale: 0.85,
          transformOrigin: 'left bottom',
        },
        {
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: 'power4.out',
          stagger: {
            each: 0.06,
            from: 'start',
          },
          delay: 0.5,
        }
      )

      // opacity 줄이기
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const opacity = 1 - self.progress
          gsap.to(containerRef.current, {
            opacity,
            ease: 'none',
            overwrite: true,
          })
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const renderChars = (text: string) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        data-char
        className="inline-block transform-gpu will-change-transform"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))

  return (
    <div ref={wrapperRef} className="relative h-screen">
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen flex flex-col items-start justify-center gap-6 px-12 bg-black text-white perspective-[1000px] pointer-events-none"
      >
        <div ref={line1Ref} className="text-6xl font-extrabold whitespace-nowrap">
          {renderChars('Pioneering the Future')}
        </div>
        <div ref={line2Ref} className="text-6xl font-extrabold whitespace-nowrap">
          {renderChars('of AI Agents')}
        </div>
      </div>
    </div>
  )
}