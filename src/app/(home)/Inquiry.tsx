'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const questions = [
  {
    question: 'How does the platform work?',
    answer: 'Our platform connects users with personalized services using advanced algorithms.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use end-to-end encryption and follow strict compliance regulations.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel at any time without penalty.',
  },
  {
    question: 'Do you offer customer support?',
    answer: 'Of course! Our team is available 24/7 through chat and email.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit cards, PayPal, and crypto payments.',
  },
  {
    question: 'Is there a mobile app?',
    answer: 'Yes, our app is available for both iOS and Android platforms.',
  },
  {
    question: 'How do I reset my password?',
    answer: 'Click on "Forgot Password" at login and follow the instructions.',
  },
  {
    question: 'Can I upgrade my plan later?',
    answer: 'You can upgrade or downgrade your plan at any time from your dashboard.',
  },
  {
    question: 'Where is your company located?',
    answer: 'We are headquartered in San Francisco, CA, with remote teams worldwide.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all plans.',
  },
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.faq-item') as HTMLDivElement[]

      items.forEach((item) => {
        const underline = item.querySelector('.underline-effect') as HTMLElement
        gsap.set(underline, { scaleX: 0, transformOrigin: 'left' })

        ScrollTrigger.create({
          trigger: item,
          start: 'top 90%',
          onEnter: () => {
            gsap.to(underline, {
              scaleX: 1,
              duration: 0.6,
              ease: 'power2.out',
            })
          },
        })
      })
    }, listRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-transparent py-24 px-4 md:px-16 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* 타이틀 영역 */}
        <div className="md:w-1/3">
          <div className="sticky top-20">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Frequently <br /> Asked <br /> Questions
            </h2>
          </div>
        </div>

        {/* 리스트 영역 */}
        <div
          ref={listRef}
          className="md:w-2/3 flex flex-col divide-y divide-white/10"
        >
          {questions.map((item, idx) => {
            const isActive = activeIndex === idx

            return (
              <div
                key={idx}
                className="faq-item relative py-6 transition-all duration-300 cursor-pointer"
                onClick={() => setActiveIndex(isActive ? null : idx)}
              >
                <span className="underline-effect absolute left-0 bottom-0 w-full h-[2px] bg-white block scale-x-0 origin-left" />

                <div className="flex justify-between items-start gap-4">
                  <p className="text-lg md:text-xl font-medium">
                    {item.question}
                  </p>
                  <span
                    className={`text-xl select-none transition-transform duration-300 ease-in-out ${
                        isActive ? 'rotate-45 scale-125 text-white' : 'rotate-0 scale-100 text-white'
                    }`}
                    >
                    +
                    </span>
                </div>

                {/* 답변 애니메이션 */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isActive
                      ? 'max-h-[300px] opacity-100 mt-4'
                      : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}