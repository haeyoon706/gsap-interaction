'use client'

import Heading from "./Heading"
import Card from "./Card"
import { useEffect } from "react"

export default function Home() {
  useEffect(()=> {
    window?.scrollTo(0, 0)
  },[])

  return (
    <main className="bg-black text-white">
      <Heading />

      {/* spacer로 opacity 0 이후 스크롤 여유 확보 */}
      <div className="h-[150vh] bg-black" />

      {/* 두번째 영역 */}
      <Card/>

      {/* spacer로 opacity 0 이후 스크롤 여유 확보 */}
      <div className="h-[150vh] bg-black" />

      {/* 세번째 영역 */}
      <div className="h-screen bg-black text-white flex items-center justify-center text-3xl font-bold">
        third
      </div>
    </main>
  )
}