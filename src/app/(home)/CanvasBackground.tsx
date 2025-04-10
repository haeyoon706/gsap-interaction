'use client'

import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  radius: number
  depth: number
  twinkle: number
}

export default function SpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stars: Star[] = []
  const starCount = 200

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initStars = () => {
      stars.length = 0
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          depth: Math.random() * 3 + 1,
          twinkle: Math.random() * 100,
        })
      }
    }

    let scrollY = window.scrollY
    const updateScroll = () => {
      scrollY = window.scrollY
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const star of stars) {
        const parallaxY = star.y + scrollY / (10 * star.depth)
        const twinkleAlpha = 0.5 + Math.sin(Date.now() / 200 + star.twinkle) * 0.5

        ctx.beginPath()
        ctx.arc(star.x, parallaxY % canvas.height, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkleAlpha})`
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    resizeCanvas()
    initStars()
    window.addEventListener('resize', () => {
      resizeCanvas()
      initStars()
    })
    window.addEventListener('scroll', updateScroll)

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', updateScroll)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none opacity-80"
    />
  )
}