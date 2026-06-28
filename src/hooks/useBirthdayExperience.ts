import { useCallback, useState } from 'react'
import type { ExperienceStage } from '../types/experience'

const triggerConfetti = async (intensity: 'light' | 'heavy' = 'light') => {
  const confetti = (await import('canvas-confetti')).default
  if (intensity === 'light') {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.65 } })
    confetti({
      particleCount: 40,
      spread: 90,
      origin: { y: 0.55, x: 0.35 },
      colors: ['#ff8fd8', '#ffd166', '#8ec5ff', '#ffc7ea'],
    })
  } else {
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } })
    confetti({
      particleCount: 80,
      spread: 120,
      origin: { y: 0.5, x: 0.2 },
      colors: ['#ff8fd8', '#ffd166', '#8ec5ff', '#ffc7ea'],
    })
    confetti({
      particleCount: 80,
      spread: 120,
      origin: { y: 0.5, x: 0.8 },
      colors: ['#ff8fd8', '#ffd166', '#8ec5ff', '#ffc7ea'],
    })
    setTimeout(() => {
      confetti({ particleCount: 60, spread: 160, origin: { y: 0.4 } })
    }, 300)
  }
}

export function useBirthdayExperience() {
  const [stage, setStage] = useState<ExperienceStage>('welcome')
  const [selectedWishId, setSelectedWishId] = useState<string | null>(null)

  const openGift = useCallback(() => {
    if (stage !== 'welcome') return
    setStage('gift-opened')
    void triggerConfetti('light')
  }, [stage])

  const showWishes = useCallback(() => {
    if (stage !== 'gift-opened') return
    setStage('wishes')
  }, [stage])

  const lightCandles = useCallback(() => {
    if (stage !== 'wishes') return
    setStage('candles')
    setSelectedWishId(null)
  }, [stage])

  const makeWish = useCallback(() => {
    if (stage !== 'candles') return
    setStage('finale')
    void triggerConfetti('heavy')
  }, [stage])

  const replayExperience = useCallback(() => {
    setStage('welcome')
    setSelectedWishId(null)
  }, [])

  const selectWish = useCallback((id: string) => {
    setSelectedWishId(id)
  }, [])

  const closeWishModal = useCallback(() => {
    setSelectedWishId(null)
  }, [])

  return {
    stage,
    selectedWishId,
    openGift,
    showWishes,
    lightCandles,
    makeWish,
    replayExperience,
    selectWish,
    closeWishModal,
  }
}
