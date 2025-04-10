'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: 'Creative Vision',
    image: 'https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGNhdHxlbnwwfHwwfHx8MA%3D%3D',
    content: 'We transform your ideas into beautiful digital experiences.',
  },
  {
    title: 'Tech Innovation',
    image: 'https://images.unsplash.com/photo-1568615944078-821ced977caa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHxjYXR8ZW58MHx8MHx8fDA%3D',
    content: 'Cutting-edge technology meets bold thinking.',
  },
  {
    title: 'Bold Aesthetics',
    image: 'https://images.unsplash.com/photo-1513977055326-8ae6272d90a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk0fHxjYXR8ZW58MHx8MHx8fDA%3D',
    content: 'Visually stunning interfaces that leave an impact.',
  },
]

export default function FancyCards() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.card').forEach((card: any) => {
        const image = card.querySelector('.card-image')
        const text = card.querySelector('.card-text')

        gsap.from(card, {
          opacity: 0,
          y: 100,
          scale: 0.95,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from(image, {
          opacity: 0,
          y: 60,
          duration: 1,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from(text, {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen px-6 py-20 flex flex-col items-center gap-24"
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="card max-w-3xl w-full bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="card-image w-full h-[300px] relative">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>
          <div className="card-text p-6">
            <h2 className="text-3xl font-bold mb-4">{card.title}</h2>
            <p className="text-gray-300 text-lg">{card.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}