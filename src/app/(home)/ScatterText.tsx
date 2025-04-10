'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TEXT = [
  'Creativity is intelligence having fun.',
  'Design is thinking made visual.',
  'Good art inspires; good design motivates.',
  'The details are not the details.',
]

export default function ScatterText() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const words = container.querySelectorAll('span')

    words.forEach((word) => {
        const x = gsap.utils.random(-window.innerWidth * 1.2, window.innerWidth * 1.2)
        const y = gsap.utils.random(-window.innerHeight * 1.2, window.innerHeight * 1.2)
        const rotate = gsap.utils.random(-90, 90)
        const skewX = gsap.utils.random(-20, 20)
        const skewY = gsap.utils.random(-10, 10)
      
        gsap.set(word, {
          x,
          y,
          rotate,
          skewX,
          skewY,
          opacity: 0,
          scale: 2, // 더 크게 시작
        })
      })
      

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: true,
      },
    })

    tl.to(words, {
        x: 0,
        y: 0,
        rotate: 0,
        skewX: 0,
        skewY: 0,
        opacity: 1,
        scale: 1, // 원래 크기로 돌아감
        ease: 'power3.out',
        duration: 1,
        stagger: {
          amount: 0.4,
          from: 'random',
        },
      })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section className="relative h-[400vh]">
      <div
        ref={containerRef}
        className="h-screen flex items-center justify-center text-center text-4xl leading-relaxed font-semibold"
      >
        <div>
          {TEXT.map((line, idx) => (
            <p key={idx}>
              {line.split(' ').map((word, wIdx) => (
                <span key={wIdx} className="inline-block mx-1 whitespace-nowrap will-change-transform">
                  {word}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}