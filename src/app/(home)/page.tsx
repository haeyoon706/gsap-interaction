'use client'

import Heading from './Heading'
import Card from './Card'
import { useEffect, useRef } from 'react'
import Belt from './Belt'
import Inquiry from './Inquiry'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import CanvasBackground from './CanvasBackground'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window?.scrollTo(0, 0)

    if (!bgRef.current) return

    gsap.to(bgRef.current, {
      y: -200, // 이동 거리
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
  }, [])

  return (
    <main className="relative text-white overflow-hidden">
      {/* 배경 */}
      <CanvasBackground />

      {/* 콘텐츠 */}
      <Heading />
      <div className="h-[150vh]" />

      <Card />
      <div className="h-[50vh]" />

      <Belt />
      <div className="h-[50vh]" />

      <Inquiry />
      <div className="h-[150vh]" />
    </main>
  )
}