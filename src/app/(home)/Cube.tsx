'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Cube.css'

const lines = ['DOOKEY DASH', 'ONEY', 'FLEA TICKETS']

export default function CubeLines() {
  const cubesRef = useRef<(HTMLDivElement | null)[]>([])
  const beltRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const speed = 50 // px/sec로 동일하게 설정
  
    beltRefs.current.forEach((belt) => {
      if (!belt) return
  
      const totalWidth = belt.scrollWidth / 2
      const duration = totalWidth / speed // 길이에 따라 지속시간 계산
  
      gsap.set(belt, { x: 0 })
  
      gsap.to(belt, {
        x: `-=${totalWidth}`,
        duration,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth),
        },
      })
    })
  }, [])

  const handleMouseEnter = (index: number) => {
    const cube = cubesRef.current[index]
    if (cube) {
      gsap.to(cube, {
        rotateX: -90,
        duration: 0.2,
        ease: 'power1.out',
      })
    }
  }

  const handleMouseLeave = (index: number) => {
    const cube = cubesRef.current[index]
    if (cube) {
      gsap.to(cube, {
        rotateX: 0,
        duration: 0.2,
        ease: 'power1.inOut',
      })
    }
  }

  return (
    <div className="cube-container">
      {lines.map((text, index) => (
        <div
          className="cube-wrapper"
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <div className="cube" ref={(el) => (cubesRef.current[index] = el)}>
            <div className="face front">{text}</div>
            <div className={`face top top-${index + 1}`}>
              <div className="marquee-wrapper">
                <div
                  className="marquee-inner"
                  ref={(el) => (beltRefs.current[index] = el)}
                >
                  {[...Array(2)].flatMap((_, i) =>
                    Array(4).fill(text).map((t, j) => (
                      <span className="marquee-text" key={`${i}-${j}`}>
                        {t}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}