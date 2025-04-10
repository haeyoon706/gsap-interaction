'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Belt = () => {
  const beltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = beltRef.current
      if (!el) return

      const animation = gsap.to(el, {
        xPercent: -50,
        ease: 'none',
        repeat: -1,
        duration: 20,
      })

      return () => animation.kill()
    }, beltRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="overflow-hidden w-full h-[200px] bg-transparent flex items-center">
      <div
        ref={beltRef}
        className="flex whitespace-nowrap text-[140px] font-extrabold text-white gap-10 leading-none"
      >
        {Array(2).fill(
          'WELCOME MY SWEET HOME'
        ).map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>
  )
}

export default Belt