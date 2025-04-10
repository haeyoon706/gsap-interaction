'use client'

import Heading from './Heading'
import Card from './Card'
import { useEffect } from 'react'
import Belt from './Belt'
import Inquiry from './Inquiry'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import CanvasBackground from './CanvasBackground'
import ScatterText from './ScatterText'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {

  useEffect(() => {
    window?.scrollTo(0, 0)
  }, [])

  return (
    <main className="relative text-white">
      {/* 배경 */}
      <CanvasBackground />

      {/* 콘텐츠 */}
      <Heading />
      <div className="h-[100vh]" />

      <ScatterText />

      <Card />
      <div className="h-[50vh]" />

      <Belt />
      <div className="h-[50vh]" />

      <Inquiry />
      <div className="h-[150vh]" />
    </main>
  )
}